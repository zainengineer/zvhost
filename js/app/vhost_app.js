String.prototype.replaceAll = function(str1, str2, ignore)
{
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
};
var templateHtml;
var commandTemplateHtml;
var VHostAppVars = {};
jQuery.get('template/version1.conf', function (data) {
    templateHtml = data;
    startTemplate(data, param);
});

jQuery.get('template/bash.txt', function (data) {
    commandTemplateHtml = data;
});


var container = document.getElementById("jsoneditor");

function startTemplate(html) {
    jQuery('#template').html(html);
    var html = Mustache.to_html(html, param);
    jQuery('#rendered').html(html);
    var options = {
        schema: '',
        theme: 'bootstrap3',
        iconlib: 'fontawesome4'
    };

    window.editor = new JSONEditor(container, options);
    paramForEditor =  removeCalculatedParam(param);
    editor.setValue(paramForEditor);
    // editor.setValue(param);

    editor.on('change', function () {
        var json = editor.getValue();
        json = processJson(json);
        renderMustache(templateHtml, json);
    });
}
function processJson(json)
{
    return json;
}
function removeCalculatedParam(json)
{
    let clonedJson = $.extend({}, json);
    //so it won't pick it up from last storage
    delete clonedJson.vhost;
    return clonedJson;
}
function renderMustache(templateHtml, json) {
    ZStorage.saveObject('vhost_param',json);
    var html = Mustache.to_html(templateHtml, json);
    jQuery('#rendered').html(html);

    /**
     * so vhost can be injected into bash command
     * cat <<EOT >> /tmp/vhost-{{{domain}}}.conf
     {{{vhost}}}
     EOT
     */
    json.vhost = html;
    renderCommand(json);
}

function renderCommand(json) {
    if (!templateHtml || !commandTemplateHtml) {
        return;
    }
    var output = Mustache.to_html(commandTemplateHtml, json);
    this.postProcess({json:json,output:output});
}
function postProcess(param)
{
    if (jQuery){

        var objectData = param.json ;
        var output = param.output;
        if (typeof(objectData) == 'string'){
            objectData =  JSON.parse(objectData);
        }
        if (objectData.apache == 'httpd'){
            output = output.replaceAll('/etc/httpd/sites-available','/etc/httpd/conf.d');
            output = output.replaceAll('sudo a2ensite','#sudo a2ensite');
        }
        if (objectData.apache == 'xampp'){
            output = output.replaceAll('/xampp/sites-available','/apache2/conf/sites-enabled');
            output = output.replaceAll('sudo a2ensite','#sudo a2ensite');
            output = output.replaceAll('sudo service xampp restart','');
            output = output.replaceAll('#xampp restart sudo','sudo');
        }
        var html = String(output).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        jQuery('#command').html(html);
        jQuery('.clip-board-trigger').attr('data-clipboard-text',output);
        VHostAppVars.clipBoardBind = new Clipboard('.clip-board-trigger');
    }
}
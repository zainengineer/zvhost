var templateHtml;
var VHostAppVars = {};
jQuery.get('template/db.txt', function (data) {
    templateHtml = data;
    startTemplate(data, db_param);
});

function startTemplate(html) {
    jQuery('#template').html(html);
    html = Mustache.to_html(html, db_param);
    jQuery('#rendered').html(html);
    var container = document.getElementById("jsoneditor");
    var options = {
        schema: '',
        theme: 'bootstrap3',
        iconlib: 'fontawesome4'
    };

    window.editor = new JSONEditor(container, options);
    editor.setValue(db_param);

    editor.on('change', function () {
        var json = editor.getValue();
        renderMustache(templateHtml, json);
    });
}

function renderMustache(templateHtml, json) {
    ZStorage.saveObject('db_json',json);
    let jsonProcessed = preProcess(json);
    var html = Mustache.to_html(templateHtml, jsonProcessed);
    jQuery('#rendered').html(html);
    this.postProcess({json:json,html:html,output:html});
}
function preProcess(param){
    let paramCopy = jQuery.extend({}, param);
    if (param.host){
        paramCopy.host = "-h" + param.host;
    }
    return paramCopy;
}
function postProcess(param)
{
    if (jQuery){
        jQuery('.clip-board-trigger').attr('data-clipboard-text',param.output);
        VHostAppVars.clipBoardBind = new Clipboard('.clip-board-trigger');
    }
}
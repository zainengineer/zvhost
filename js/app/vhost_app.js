var templateHtml;
var commandTemplateHtml;
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
    editor.setValue(param);

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
function renderMustache(templateHtml, json) {
    var html = Mustache.to_html(templateHtml, json);
    jQuery('#rendered').html(html);
    json.vhost = html;
    renderCommand(json);
}

function renderCommand(json) {
    if (!templateHtml || !commandTemplateHtml) {
        return;
    }
    var html = Mustache.to_html(commandTemplateHtml, json);
    html = String(html).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    jQuery('#command').html(html);

}
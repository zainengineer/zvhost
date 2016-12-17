var templateHtml;
var commandTemplateHtml;
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
    var html = Mustache.to_html(templateHtml, json);
    jQuery('#rendered').html(html);
}

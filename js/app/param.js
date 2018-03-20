let param = {
    domain: 'www.vss.com',
    location: '/var/www/vhosts/vss',
    apache: 'apache2',
    aliases: '',
    autoprepend: false
};
window.param = $.extend(param, ZStorage.getObject('vhost_param'));
$(function () {
    window.setTimeout(function () {
        if (window.editor) {
            window.editor.trigger('change')
        }
    }, 1000);
});
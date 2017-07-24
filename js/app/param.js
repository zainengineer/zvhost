let param = {
    domain: 'www.vss.com',
    location: '/var/www/vhosts/vss',
    apache: 'apache2',
    aliases : '',
    autoprepend: false
};
window.param = $.extend(param, ZStorage.getObject('vhost_param'));
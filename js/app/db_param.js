window.db_param =
{
    host: '',
    root_password: 'password',
    database: 'db',
    user: 'user',
    user_password: 'password'
};
window.db_param = $.extend(window.db_param, ZStorage.getObject('db_json'));
//copied from https://github.com/zainengineer/toggl-laravel/blob/master/public/js/jira_cache.js
ZStorage = {};
ZStorage.saveObject = function(key,object){
    try {
        let jsonString =  JSON.stringify(object);
        localStorage.setItem(key,jsonString);
    } catch (e) {
        console.error(e);
        alert('value is not properly formatted json');
    }
};
ZStorage.saveJsonString = function(key,jsonString){
    try {
        JSON.parse(jsonString);
        localStorage.setItem(key,jsonString);
    } catch (e) {
        console.error(e);
        alert('value is not properly formatted json');
    }
};
ZStorage.getJsonString = function(key)
{
    try {
        let vJson =  localStorage.getItem(key);
        if (JSON.parse(vJson)){
            return vJson;
        }
    } catch (e) {
        console.error(e);
        alert('unable to get json string from storage');
    }

};

ZStorage.getObject = function(key)
{
    try {
        let vJson =  localStorage.getItem(key);
        let jsonObject = JSON.parse(vJson);
        if (jsonObject){
            return jsonObject;
        }
    } catch (e) {
        console.error(e);
        alert('unable to get json object from storage');
    }
};
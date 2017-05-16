/**
 *  * author  hhtpi
 * Date: 2017/5/9 14:47
 */
import * as localforage from "localforage";

localforage.config({
    driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name        : 'myApp',
    version     : 1.0,
    size        : 10*1024*1024, // Size of database, in bytes. WebSQL-only for now.
    storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description : ''
});

export function initDb() {
    localforage.setItem('citys',[
        {"cityZh": "北京","lat": "39.904", "lon": "116.391" ,"id":0},
        {"cityZh": "上海","lat": "31.213", "lon": "121.445" ,"id":1},
        {"cityZh": "广州", "lat": "23.108", "lon": "113.265", "id":2 },
        {"cityZh": "深圳","lat": "22.544", "lon": "114.109","id":3 }
    ]).then(function (value) {
        return value;
    }).catch(function(err) {
        console.log(err);
    });
}

export function selectDb(key){
    return  localforage.getItem(key).then(function(value) {
        return value;
    }).catch(function(err) {
        console.log(err);
    });
}
export function removeDb(key){
    localforage.removeItem(key).then(function() {
        console.log(key+' is cleared!');
    }).catch(function(err) {
        console.log(err);
    });
}
export function updateDb(key,value){
    localforage.setItem(key,value).then(function() {
        console.log(key+' is update!');
    }).catch(function(err) {
        console.log(err);
    });
}
export function clear(){
    localforage.clear().then(function() {
        // Run this code once the database has been entirely deleted.
        console.log('Database is now empty.');
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
}

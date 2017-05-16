/**
 *  * author  hhtpi
 * Date: 2017/4/27 15:24
 */

import * as wind from './wind-data';

export function distinct(arr) {
    var obj = {},
        i = 0,
        len = 0;
    if (Array.isArray(arr) && arr.length > 0) {
        len = arr.length;
        for (i = 0; i < len; i += 1) {
            obj[arr[i]] = arr[i];
        }
        return Object.keys(obj);
    }
    return [];
}
export function getWeek(time){
    var week = '今天';
    var now = moment();
    var dt = moment(time).format('dddd');
    if(now.format('dddd')==dt){
        week = '今天';
    }else if(now.add(1,'day').format('dddd')==dt){
        week = '明天';
    }else if(now.add(-1,'day').format('dddd')==dt){
        week = '昨天';
    }else{
        week = dt;
    }
    return  week;
}
export function getDegree(deg){
    if(deg>=337.5 || deg<=22.5){
        return "北风";
    }
    for(var i=0;i<wind.windDegree.length;i++){
        var wd = wind.windDegree[i];
        if(deg>=wd.min && deg<wd.max){
            return wd.name;
        }
    }
}
export function getWind(s){
    var speed = Math.round(s*10)/10;
    for(var i=0;i<wind.windLevel.length;i++){
        var wl = wind.windLevel[i];
        if(speed>=wl.min && speed<=wl.max){
            return wl.level;
        }
    }
}

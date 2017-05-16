/**
 *  * author  hhtpi
 * Date: 2017/4/27 16:06
 */

import echarts from "echarts";
import * as utils from './utils';

export function forecastWeatherFormat(list,id){
    var time = [];
    var week = [];
    var max = [];
    var min = [];
    var now = new Date().getTime();
    for(var i=0;i<list.length;i++){
        var w = list[i];
        var info = {
            dt: moment(w.dt*1000).format('M月DD日'),
            tWeek: utils.getWeek(w.dt*1000),
            tMin: Math.ceil(w.temp.min - 273.15),
            tMax: Math.ceil(w.temp.max - 273.15),
            temp: Math.ceil(w.temp.min - 273.15)+'～'+Math.ceil(w.temp.max - 273.15) +"℃",
            tWind:utils.getDegree(w.deg)+" "+utils.getWind(w.speed) +"级",
            icon: w.weather[0].icon,
            desc: w.weather[0].description
        };
//                    var img = "../../../static/img/"+info.icon+".png";
        time.push(info.dt);
        week.push([info.tWeek,info.desc,info.temp,info.tWind]);
        max.push({value:info.tMax,label:{normal:{show:true}}});
        min.push({value:info.tMin,label:{normal:{show:true,position:'bottom'}}});
    }
    var color2 = 'rgba(238, 238, 238, 1)';
    var color1 = 'rgba(27, 177, 178, 1)';
    var myChart = echarts.init(document.getElementById(id));
    myChart.setOption({
        tooltip: {
            show: false,
            trigger: 'axis'
        },
        grid:{
            left:20,
            top:65,
            right:20,
            bottom:25
        },
        xAxis: [{
            axisLine:  {
                show:false
            },
            axisTick:  {
                show:false
            },
            splitLine : {
                show:false
            },
            splitArea : {
                show: true,
                areaStyle:{
                    color:[color1, color2]
                }
            },
            axisLabel:{
                show: true,
                interval:0
            },
            type : 'category',
            boundaryGap : true,
            data: time
        },
            {
                axisLine:  {
                    show:false
                },
                axisTick:  {
                    show:false
                },
                splitLine : {
                    show:false
                },
                splitArea : {
                    show: false,
                    areaStyle:{
                        color:[color1, color2]
                    }
                },
                axisLabel:{
                    show: true,
                    interval:0,
                    formatter: function (value, index) {
                        var label = "";
                        for(var i=0;i<value.length;i++){
                            var br = "\n";
                            if(i==(value.length-1)){
                                br = "";
                            }
                            label += value[i]+br;
                        }
                        return label;
                    }
                },
                type : 'category',
                boundaryGap : true,
                data: week
            }

        ],
        yAxis: {
            boundaryGap:['10%','10%'],
            axisLine:  {
                show:false
            },
            axisTick:  {
                show:false
            },
            splitLine : {
                show:false
            },
            axisLabel:{
                show: false,
                interval:0
            }
        },
        series: [{
            name:'最高气温',
            type:'line',
            data: max
        },{
            name:'最低气温',
            type:'line',
            data: min
        }]
    });
}

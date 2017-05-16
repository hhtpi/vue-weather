/**
*  * author  hhtpi
* Date: 2017/4/26 16:14
*/

<template>
    <div>
        <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
            <mt-swipe :auto="0" :speed="300" :show-indicators="false" :continuous="false"
                      @change="handleChange" :style="{width:winWidth,height: winHeight}">
                <mt-swipe-item v-for="s in swipeList">
                     <div class="current-content">
                        <div class="current-tab">
                            <div class="current-w">
                                <div class="c-temp">{{currentTemp}}</div>
                                <div class="c-desc" v-show="weatherInfo.weather[0].description">
                                    {{country.cityZh}} | {{weatherInfo.weather[0].description}}
                                </div>
                            </div>
                            <div class="current-more">
                                <i class="fa fa-bars" @click="toSetting()"></i>
                            </div>
                            <div class="current-o">
                                <table style="width: 100%;text-align: center">
                                    <tbody>
                                    <tr>
                                        <td width="33%">{{windDeg}}</td>
                                        <td width="33%">湿度</td>
                                        <td width="33%">云层</td>
                                    </tr>
                                    <tr style="font-size: 25px;font-weight: normal">
                                        <td>{{windLevel}} 级</td>
                                        <td>{{weatherInfo.main.humidity}} %</td>
                                        <td>{{weatherInfo.clouds.all}} %</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="forecast-3">
                                    <div class="forecast-3-l" v-for="f in forecast3">
                                        <table style="padding-top:15px;width: 100%">
                                            <tbody>
                                            <tr style="vertical-align: middle">
                                                <td style="width: 20%;text-align: right">
                                                    <img :src="f.icon">
                                                </td>
                                                <td style="width: 30%;text-align: left">
                                                    {{f.week}} / {{f.desc}}
                                                </td>
                                                <td width="40%">{{f.temp}}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <hr style="width: 100%;border: solid #eee 1px">
                                    </div>
                                    <div class="forecast-3-2">
                                        <div  style="padding-top: 15px">
                                            <a @click="toInfo()">14天趋势预报</a>
                                        </div>
                                    </div>
                                </div>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </mt-loadmore>
    </div>
</template>

<script>
    import * as utils from '../../common/utils';
    import * as chart from '../../common/chart';
    import * as db from '../../common/db';
    export default {
        data: function() {
            return {
                weatherInfo:{
                    main:{
                        temp: null,
                        pressure: null,
                        humidity: null,
                        temp_min: null,
                        temp_max: null
                    },
                    wind:{
                        speed: null,
                        deg: null
                    },
                    clouds:{
                        all: null
                    },
                    weather:[{
                        main: null,
                        description: null,
                        icon:null
                    }]
                },
                weatherIcon:null,
                temp:null,
                currentTemp: null,
                date:null,
                windLevel:null,
                windDeg:null,
                forecast3:[],
                swipeList:[],
                weatherData:{
                    current:{},
                    three:{},
                    fourteen:{}
                },
                winWidth:window.innerWidth+'px',
                winHeight:window.innerHeight+'px',
                pcc: ''
            }
        },
        created: function() {
            this.getData();
        },
        methods: {
            getData: function(){
                var self = this;
                var promise = db.selectDb("citys");
                promise.then(function(result) {
                    if(result&&(result.length!=0)){
                        self.swipeList = result;
                        self.getWeather(result[0]);
                    }else{
                        self.$router.push('/search');
                    }
                });
            },
            handleChange: function(index) {
                for(var i=0;i<this.swipeList.length;i++){
                    var city = this.swipeList[i];
                    if(city.id==index){
                        this.getWeather(city);
                    }
                }
            },
            loadTop:function(){
                this.getWeather(this.country);
                setTimeout(()=>{
                    this.$refs.loadmore.onTopLoaded();
                },1000);
            },
            handleTopChange:function(){

            },
            toSetting:function(){
                this.$router.push('/setting');
            },
            getWeather:function(c){
                var self = this;
                self.country = c;
                var weather = "http://api.openweathermap.org/data/2.5/weather?lat="
                    + c.lat + "&lon=" + c.lon + "&lang=zh_cn&appid=1160998a696442e5d6f37722180b19c3";

                this.$axios.get(weather).then(function (res)  {
                    if(res){
                        self.weatherFormat(res.data);
                        self.weatherData.current = res.data;
                        db.updateDb(c.cityEn,self.weatherData);
                    }
                }).catch(function (res) {
                    var promise = db.selectDb(c.cityEn);
                    promise.then(function(result) {
                        if(result){
                            self.weatherFormat(result.current);
                        }
                    });
                });
                this.getForecastWeather3(c);
            },
            weatherFormat:function(resData){
                this.date = moment(new Date()).format('M月DD日');
                this.weatherInfo = resData;
                this.weatherIcon = "static/img/w2/"+resData.weather[0].icon+".png";
                this.currentTemp = Math.ceil(resData.main.temp - 273.15) +"°";
                this.windLevel = utils.getWind(resData.wind.speed);
                this.windDeg = utils.getDegree(resData.wind.deg==undefined?0:resData.wind.deg);
            },
            getForecastWeather3:function(c){
                var self = this;
                var forecast = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="
                    + c.lat + "&lon=" + c.lon + "&lang=zh_cn&cnt=3&appid=1160998a696442e5d6f37722180b19c3";

                this.$axios.get(forecast).then(function(res) {
                    if(res){
                        self.getForecastThree(res.data.list);
                        self.weatherData.three = res.data.list;
                        db.updateDb(c.cityEn,self.weatherData);
                    }
                }).catch(function (res) {
                    var promise = db.selectDb(c.cityEn);
                    promise.then(function(result) {
                        if(result){
                            self.getForecastThree(result.three);
                        }
                    });
                });
            },
            getForecastThree:function(list){
                this.forecast3 = [];
                list.forEach((item)=>{
                    var f = {
                        icon:"static/img/w2/"+item.weather[0].icon+".png",
                        desc:item.weather[0].description,
                        week: utils.getWeek(item.dt*1000),
                        temp:Math.ceil(item.temp.min - 273.15)+'° /'+Math.ceil(item.temp.max - 273.15) +" °",
                    };
                    this.forecast3.push(f);
                });
            },
            toInfo:function(){
                this.$router.push({'path':'/info'});
                setTimeout(()=>{
                    this.getForecastWeather14(this.country);
                },1000);

            },
            getForecastWeather14:function(c){
                var self = this;
                var forecast = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="
                    + c.lat + "&lon=" + c.lon + "&lang=zh_cn&cnt=14&appid=1160998a696442e5d6f37722180b19c3";

                this.$axios.get(forecast).then(function(res){
                    if(res){
                        chart.forecastWeatherFormat(res.data.list,'chart_id');
                        self.weatherData.fourteen = res.data.list;
                        db.updateDb(c.cityEn,self.weatherData);
                    }

                }).catch(function (res) {
                    var promise = db.selectDb(c.cityEn);
                    promise.then(function(result) {
                        if(result){
                            chart.forecastWeatherFormat(result.fourteen,'chart_id');
                        }
                    });
                });
            }
        }
    }
</script>
<style>
    .current-content{
        width: 100%;
        height: 100%;
        margin-bottom: 60px;
    }
    .current-tab{
        height: 300px;
        color: #fff;
        background-color: #1bb1b2;
    }
    .current-w{
        height: 230px;
    }
    .current-o{
        height: 70px;
    }
    .current-more{
        position: absolute;
        top: 30px;
        right: 25px;
    }
    .current-more i{
       font-size: 25px;
    }
    .forecast-3{
        height: 280px;
        vertical-align: middle;
    }
    .c-temp{
        text-align: left;
        padding-top: 25px;
        margin-left: 25px;
        font-size: 70px;
    }
    .c-desc{
        text-align: left;
        margin-left: 20px;
        font-size: 20px
    }
    .forecast-3-l{
        height: 70px;
        text-align: center;
    }
    .forecast-3-2{
        height: 70px;
        text-align: center;
    }
</style>


/**
*  * author  hhtpi
* Date: 2017/4/26 16:12
*/

<template>
    <div>
        <mt-header style=" background-color: #1bb1b2;" fixed title="设置">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <router-link to="/search" slot="right">
                <mt-button ><i class="fa fa-plus"></i> 添加</mt-button>
            </router-link>
        </mt-header>
        <div style="padding-top: 70px">
            <mt-cell-swipe v-for="city in cityList"
                :title="city.cityZh"
                :right="[
                {
                  content: '删除',
                  style: { background: 'red', color: '#fff' },
                  handler: () => updateCityList(city)
                }
              ]"></mt-cell-swipe>
            <!--<mt-button size="large" type="default" >{{city.cityZh}}</mt-button>-->
            <!--<mt-index-list>-->
                <!--<mt-index-section v-for="zm in zList" :index="zm.ii">-->
                    <!--<mt-cell :title="c.cityZh" v-for="c in zm.it"></mt-cell>-->
                <!--</mt-index-section>-->
            <!--</mt-index-list>-->
        </div>
    </div>
</template>

<script>
    import cities from '../../common/citieslatlon';
    import * as utils from '../../common/utils';
    import * as db from '../../common/db';

    export default {
        data: function() {
            return {
                cityList:[],
                zList:[]
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
                    var rl = 0;
                    if(result){
                        self.cityList = result;
                        rl = result.length;
                    }
                    if(self.$route.query.item){
                        var c = self.$route.query.item;
                        self.cityList.push({"cityEn": c.cityEn,"cityZh": c.cityZh, "lat": c.lat, "lon": c.lon,"id":rl});
                        var list = self.sortList(self.cityList);
                        self.saveList(list);
                    }
                });
//                this.indexList();
            },
            sortList:function(list){
                var newList = [];
                for(var i=0;i<list.length;i++){
                    var l = list[i];
                    l.id = i;
                    newList.push(l);
                }
                return newList;
            },
            saveList:function(list){
                db.removeDb("citys");
                db.updateDb("citys",list);
            },
            updateCityList:function(city){
                var newList = [];
                for(var i=0;i<this.cityList.length;i++){
                    var l = this.cityList[i];
                    if(l.cityZh!=city.cityZh){
                        newList.push(l);
                    }
                }
                this.cityList = newList;
                var list = this.sortList(this.cityList);
                this.saveList(list);
                db.removeDb(city.cityEn);
            },
            indexList:function(){
                const iList =  ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
                this.zList = [];
                for(var i=0;i<iList.length;i++){
                    var zm = iList[i];
                    var cityList = [];
                    for(var k=0;k<cities.length;k++){
                        var city = cities[k];
                        if(city.cityEn.substring(0,1).toUpperCase() == zm){
                            cityList.push(city);
                        }
                    }
                    this.zList.push({
                        ii:zm,
                        it:cityList
                    });
                }
            }
        }
    }
</script>


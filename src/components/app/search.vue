/**
*  * author  hhtpi
* Date: 2017/4/26 16:12
*/

<template>
    <div>
        <mt-search autofocus v-model="value" :result="filterResult">
            <mt-button  size="large"  v-for="item in filterList"
                        @click="addList(item)">{{item.cityZh}}
            </mt-button>
        </mt-search>
    </div>
</template>

<script>
    import cities from '../../common/citieslatlon';
    export default {
        data: function() {
            return {
                value: '',
                filterList:[]
            }
        },
        computed: {
            filterResult: function() {
                var cc = cities.filter(value => new RegExp(this.value, 'i').test(value.cityZh));
                this.filterList = cc.map(function(item,index){
                    return item;
                });
                return this.filterList;
            }
        },
        methods: {
            addList:function(item){
                this.$router.push({'path':'/setting',query: {item:item}});
            }
        }
    }
</script>


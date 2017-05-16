/**
*  * author  hhtpi
* Date: 2017/4/26 15:50
*/

<template>
    <div>
        <transition name="move" mode="out-in"><router-view></router-view></transition>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        created: function() {
            this.getData();
        },
        methods: {
            getData: function(){
                this.$router.push('/main');
            }
        }
    }
</script>
<style>
    .page-part{
        height: 60px;
    }
    .page-part i{
        font-size: 20px;
        margin-top: 10px;
        vertical-align: middle;
    }
    .page-part p{
        padding: 2px;
    }
</style>

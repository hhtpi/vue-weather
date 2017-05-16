/**
*  * author  hhtpi
* Date: 2017/4/26 16:16
*/

<template>
    <div>
        <mt-header style=" background-color: #1bb1b2;" fixed title="14天趋势预报">
            <router-link to="/main" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>

        <div class="forecast-tab">
            <div id="chart_id"  style="width:1360px;height:450px;"></div>
        </div>
    </div>
</template>

<script>

    export default {
    }
</script>
<style>
    .forecast-tab{
        padding-top: 60px;
        overflow: auto;
    }
</style>

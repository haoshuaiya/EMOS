<template>
  <div class="overall">
    <div style="height:500px;width:100%;">
        <IEcharts :option="option"></IEcharts>
    </div>
  </div>
</template>
<script>
    import axios from '../../../request/axios.js'
    import IEcharts from 'vue-echarts-v3'
    export default {
        data() {
            return {
                option: {
                    tooltip: {
                        formatter: "{a} <br>{c}"
                    },
                    title: {
                        text: '系统负载'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    series: [{
                        name: '一分钟平均负载',
                        type: 'gauge',
                        z: 3,
                        min: 0,
                        max: 2,
                        splitNumber: 10,
                        radius: '70%',
                        axisLine: {
                            lineStyle: {
                                width: 10
                            }
                        },
                        axisTick: {
                            length: 15,
                            lineStyle: {
                                color: 'auto'
                            }
                        },
                        splitLine: {
                            length: 20,
                            lineStyle: {
                                color: 'auto'
                            }
                        },
                        title: {
                            textStyle: {
                                fontWeight: 'bold',
                                fontSize: 20,
                                fontStyle: 'italic'
                            }
                        },
                        detail: {
                            textStyle: {
                                fontWeight: 'bolder'
                            }
                        },
                        data: [{
                            value: 0,
                            name: '一分钟平均负载'
                        }]
                    }, {
                        name: '五分钟平均负载',
                        type: 'gauge',
                        center: ['34.5%', '55%'], // 默认全局居中
                        radius: '45%',
                        min: 0,
                        max: 2,
                        endAngle: 45,
                        splitNumber: 2,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                width: 8
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        pointer: {
                            width: 5
                        },
                        title: {
                            offsetCenter: [0, '-30%'], // x, y，单位px
                        },
                        detail: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                        data: [{
                            value: 0,
                            name: '五分钟平均负载'
                        }]
                    }, {
                        name: '十五分钟平均负载',
                        type: 'gauge',
                        center: ['65.5%', '55%'], // 默认全局居中
                        radius: '45%',
                        min: 0,
                        max: 2,
                        startAngle: 135,
                        splitNumber: 2,
                        axisLine: { // 坐标轴线
                            lineStyle: { // 属性lineStyle控制线条样式
                                width: 8
                            }
                        },
                        axisTick: { // 坐标轴小标记
                            length: 12, // 属性length控制线长
                            lineStyle: { // 属性lineStyle控制线条样式
                                color: 'auto'
                            }
                        },
                        splitLine: { // 分隔线
                            length: 20, // 属性length控制线长
                            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                                color: 'auto'
                            }
                        },
                        pointer: {
                            width: 5
                        },
                        title: {
                            offsetCenter: [0, '-30%'], // x, y，单位px
                        },
                        detail: {
                            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder'
                            }
                        },
                        data: [{
                            value: 0,
                            name: '十五分钟平均负载'
                        }]
                    }]
                },
                loop: null
            }
        },
        methods:{
           getData(){
                axios.getSysLoad({})
                .then(
                    res => {
                        this.option.series[0].data[0].value = res.load[1];
                        this.option.series[1].data[0].value = res.load[0];
                        this.option.series[2].data[0].value = res.load[2];
                        this.$emit('changeData','load',res.load[0]);
                    }
                )
                .catch(
                    res => {
                        console.log('请求失败');
                    }
                )
           }
        },
        mounted() {
            var that = this;
            that.getData();
            this.loop = setInterval(function() {
               that.getData();
            }, 5000)

        },
        components: {
            IEcharts
        },
        beforeDestroy() {
            clearInterval(this.loop);
        }
    }
</script>
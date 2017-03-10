<template>
  <div class="list-main">
    <left-bar :allState="stateData"></left-bar>
    <router-view></router-view>
  </div>
</template>
<script>
    import LeftBar from './Leftbar.vue'
    export default {
        data() {
            return {
                stateData: {
                    cpu: {
                        used: 80
                    },
                    logics: [{
                        name: 'logic1',
                        used: 35
                    }, {
                        name: 'logic2',
                        used: 44
                    }],
                    load: {
                        'used': 0.44
                    },
                    storage: {
                        'all': 3000,
                        'used': 999
                    },
                    connection: 34,
                    disks: [{
                        "name": "disk1",
                        "used": 44
                    }, {
                        "name": "disk2",
                        "used": 47
                    }],
                    netcards: [{
                        "name": "netcard01",
                        input: 4999,
                        output: 3455
                    }, {
                        "name": "netcard02",
                        input: 9999,
                        output: 3489
                    }]
                }
            }
        },
        components: {
            LeftBar
        }
    }
</script>
<style scoped>
    .list-main {
        margin-top: 20px;
        display: flex;
    }
</style>
<template>
  <div>
    <v-header></v-header>
    <div class="content">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-setting"></i>  总览
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row class="plugins-tips" :border="false" type="flex" justify="space-around">
        <el-col :span="7" :offset="2">月度运维状况: <strong class="success">运营良好</strong></el-col>
        <el-col :span="9">当前服务器状况: <strong class="danger">差</strong></el-col>
        <el-col :span="4" :offset="2">{{timeSet}} </el-col>
      </el-row>
      <div class="crumbs btn-crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-setting"></i>  服务器记录
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" class="view-all" >查看全部</el-button>
      </div>
      <el-table  :data="tableData" style="width: 100%" :row-class-name="infoKlass">
        <el-table-column   label="性质" :formatter="klassFormat"></el-table-column>
        <el-table-column prop="school" label="学校"></el-table-column>
        <el-table-column prop="time" label="时间" ></el-table-column>
        <el-table-column prop="event" label="事件"></el-table-column>
      </el-table>
      <div class="crumbs" style="margin-top: 15px;">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-setting"></i>  七日内所有服务器概览
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="tableData2" border>
        <el-table-column  type="index" width="100" label="序号"></el-table-column>
        <el-table-column label="所属学校">
          <template scope="scope">
            <!--<router-link :to="'/main/detail/'+scope.row.sch_id">{{scope.row.school}}</router-link>-->
            <a href="javascript:;" @click="routerGo(scope.row.sch_id,scope.row.school)">
              {{scope.row.school}}
            </a>
          </template>
</el-table-column>
<el-table-column label="服务器名称" prop="server"></el-table-column>
<el-table-column :label="dayArr[0]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass0">
              {{scope.row.klass0}}
            </div>
          </template>
</el-table-column>
<el-table-column :label="dayArr[1]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass1">
              {{scope.row.klass1}}
            </div>
          </template>
</el-table-column>
<el-table-column :label="dayArr[2]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass2">
              {{scope.row.klass2}}
            </div>
          </template>
</el-table-column>
<el-table-column :label="dayArr[3]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass3" >
              {{scope.row.klass3}}
            </div>
          </template>
</el-table-column>
<el-table-column :label="dayArr[4]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass4">
              {{scope.row.klass4}}
            </div>
          </template>
</el-table-column>
<el-table-column :label="dayArr[5]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass5">
              {{scope.row.klass5}}
            </div>
          </template>
</el-table-column>
<el-table-column :label="dayArr[6]" class-name="no-padding">
    <template scope="scope">
            <div :class="'klass-'+scope.row.klass6" >
              {{scope.row.klass6}}
            </div>
          </template>
</el-table-column>
</el-table>
</div>
<v-footer></v-footer>
</div>
</template>
<script>
    import vHeader from './common/Header.vue'
    import vFooter from './common/Footer.vue'
    import axios from '../request/axios.js'
    export default {
        data() {
            return {
                timeSet: '',
                // 概览数据
                tableData: [{
                    klass: 1,
                    school: '南京大学',
                    event: '内存不足',
                    time: '2017-03-30 15:28'
                }, {
                    klass: 2,
                    school: '南京大学',
                    event: '内存不足',
                    time: '2017-03-30 15:28'
                }, {
                    klass: 3,
                    school: '南京大学',
                    event: '内存不足',
                    time: '2017-03-30 15:28'
                }, {
                    klass: 1,
                    school: '南京大学',
                    event: '内存不足',
                    time: '2017-03-30 15:28'
                }, {
                    klass: 2,
                    school: '南京大学',
                    event: '内存不足',
                    time: '2017-03-30 15:28'
                }],
                tableData2: [{
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 1,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 1
                    }, {
                        school: '浙江大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 2
                    }, {
                        school: '北京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 3
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 4
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 4
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 5
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 6
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 7
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 8
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 8
                    }, {
                        school: '南京大学',
                        server: 'localhost',
                        klass0: 1,
                        klass1: 5,
                        klass2: 3,
                        klass3: 4,
                        klass4: 1,
                        klass5: 2,
                        klass6: 5,
                        sch_id: 9
                    },


                ]
            }
        },
        components: {
            vHeader,
            vFooter
        },
        computed: {
            // 由今天往前推七天日期数组
            dayArr() {
                var temp = [];
                var date = new Date();
                for (var i = 0; i < 7; i++) {
                    temp.push((date.getMonth() + 1) + '月' + (date.getDate()) + '日');
                    date = new Date(date.getTime() - 24 * 3600 * 1000);
                }
                return temp;
            }
        },
        methods: {
            // 条件渲染cell样式
            infoKlass(row, index) {
                if (row.klass == 1) {
                    return '';
                } else if (row.klass == 2) {
                    return 't-warning'
                } else if (row.klass == 3) {
                    return 't-danger'
                }
            },
            // 条件输出
            klassFormat(row, index) {
                if (!row.klass) {
                    return '';
                } else if (row.klass == 1) {
                    return '建议';
                } else if (row.klass == 2) {
                    return '预警';
                } else if (row.klass == 3) {
                    return '异常';
                }
            },
            routerGo(id, name) {
                localStorage.setItem('school', name)
                this.$router.push('/main/detail/' + id + '/index');
            }
        },
        created() {
            var that = this;
            // 时间显示
            setInterval(function() {
                that.timeSet = new Date().toLocaleString()
            }, 1000);
        }
    }
</script>
<style scoped>
    .content {
        top: 55px;
    }
    .crumbs {
        margin-bottom: 24px;
    }
    .el-breadcrumb {
        font-size: 16px;
        line-height: 1;
    }
    .summary {
        width: 100%;
        height: 140px;
        background-color: #fff;
    }
    
    .view-all {
        margin-bottom: 10px;
        position: absolute;
        top: 0;
        right: 0;
    }
</style>
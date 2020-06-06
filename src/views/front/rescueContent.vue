<template>
    <div class="cc">
        <el-container>
            <el-header>
                <el-divider></el-divider>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu router>
                        <el-menu-item-group>
                            <template slot="title"><span style="font-size: 28px">公益项目<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/rescue">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <el-menu-item index="/help">
                                {{mulu[1].name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <img src="../../assets/erweima.jpg" width="130">
                        <el-menu-item-group title="扫一扫关注公众号">
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main v-if="project.updateTime">
                        <el-row align="left" style="float: left">
                            <el-col :span="6">
                                <img :src="require('../../assets/projectPic/'+project.ppicpath)" alt="加载失败" class="pic">
                                <el-divider></el-divider>
                            </el-col>
                            <el-col :span="16">
                                <h2 class="hh">已筹金额:&nbsp;&yen;{{this.money}}元</h2>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <span style="float:left">{{project.pname}}</span>
                                <br>
                                <br>
                                <span style="float: left; text-align: left">
                                    {{project.pcontent}}
                                </span>
                            </el-col>
                        </el-row>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "rescueContent",
        data() {
            return {
                project: [],
                money: '',
                mulu: [
                    {
                        name: '应急救援'
                    },
                    {
                        name: '社会援助'
                    }
                ]
            }
        },
        mounted() {
            //console.log(this.$route)
            axios({
                method: 'get',
                url: 'http://localhost:8181/charity/cproject/selectById',
                params: {
                    id: this.$route.query.id,
                }
            }).then(response => {
                //console.log(response)
                this.project = response.data
            });
            axios({
                method: 'get',
                url: 'http://localhost:8181/charity/donation/findMoney',
                params: {
                    id: this.$route.query.id,
                }
            }).then(response => {
                this.money = response.data;
                //console.log(response)
            });

        }
    }
</script>

<style scoped>
    .cc {
        font-size: 14px;
        line-height: 25px;
    }

    .pic {
        height: 200px;
        width: 300px;
    }
    .hh{
        float: left;
        margin-left: 300px;
        text-align: left;
        font-family: 幼圆;
        color: #00a4b5;
    }
</style>

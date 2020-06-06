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
                            <template slot="title"><span style="font-size: 28px">新闻中心<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/newsinfo">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <el-menu-item index="/boardinfo">
                                {{mulu[1].name}}
                            </el-menu-item>
                        </el-menu-item-group>
                        <img src="../../assets/erweima.jpg" width="130">
                        <el-menu-item-group title="扫一扫关注公众号">
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main v-if="board.updateTime">
                        <span>{{board.btitle}}</span>
                        <br>
                        <span style="float: left">作者:{{board.bauthor}}</span>
                        <span style="float: right">时间:{{board.updateTime.substr(0,10)}}</span>
                        <br/>
                        <el-divider></el-divider>
                        <span style="text-align: left; float: left">
                            {{board.bcontent}}
                        </span>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "boardContent",
        data() {
            return {
                board: [],
                mulu: [
                    {
                        name: '新闻动态'
                    },
                    {
                        name: '网站公告'
                    }
                ]
            }
        },
        mounted() {
            //console.log(this.$route)
            axios({
                method: 'get',
                url: 'http://localhost:8181/charity/board/selectById',
                params: {
                    id: this.$route.query.id,
                }
            }).then(response => {
                //console.log(response)
                this.board = response.data
            })
        }
    }
</script>

<style scoped>
    .cc {
        font-size: 14px;
        line-height: 25px;
    }
</style>

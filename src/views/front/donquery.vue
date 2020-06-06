<template>
    <div class="qq">
        <el-container>
            <el-header>
                <el-divider></el-divider>
            </el-header>
            <el-container>
                <el-aside>
                    <el-menu router>
                        <el-menu-item-group>
                            <template slot="title"><span style="font-size: 28px">爱心捐赠<el-divider></el-divider></span>
                            </template>
                            <el-menu-item index="/donpass">
                                {{mulu[0].name}}
                            </el-menu-item>
                            <!--<el-menu-item index="/donquery">
                                {{mulu[1].name}}
                            </el-menu-item>-->
                        </el-menu-item-group>
                        <img src="../../assets/erweima.jpg" width="130">
                        <el-menu-item-group title="扫一扫关注公众号">
                        </el-menu-item-group>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main>

                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "donquery",
        data() {
            return {
                mulu: [
                    {
                        name: '捐赠通道'
                    },
                    {
                        name: '捐赠查询'
                    }
                ]
            }
        },
    }
</script>

<style scoped>
    .qq {
        font-size: 14px;
        line-height: 0px;
    }


</style>

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
                        <span>捐赠方式</span>
                        <el-divider></el-divider>
                        <span style="line-height: 25px;text-align: left;float: left">1、为满足慈善爱心人士的公益捐赠需求，小城大爱设立公益捐赠通道。
                            “在线捐赠”通道建议您首选支付宝（支付宝公益捐赠通道0费率），
                            没有支付宝的爱心人士也可以选择银联在线，且因使用银联在线交易中产生的手续费用将由基金会承担。
                            <br>
                            2、为保障您的资金安全，大额捐赠（5万以上）不建议通过网上“在线捐赠”进行，如有捐赠意向请与我们的工作人员联系。
                            <br>
                            3、我们将会为每一位爱心人士的善款开具公益事业捐赠票据，
                            并免费为单笔捐赠金额大于等于5000元的爱心人士邮寄捐赠票据，
                            所以请在注册时务必留下您的真实姓名、电话和详细的邮寄地址，
                            我们会对您的相关信息进行保密。如果您的单笔捐赠金额小于5000元并需要取得捐赠票据，请申请。
                            我们预计在收到您的申请之后7个工作日内将您的捐赠票据以到付的形式邮寄给您，感谢您对公益事业的理解和支持。
                            <br>
                            4、小城大爱未授权任何个人进行劝募或者举办其他活动，
                            如有疑问，请致电我会咨询。感谢您的善举。
                            欢迎社会各界爱心人士捐款支持公益事业的发展，善款将全部用于小城大爱慈善基金会项目执行，
                            财务透明，定期公布。诚邀社会与媒体共同监督。
                        </span>
                    </el-main>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "donpass",
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

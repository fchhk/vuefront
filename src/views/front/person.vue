<template>
    <div class="hh">
        <el-row>
            <el-col :span="12" align="right">
                <div>姓名：</div>
                <div>密码：</div>
                <div>邮箱：</div>
            </el-col>
            <el-col :span="12" align="left">
                <div>{{this.xinxi.uname}}</div>
                <div>{{this.xinxi.upwd}}</div>
                <div>{{this.xinxi.uemail}}</div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "person",
        data() {
            return {
                xinxi: []
            }
        },
        created() {
            axios.post('user/profile', null, {headers: {Authorization: "Bearer " + this.$store.state.token}}).then(response => {
                //console.log(response.data.data);
                this.xinxi = response.data.data;
                //console.log(this.xinxi)
            });
        }
    }
</script>

<style scoped>
    .hh {
        font-family: 幼圆;
        margin-top: 20px;
    }
</style>

<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="支出地方" prop="name">
                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="money">
                <el-input type="text" v-model="ruleForm.money" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="货物" prop="goods">
                <el-input type="text" v-model="ruleForm.goods" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "addPay",
        data() {
            let regMoney = /^([1-9]\d*|0)\.\d{2}$/;
            var validateMoney = (rule, value, callback) => {
                if (value == '') {
                    callback();
                }
                if (!regMoney.test(value)) {
                    callback(new Error('请输入带两位小数的数字，0则输入0.00'))
                } else {
                    callback();
                }

            };

            return {
                pay: [],
                ruleForm: {
                    name: '',
                    money: '',
                    goods: ''
                },
                rules: {
                    name: [
                        {required: true, message: "请输入支出地方", trigger: "blur"}
                    ],
                    money: [
                        {required: false,},
                        {validator: validateMoney, trigger: 'blur'}
                    ],
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append("ptitle", this.ruleForm.name);
                        params.append("pmoney", this.ruleForm.money);
                        params.append("pgoods", this.ruleForm.goods);
                        axios.post('http://localhost:8181/charity/pay/register', params).then(resp => {
                            //console.log(resp)
                            if (resp.status == 200) {
                                this.$message.success("捐赠成功！");
                                this.resetForm(formName);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
    }
</script>

<style scoped>

    .demo-ruleForm {
        font-family: 幼圆;
        margin-top: 50px;
        margin-left: 300px;
        text-align: center;
        width: 500px;
    }
</style>

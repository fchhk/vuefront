<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <h3 class="loginTitle">新增新闻</h3>
            <el-form-item label="标题" prop="title">
                <!--auto-complete:是否自动补全-->
                <el-input type="text" v-model="ruleForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input type="text" v-model="ruleForm.author" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content" autocomplete="off" autosize></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
    export default {
        name: "addNews",
        data() {
            return {
                ruleForm: {
                    title: '',
                    author: '',
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: "请输入标题", trigger: "blur"}
                    ],
                    author: [
                        {required: true, message: "请输入作者", trigger: "blur"}
                    ],
                    content: [
                        {required: true, message: "请输入内容", trigger: "blur"},
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append("ntitle", this.ruleForm.title);
                        params.append("nauthor", this.ruleForm.author);
                        params.append("ncontent", this.ruleForm.content);
                        axios.post('http://localhost:8181/charity/news/register', params).then(resp => {
                            // console.log(resp)
                            if (resp.status==200){
                                this.resetForm('ruleForm');
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                // alert("添加成功！")
                            }
                        })

                        // alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .loginTitle {
        margin: 15px;
        text-align: center;
        color: #505458;
    }

    .demo-ruleForm {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 100px auto;
        width: 500px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

</style>

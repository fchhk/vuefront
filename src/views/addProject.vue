<template>
    <div>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
            <h3 class="loginTitle">新增项目</h3>
            <el-form-item label="项目名" prop="title">
                <!--auto-complete:是否自动补全-->
                <el-input type="text" v-model="ruleForm.title" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="内容" prop="content">
                <el-input type="textarea" v-model="ruleForm.content" autocomplete="off" autosize></el-input>
            </el-form-item>

            <el-form-item label="图片" prop="pic">
                <!--<el-input v-model="ruleForm.pic" autocomplete="off" style="display: none"></el-input>

                <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>-->
                <el-upload
                        class="avatar-uploader"
                        action="http://localhost:8181/file"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
        name: "addProject",
        data() {
            return {
                imageUrl: '',
                ruleForm: {
                    title: '',
                    content: '',
                    pic: ''
                },
                rules: {
                    title: [
                        {required: true, message: "请输入项目名", trigger: "blur"}
                    ],
                    content: [
                        {required: true, message: "请输入内容", trigger: "blur"},
                    ]
                }
            };
        },
        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.ruleForm.pic = res.message;
                console.log(this.imageUrl);
                console.log(res)
            },

            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = new URLSearchParams();
                        params.append("pname", this.ruleForm.title);
                        params.append("pcontent", this.ruleForm.content);
                        params.append("ppicpath", this.ruleForm.pic)
                        axios.post('http://localhost:8181/charity/cproject/register', params).then(resp => {
                            // console.log(resp)
                            if (resp.status == 200) {
                                //this.resetForm('ruleForm');
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                location.reload();
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
        margin: 50px auto;
        width: 500px;
        padding: 15px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

</style>

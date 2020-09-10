<template>
    <div class="login-page">
        <div class="login-bg-warp"></div>
        <div class="login-form-wrap">
            <div class="login-form">
                <div class="login-form-left">
                    <img src="@/assets/images/logo/logo.png" alt="">
                    <h3 class="title"> 陕西世纪国瑞综合服务平台 </h3>
                </div>
                <div class="login-form-right">
                    <el-form :model="loginform" ref="login-form" :rules="loginrule" class="el-login-from">
                        <el-form-item prop="username" >
                            <el-input type="text" v-model.trim="loginform.username" autocomplete="off" class="login-form-input" placeholder="请输入用户名">
                                <i slot="prefix" class="el-input__icon el-icon-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password" >
                            <el-input type="password" v-model.trim="loginform.password" autocomplete="off" class="login-form-input" placeholder="请输入密码">
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" class="submit-btn" style="width: 100%" :loading="this.loading" @click="formSubmit('login-form')">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import loginApi from '@/api/login-api'
import { get_uuid } from '@/utils/validate'
import Session from '@/utils/session-util'
export default {
    name: 'login-page',
    data(){
        return {
            loginform: {
                username: '1000',
                password: '123456'
            },
            loginrule: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    created() {
        // 清除缓存
        Session.removeAllSession()
        // enter登录事件
        document.querySelector('body').addEventListener('keyup', this.enterEvent)
    },
    beforeDestroy() {
        document.querySelector('body').removeEventListener('keyup', this.enterEvent)
    },
    methods: {
        // 登录 form 
        formSubmit(form_name) {
            const _this = this;
            this.$refs[form_name].validate((valid) => {
                if (valid) {
                    const params = Object.assign({ seq_num: 1, channel: "pc", isContractor: "0", device_id: get_uuid() }, this.loginform);
                    if(this.logining) this.$message({type: 'error', message:'正在登录请稍后...'})
                    this.loading = true
                    loginApi.login(params).then( async res =>{
                        console.log(res)
                        this.loading = false
                        const data = res.data;
                        if(data.data !== null && data.success) {
                            const {seq_num, channel, isContractor, device_id} = params;
                            const {token, signature, tgt} = data.data;
                            const tokenData = {seq_num, channel, isContractor, device_id, token, signature, tgt};
                            /* 存储用户信息 */
                            const path = await this.$store.dispatch('userStore/sessionUserinfo', {token: tokenData, userinfo: data.data.userInfo})
                            if(path) {
                                this.$message({
                                    type: 'success',
                                    message: '登录成功',
                                    duration: 1000,
                                    onClose() {
                                        location.href = `/${path}`
                                    }
                                })
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '空白用户'
                                })
                            }
                        }
                    }).catch(error => {
                        this.$message({type: 'error', message: '登陆失败'})
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // enter 登录
        enterEvent(e) {
            if(e.keyCode === 13) {
                this.loginSubmit()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    @import url('../../../style/basictheme.scss');
    .login-page {
        height: 100vh;
        position: relative;
        .login-bg-warp {
            height: 100%;
            color: $basictheme-color;
            background: url('../../../assets/images/login/login-bg1.jpg') no-repeat;
            background-size: cover;
            background-position: center 0;
            // filter: blur(4px);
        }
        .login-form-wrap {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            padding: 100px 0 85px;
            .login-form {
                display: flex;
                flex-direction: row;
                justify-content: center;
                color: #ffffff;
                .login-form-left {
                    margin-right: 60px;
                    .title {
                        font-size: 28px;
                        margin-top: 25px;
                        letter-spacing: 2px;
                    }
                    margin-bottom: 15px;
                }
                .login-form-right {
                    /deep/.el-login-from {
                        padding: 0 70px;
                        width: 480px;
                        box-sizing: border-box;
                        .login-form-input {
                            .el-input__icon {
                                color: #ffffff;
                                font-size: 18px;
                                margin-left: 5px;
                            }
                            .el-input__inner {
                                height: 40px;
                                color: #ffffff;
                                background-color: transparent;
                                padding-left: 40px;
                                border-color: #999999;
                                &::placeholder {
                                    color: #ffffff;
                                    font-size: 13px;
                                    letter-spacing: 2px;
                                }
                                &:focus {
                                    border-color: #ffffff;
                                }
                                &::placeholder {
                                    color: #aaaaaa;
                                }
                            }
                        }
                        .submit-btn {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
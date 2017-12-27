<template>
    <div class="sign-up">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a href="/">首页</a>
                <span>/</span>
                <span>注册</span>
            </div>
            <div v-if="validatestatement" class="bg-info">
                {{ validatestatement }}
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">用户名</div>
                        <input v-model="user.userName" class="form-control" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">邮箱</div>
                        <input v-model='user.email' class="form-control" type="email">
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">验证码</div>
                        <input v-model='verifyCode' class="form-control" type="text">
                        <div class="input-group-addon">
                            <div v-if="time">{{ time }}s</div>
                            <a v-if="!time" @click="getVerifyCode" href="javascript:;">获取
                            </a>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">密码</div>
                        <input v-model="user.password" class="form-control" type="password">
                    </div>
                </div>
            </div>
            <div class="panel-footer clearfix">
                <button @click="signup" class="btn btn-primary pull-right">
                    注册
                </button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import config from '../../config/config'
    import 'whatwg-fetch'
    export default {
        data () {
            return {
                user: {
                    userName: '',
                    password: '',
                    email: ''
                },
                validatestatement: '',
                verifyCode: '',
                time: 0
            }
        },
        methods: {
            validate () {
                let pattern = /^\w+@[a-z0-9]+\.[a-z]+$/i;
                if(!this.user.userName.trim()){
                    this.validatestatement = "用户名不能为空";
                    return 0;
                }
                if(!pattern.test(this.user.email)){
                    this.validatestatement = "请输入合法的邮箱";
                    return 0;
                }
                if(!this.user.password.trim()){
                    this.validatestatement = "密码不能为空";
                    return 0;
                }
                if(parseInt(this.realVerifyCode) !== parseInt(this.verifyCode)) {
                    this.validatestatement = '邮箱验证码不对';
                    return 0;
                }
                this.validatestatement = '';
                return 1;
            },
            getVerifyCode () {
                let pattern = /^\w+@[a-z0-9]+\.[a-z]+$/i;
                if(!pattern.test(this.user.email)){
                    this.validatestatement = "请输入合法的邮箱";
                    return 0;
                } else {
                    this.validatestatement = "";
                }
                this.time = 30;
                let time = setInterval(() => {
                    this.time--;
                    if(this.time == 0){
                        clearInterval(time);
                    }
                }, 1000);
                let data = {
                    email: this.user.email
                };
                fetch(`${config.server}/getVerifyCode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    if(res.ok) {
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorCode){
                        this.realVerifyCode = json.verifyCode;
                    } else {
                        this.validatestatement = json.msg;
                    }
                });
            },
            signup () {
                if (!this.validate()) {
                    return 0;
                }
                let data = {
                    email: this.user.email,
                    password: this.user.password,
                    userName: this.user.userName
                };
                fetch(`${config.server}/user/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        location.href = '/user/signin';
                    } else {
                        this.validatestatement = json.msg;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .sign-up{
        margin-top: 20px;
    }
    .panel-custom{
        border-radius: 0px;
    }
    a {
        color: #42b983;
    }
    .signup-wrap{
        display: none;
    }
    ._info{
        position: fixed;
    }
</style>

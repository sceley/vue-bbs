<template>
    <div class="seek-container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a href="/">首页</a>
                <span>/</span>
                <span>忘记密码</span>
            </div>
            <div class="panel-body">
                <p v-if="getStatus" class="bg-info">
                    {{ getStatus }}
                </p>
                <form action="">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">用户名</div>
                            <input v-model="user.userName" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">邮箱验证码</div>
                            <input v-model="verifyCode" class="form-control" type="text">
                            <div class="input-group-addon">
                                <div v-if="time">
                                    {{ time }}s
                                </div>
                                <a v-if="!time" @click="getVerifyCode" href="javascript:;">
                                    获取
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">新密码</div>
                            <input v-model="user.password" class="form-control" type="password">
                        </div>
                    </div>
                </form>
            </div>
            <div class="panel-footer pull-center">
                <button @click="seek_password" class="btn btn-primary">
                    找回密码
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config/config';
    import 'whatwg-fetch'
    export default {
        data () {
            return {
                user: {
                    userName: '',
                    password: ''
                },
                getStatus: '',
                verifyCode: '',
                time: 0
            }
        },
        methods: {
            validate () {
                if(!this.user.userName.trim()){
                    this.getStatus = "用户名不能为空";
                    return 0;
                }
                if(!this.user.password.trim()){
                    this.getStatus = "密码不能为空";
                    return 0;
                }
                if(parseInt(this.realVerifyCode) != parseInt(this.verifyCode)){
                    this.getStatus = '请输入正确的验证码';
                    return 0;
                }
                return 1;
            },
            getVerifyCode () {
                if(!this.user.userName.trim()){
                    this.getStatus = "用户名不能为空";
                    return 0;
                };
                this.userName = this.user.userName;
                this.time = 30;
                let time = setInterval(() => {
                    this.time--;
                    if(this.time == 0){
                        clearInterval(time);
                    }
                }, 1000);

                let data = {
                    userName: this.user.userName
                };

                fetch(`${config.server}/seek/getVerifyCode`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if(!json.errorcode){
                        this.realVerifyCode = json.verifyCode;
                    } else {
                        this.getStatus = json.msg;
                    }
                });
            },
            seek_password () {
                if (!this.validate()) {
                    return 0;
                }
                let data = {
                    userName: this.user.userName,
                    password: this.user.password
                };
                fetch(`${config.server}/user/seek-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        location.href = '/signin';
                    } else {
                        this.getStatus = json.msg;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    a {
        color: #42b983;
    }
</style>

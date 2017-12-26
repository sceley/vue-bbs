<template>
    <div class="sign-up">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a href="/">首页</a>
                <span>/</span>
                <span>忘记密码</span>
            </div>
            <div class="panel-body">
                <p v-if="getStatus" class="bg-info">{{ getStatus }}</p>
                <form action="">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">用户名</div>
                            <input v-model="userInfo.userName" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">邮箱验证码</div>
                            <input v-model="verifyCode" class="form-control" type="text">
                            <div class="input-group-addon">
                                <div v-if="time">{{ time }}s</div>
                                <a v-if="!time" @click="getVerifyCode" href="javascript:;">获取</a>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">新密码</div>
                            <input v-model="userInfo.password" class="form-control" type="password">
                        </div>
                    </div>
                </form>
            </div>
            <div class="panel-footer clearfix">
                <button @click="forget" class="btn btn-primary pull-right">
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
                userInfo: {},
                getStatus: '',
                verifyCode: '',
                time: 0
            }
        },
        created () {
            
        },
        methods: {
            validate () {
                if(!this.userInfo.userName.trim()){
                    this.getStatus = "用户名不能为空";
                    return 0;
                }
                if(!this.userInfo.password.trim()){
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
                console.log(this.userInfo.userName);
                if(!this.userInfo.userName.trim()){
                    this.getStatus = "用户名不能为空";
                    return 0;
                };
                let time = setInterval(() => {
                    this.time--;
                    if(this.time == 0){
                        this.time = 60;
                        clearInterval(time);
                    }
                }, 1000);
                let data = {
                    userName: this.userInfo.userName
                };
                // fetch(`/`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(data)
                // }).then(res => {
                //     if(res.ok){
                //         return res.json();
                //     }
                // }).then(json => {
                //     if(!json.errorcode){
                //         json.realVerifyCode = json.verifyCode;
                //     }
                //     else{
                //         this.getStatus = json.getStatus;
                //     }
                // });
            },
            // verify () {
                
            //     let data = {
            //         email: this.email
            //     };
            //     fetch(`${this.settingurl}/verify`, {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify(data)
            //     }).then(res => {
            //         if(res.ok) {
            //             return res.json();
            //         }
            //     }).then(json => {
            //         this.verifyCode = json.verifyCode;
            //     });
            // },
            forget () {
                let data = {
                    userName: this.userName,
                    password: this.password
                };
                // fetch(`/forget`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify(data)
                // }).then((res) => {
                //     if(res.ok){
                //         return res.json();
                //     }
                // }).then(json => {
                //     if (json.errorcode) {
                //         localStorage.token = json.token;
                //         location.href = '/';
                //     }
                // });
            }
        }
    }
</script>

<style scoped>
    .sign-up{
        margin-top: 20px;
    }
    a {
        color: #42b983;
    }
</style>

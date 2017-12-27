<template>
    <div class="sign-up">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a href="/">首页</a>
                <span>/</span>
                <span>设置</span>
            </div>
            <div class="panel-body">
                <p v-if="userinfostatus" class="bg-info">{{ userinfostatus }}</p>
                <form action="">
                    <div class="pull-center">我的头像</div>
                    <div class="gravatar-wrap">
                        <img class="gravatar" v-bind:src="user.gravatar">
                    </div>
                    <div class="upfile">
                        <label class="btn btn-primary">
                            <input @change="changeimage" class="choose" type="file">
                            Upload new picture
                        </label>
                    </div>
                    <div class="form-group">
                        <div class="pull-center">用户名</div>
                        <div class="pull-center h4">{{ user.userName }}</div>
                    </div>
                    <div class="form-group">
                        <label for="">邮箱</label>
                        <input v-model="user.email" type="email" class="form-control" placeholder="邮箱">
                    </div>
                    <div class="form-group">
                        <label for="">个性签名</label>
                        <textarea v-model="user.signature" class="form-control" rows="3"></textarea>
                    </div>
                    <div class="pull-center">
                        <button @click="savechange" type="button" class="btn btn-primary">保存设置</button>
                    </div>
                </form>
            </div>
            <div class="panel-heading">
                更改密码
            </div>
            <div class="panel-body">
                <p v-if="passwordstatus" class="bg-info">
                    {{ passwordstatus }}
                </p>
                <div class="form-group">
                    <label for="">新密码</label>
                    <input v-model="password" type="password" class="form-control" placeholder="新密码">
                </div>
                <div class="pull-center submit-wrap">
                    <button @click="changepassword" class="btn btn-primary">更改密码</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config/config';
    import 'whatwg-fetch';
    export default {
        data () {
            return {
                user: {
                    email: '',
                    password: '',
                    userName: '',
                    signature: ''
                },
                password: '',
                passwordstatus: '',
                userinfostatus: ''
            }
        },
        created () {
            if(!localStorage.token){
                location.href = '/';
                return 0;
            }
            fetch(`${config.server}/user/setting`, {
                method: 'GET',
                headers: {
                    'x-access-token': localStorage.token
                }
            }).then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                if (!json.errorcode) {
                    this.user = json.user;
                } else if (json.errorcode == 333) {
                    localStorage.token = '';
                    location.href = '/user/signin';
                } else {
                    this.userinfostatus = json.msg;
                }
            });
        },
        methods: {
            validate () {
                let pattern = /^\w+@[a-z0-9]+\.[a-z]+$/i;
                if (!pattern.test(this.user.email)) {
                    this.userinfostatus = '邮箱格式错误';
                    return 0;
                }
                return 1;
            },
            savechange () {
                if (!this.validate()) {
                    return 0;
                }
                let data = {
                    email: this.user.email,
                    signature: this.user.signature
                };
                fetch(`${config.server}/user/change-userinfo`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.token
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        this.userinfostatus = json.msg;
                    } else if (json.errorcode == 333) {
                        localStorage.token = '';
                        location.href = '/user/signin'
                    } else {
                        this.userinfostatus = json.msg;
                    }
                });
            },
            changeimage () {
                let imagImg = document.querySelector(".choose").files[0];
                console.log(imagImg);
                let data = new FormData();
                data.append('image', imagImg);
                fetch(`${config.server}/user/change-image`, {
                    method: 'POST',
                    headers: {
                        'x-access-token': localStorage.token
                    },
                    body: data
                }).then(res => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        location.reload();
                    } else if (json.errorcode == 333) {
                        localStorage.token = '';
                        location.href = '/user/signin';
                    } else {
                        this.userinfostatus = json.msg;
                    }
                });
            },
            changepassword () {
                if(!this.password.trim()){
                    return this.passwordstatus = '新密码不能为空';
                }
                let data = {
                    password: this.password
                };
                fetch(`${config.server}/user/change-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.token
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    if(res.ok){
                        return res.json();
                    }
                }).then(json => {
                    if (!json.errorcode) {
                        this.passwordstatus = json.msg;
                        this.password = '';
                    } else if (json.errorcode == 333) {
                        localStorage.token = '';
                        location.href = '/user/signin';
                    } else {
                        this.passwordstatus = json.msg;
                    }
                });
            }
        }
    };
</script>

<style scoped>
    .sign-up{
        margin-top: 20px;
    }
    .gravatar-wrap{
        margin: 0 auto;
        margin-bottom: 10px;
        margin-top: 10px;
    }
    .upfile{
        position: relative;
        margin: 20px 0;
        text-align: center;
    }
    .choose, .gravatar-wrap{
        width: 120px;
    }
    .choose{
        position: absolute;
        opacity: 0;
    }
    .pull-center{
        text-align: center;
    }
    a {
        color: #42b983;
    }
</style>

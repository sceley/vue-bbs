<template>
    <div class="sign-up">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a href="/">首页</a>
                <span>/</span>
                <span>登陆</span>
            </div>
            <div class="panel-body">
                <p v-if="signinstatus" class="bg-info">{{ signinstatus }}</p>
                <form action="">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">用户名</div>
                            <input v-model="user.userName" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">密码</div>
                            <input v-model="user.password" class="form-control" type="password">
                        </div>
                    </div>
                    <div class="forget-password">
                        <a href="/user/forget">忘记密码</a>
                    </div>
                </form>
            </div>
            <div class="panel-footer clearfix">
                <button @click="signin" class="btn btn-primary pull-right">
                    登陆
                </button>
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
                password: ''
            },
            signinstatus: ''
        }
    },
    methods: {
        validate () {
            if (!this.user.userName.trim()) {
                this.signinstatus = '用户名不能为空';
                return 0;
            }
            if (!this.user.password.trim()) {
                this.signinstatus = '密码不能为空';
                return 0;
            }
            return 1;
        },
        signin () {
            let data = {
                userName: this.user.userName,
                password: this.user.password
            }
            fetch(`${config.server}/user/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length
                },
                body: JSON.stringify(data)
            })
            .then(res => {
                return res.json();
            })
            .then(json => {
                if(!json.errorcode){
                    localStorage.token = json.token;
                    location.href = "/";
                } else {
                    this.signinstatus = json.msg;
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
.forget-password{
    text-align: center;
}
a {
    color: #42b983;
}
</style>

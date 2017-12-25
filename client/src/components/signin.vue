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
                            <input v-model="userName" class="form-control" type="text">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">密码</div>
                            <input v-model="password" class="form-control" type="password">
                        </div>
                    </div>
                    <div class="forget-password">
                        <a href="/forget">忘记密码</a>
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
            userName: '',
            password: '',
            signinstatus: ''
        }
    },
    methods: {
        signin () {
            let data = {
                userName: this.userName,
                password: this.password
            }
            fetch(`${}/user/signin`, {
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
                    signinstatus = json.msg;
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

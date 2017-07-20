<template>
  <div class="sign-up">
    <div v-if="!isnext" class="panel panel-default">
      <div class="panel-heading">
          <a href="/">首页</a>
          <span>/</span>
          <span>忘记密码</span>
      </div>
      <div class="panel-body">
        <p class="bg-info">{{ userstatement }}</p>
        <form action="">
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">用户名</div>
              <input v-model="userName" class="form-control" type="text">
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-addon">新密码</div>
              <input v-model="password" class="form-control" type="password">
            </div>
          </div>
        </form>
      </div>
      <div class="panel-footer clearfix">
        <button @click="next" class="btn btn-primary pull-right">
          下一步
        </button>
      </div>
    </div>

    <div v-if="isnext" class="panel">
      <div class="panel-heading">
        <a href="/">首页</a>
        <span>/</span>
        <span>邮箱验证码</span>
      </div>
      <div class="panel-body">
        <p class="bg-info">{{ correctstatement }}</p>
        <p class="bg-info">我们已发送了校验码到你的邮箱:</p>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">邮箱验证码</div>
            <input v-model="imagVerifyCode" class="form-control" type="text">
            <div class="input-group-addon">
              <div v-if="time">{{ time }}s</div>
              <a v-if="!time" @click="verify" href="javascript:;">获取</a>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-footer clearfix">
        <button @click="forget" class="btn btn-primary pull-right">
          下一步
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '../../config/config';
  export default {
    data () {
      return {
        pattern: /^\w+@[a-z0-9]+\.[a-z]+$/i,
        userName: '',
        password: '',
        email: '',
        userstatement: '',
        correctstatement: '',
        verifyCode: '',
        imagVerifyCode: '',
        time: 60,
        isnext: false,
        settingurl: ''
      }
    },
    created () {
      this.settingurl = config.settingurl;
    },
    methods: {
      next () {
        if(!this.userName.trim()){
          return this.userstatement = "用户名不能为空";
        }
        if(!this.password.trim()){
          return this.userstatement = "密码不能为空";
        }
        let data = {
          userName: this.userName
        };
        fetch(`${this.settingurl}/getemail`, {
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
          if(json._status){
            this.email = json.email;
            this.isnext = true;
            this.verify();
          }
          else{
            this.userstatement = json.statement;
          }
        });
      },
      verify () {
        let time = setInterval(() => {
          this.time--;
          if(this.time == 0){
            this.time = 60;
            clearInterval(time);
          }
        }, 1000);
        let data = {
          email: this.email
        };
        fetch(`${this.settingurl}/verify`, {
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
          this.verifyCode = json.verifyCode;
        });
      },
      forget () {
        if(!(parseInt(this.imagVerifyCode) == this.verifyCode)){
          return this.correctstatement = '请输入正确的验证码';
        }
        let data = {
          userName: this.userName,
          password: this.password
        };
        fetch(`${this.settingurl}/forget`, {
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
          localStorage.token = json.token;
          location.href = '/';
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sign-up{
    margin-top: 20px;
  }
  a {
    color: #42b983;
  }
</style>

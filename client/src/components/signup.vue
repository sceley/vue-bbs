<template>
  <div class="sign-up">
    <div v-if="!isnext" class="panel panel-default">
      <div class="panel-heading">
        <a href="/">首页</a>
        <span>/</span>
        <span>注册</span>
      </div>
      <div class="bg-info">
        {{ validatestatement }}
      </div>
      <div class="panel-body">
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">用户名</div>
            <input v-model="userName" class="form-control" type="text">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">邮箱</div>
            <input v-model='email' class="form-control" type="email">
          </div>
        </div>
        <div class="form-group">
          <div class="input-group">
            <div class="input-group-addon">密码</div>
            <input v-model="password" class="form-control" type="password">
          </div>
        </div>
      </div>
      <div class="panel-footer clearfix">
        <button @click="validate" class="btn btn-primary pull-right">
          下一步
        </button>
      </div>
    </div>

    <div v-if="isnext" class="panel panel-default">
      <div class="panel-heading panel-custom">
        <a href="/">首页</a>
        <span>/</span>
        <span>邮箱验证码</span>
      </div>
      <div class="panel-body">
        <div class="bg-info">
          {{ correctstatement }}
        </div>
        <p class="bg-info">已发送校验码到邮箱:{{ email }}</p>
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
        <button @click="signup" class="btn btn-primary pull-right">
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
        validatestatement: '',
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
      validate () {
        if(!this.userName.trim()){
          this.validatestatement = "用户名不能为空";
          return 0;
        }
        if(!this.pattern.test(this.email)){
          this.validatestatement = "请输入合法的邮箱";
          return 0;
        }
        if(!this.password.trim()){
          this.validatestatement = "密码不能为空";
          return 0;
        }
        let data = {
            userName: this.userName
        };
        fetch(`${this.settingurl}/existuser`, {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => {
            if(res.ok){
              return res.json();
            }
        }).then(json => {
          console.log(json);
          if(json._status){
            this.isnext = true;
            this.verify();
          }
          else{
            this.validatestatement = json.statement;
          }
        });
      },
      verify () {
        this.time = 60;
        let time = setInterval(() => {
          this.time--;
          if(this.time == 0){
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
      signup () {
        if(!(parseInt(this.imagVerifyCode) == this.verifyCode)){
          return this.correctstatement = '请输入正确的验证码';
        }
        let data = {
          email: this.email,
          password: this.password,
          userName: this.userName
        };
        fetch(`${this.settingurl}/signup`, {
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

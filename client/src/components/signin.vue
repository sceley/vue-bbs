<template>
  <div class="sign-up">
    <div class="panel panel-default">
      <div class="panel-heading">
          <a href="/">首页</a>
          <span>/</span>
          <span>登陆</span>
      </div>
      <div class="panel-body">
        <p v-if="statement" class="bg-infor">{{ statement }}</p>
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
  import config from '../../config/config';
  export default {
    data () {
      return {
        userName: '',
        password: '',
        statement: '',
        settingurl: ''
      }
    },
    created () { 
      this.settingurl = config.settingurl;
    },
    methods: {
      signin () {
        let data = {
          userName: this.userName,
          password: this.password
        }
        fetch(`${this.settingurl}/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          },
          body: JSON.stringify(data)
        }).then(res => {
          return res.json();
        }).then(json => {
          if(json._status){
            localStorage.token = json.token;
            location.href="/";
          }
          else{
            this.statement = json.statement;
          }
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
  .forget-password{
    text-align: center;
  }
  a {
    color: #42b983;
  }
</style>

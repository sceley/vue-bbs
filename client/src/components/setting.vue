<template>
  <div class="sign-up">
    <div class="panel panel-default">
      <div class="panel-heading">
        <a href="/">首页</a>
        <span>/</span>
        <span>设置</span>
      </div>
      <div class="panel-body">
        <form action="">
          <div class="pull-center">我的头像</div>
          <div class="gravatar-wrap">
            <img class="gravatar" v-bind:src="settingurl + '/' + gravatar">
          </div>
          <div class="upfile">
            <label class="btn btn-primary">
              <input @change="changeimage" class="choose" id="imag-img" type="file">
              Upload new picture
            </label>
          </div>
          <div class="form-group">
            <p class="bg-info">{{ userstatement }}</p>
            <label for="">用户名</label>
            <input v-model="userName" type="text" class="form-control" placeholder="用户名">
          </div>
          <div class="form-group">
            <label for="">邮箱</label>
            <input v-model="email" type="email" class="form-control" placeholder="邮箱">
          </div>
          <div class="form-group">
            <label for="">个性签名</label>
            <textarea v-model="signature" class="form-control" rows="3"></textarea>
          </div>
          <div class="pull-center">
            <button @click="savesetting" type="button" class="btn btn-primary">保存设置</button>
          </div>
        </form>
      </div>
      <div class="panel-heading">
        更改密码
      </div>
      <div class="panel-body">
        <form action="">
          <div class="form-group">
            <p class="bg-info">{{ passwordstatement }}</p>
            <label for="">当前密码</label>
            <input v-model='oldPassword' type="password" class="form-control" placeholder="当前密码">
          </div>
          <div class="form-group">
            <label for="">新密码</label>
            <input v-model="newPassword" type="password" class="form-control" placeholder="新密码">
          </div>
          <div class="submit-wrap">
            <button @click="changepassword" type="button" class="btn btn-primary">更改密码</button>
          </div>
        </form>
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
        email: '',
        signature: '',
        oldPassword: '',
        newPassword: '',
        gravatar: '',
        userstatement: '',
        passwordstatement: '',
        settingurl: ''
      }
    },
    created () {
      this.settingurl = config.settingurl;
      if(!localStorage.token){
        return location.href = '/';
      }
      fetch(`${this.settingurl}/user`, {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.token
        }
      }).then(res => {
        if(res.ok){
          return res.json();
        }
      }).then(json => {
        this.signature = json.signature;
        this.email = json.email;
        this.userName = json.userName;
        this.gravatar = json.gravatar;
      });
    },
    methods: {
      savesetting () {
        if(!localStorage.token){
          return location.href = '/';
        }
        let data = {
          userName: this.userName,
          email: this.email,
          signature: this.signature
        };
        fetch(`${this.settingurl}/savesetting`, {
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
          if(json._status){
            localStorage.token = json.token;
          }
          this.userstatement = json.statement;
        });
      },
      changeimage () {
        if(!localStorage.token){
          return location.href = '/';
        }
        let imagImg = document.getElementById("imag-img").files[0];
        let data = new FormData();
        data.append('image', imagImg);
        fetch(`${this.settingurl}/changeimage`, {
          method: 'POST',
          headers: {
            'x-access-token': localStorage.token
          },
          body: data
        }).then(res => {
          if(res.ok){
            location.reload();
          }
        });
      },
      changepassword () {
        if(!this.newPassword.trim()){
          return this.passwordstatement = '新密码不能为空';
        }
        if(!localStorage.token){
          return location.href = '/';
        }
        let data = {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        };
        fetch(`${this.settingurl}/changepassword`, {
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
          if(json._status){
            this.passwordstatement = json.statement;
          }
          else{
            this.passwordstatement = json.statement;
          }
          this.oldPassword = '';
          this.newPassword = '';
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

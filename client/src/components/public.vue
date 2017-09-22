<template>
  <div class="sign-up">
    <div class="panel panel-default">
      <div class="panel-heading">
        <a href="/">首页</a>
        <span>/</span>
        <span>发表话题</span>
      </div>
      <div class="panel-body">
        <p class="bg-info">{{ statement }}</p>
        <div class="form-group">
          <label for="">版块*:</label>
          <select v-model="tab" class="form-control"> 
            <option v-for="item in topic"> {{ item }}</option> 
          </select>
        </div>
        <div class="form-group">
          <label for="">标题*:</label>
          <input v-model="title" class="form-control" type="text">
        </div>
        <div class="form-group">
          <label for="">内容*:</label>
          <textarea v-model="content" class="form-control" rows="5"></textarea>
        </div>
      </div>
      <div class="panel-footer clearfix">
        <button @click="public" class="btn btn-primary pull-right">
          发表
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
        tab: '',
        title: '',
        content: '',
        statement: '',
        topic: ['技术', '娱乐', '生活', '兴趣'],
        settingurl: ''
      }
    },
    created () {
      this.settingurl = config.settingurl;
    },
    methods: {
      public () {
        if(!localStorage.token)
          return this.statement = '请先进行登陆';
        if(!this.tab){
          return this.statement = '板块不能为空';
        }
        if(!this.title.trim()){
          return this.statement = '标题不能为空';
        }
        if(!this.content.trim()){
          return this.statement = '内容不能为空';
        }
        let data = {
          tab: this.tab,
          title: this.title,
          content: this.content
        };
        fetch(`${this.settingurl}/public`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.token
          },
          body: JSON.stringify(data)
        }).then(res => {
          if(res.ok){
            location.href = '/';
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
  a {
    color: #42b983;
  }
</style>

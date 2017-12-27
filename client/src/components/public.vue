<template>
    <div class="sign-up">
        <div class="panel panel-default">
            <div class="panel-heading">
                <a href="/">首页</a>
                <span>/</span>
                <span>发表话题</span>
            </div>
            <div class="panel-body">
                <p v-if="public_status" class="bg-info">{{ public_status }}</p>
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
    import 'whatwg-fetch'
    export default {
        data () {
            return {
                tab: '',
                title: '',
                content: '',
                public_status: '',
                topic: ['技术', '娱乐', '生活', '兴趣'],
            }
        },
        methods: {
            validate () {
                if(!this.tab){
                    this.public_status = '板块不能为空';
                    return 0;
                }
                if(!this.title.trim()){
                    this.public_status = '标题不能为空';
                    return 0;
                }
                if(!this.content.trim()){
                    this.public_status = '内容不能为空';
                    return 0;
                }
                return 1;
            },
            public () {
                if (!this.validate()) {
                    return 0;
                }
                let data = {
                    tab: this.tab,
                    title: this.title,
                    content: this.content
                };
                fetch(`${config.server}/topic/public`, {
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
                    if(!json.errorcode) {
                        location.href = '/';
                    } else　if(json.errorcode == 333) {
                        localStorage.token = '';
                        location.href = '/user/signin';
                    } else {
                        this.public_status = json.msg;
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
    a {
        color: #42b983;
    }
</style>
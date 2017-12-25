<template>
    <div class="topic">
        <div class="panel panel-default">
            <div class="panel-heading heading">
                <h3>{{ topic.title }}</h3>
                <p>
                    <span class="decription">发布于&nbsp;{{ topic.create_at }}</span>
                    <span class="decription">作者&nbsp;{{ topic.userName }}</span>
                    <span class="decription">{{ topic.pv }}&nbsp;浏览</span>
                </p>
            </div>
            <div class="panel-body" v-html="topic.content">
            </div>
            <div class="panel-heading">
                回复
            </div>
            <div class="panel-body">
                <div v-for="item in comment">
                    <comment v-bind:message="item">

                    </comment>
                </div>

            </div>
            <div class="panel-heading">
                添加回复
            </div>
            <div v-if='login' class="bg-danger">
                请先进行登陆
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <textarea v-model="content" class="form-control" rows="5"></textarea>
                </div>
                <button @click="sendcomment" class="btn btn-primary">回复</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Comment from './comment';
    import computedTime from '../assets/computedTime';
    import config from '../../config/config';
    import fetch from 'whatwg-fetch'
    export default {
        data () {
            return {
                topic: '',
                content: '',
                comment: '',
                login: false,
                settingurl: ''
            }
        },
        components: {
            Comment
        },
        methods: {
            signout () {
                localStorage.token = '';
                location.href="/";
            },
            sendcomment () {
                if(!localStorage.token){
                    return this.login = true;
                }
                let data = {
                    topic: this.topic._id,
                    content: this.content
                };
                fetch(`${this.settingurl}/comment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': localStorage.token
                    },
                    body: JSON.stringify(data)
                }).then(res => {
                    if(res.ok){
                        location.reload();
                    }
                });
            }
        },
        created () {
            this.settingurl = config.settingurl;
            fetch(`${this.settingurl}${location.pathname}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                json.topic.create_at = computedTime(json.topic.create_at);
                this.topic = json.topic;
                this.comment = json.comment;
                this.topic.userName = this.topic.user.userName;
            });
        }
    }
</script>

<style scoped>
    .decription:before{
        content: '•';
        padding-right: 4px;
    }
    .decription{
        padding: 0 4px;
    }
</style>

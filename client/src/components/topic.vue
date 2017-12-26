<template>
    <div class="topic">
        <div class="panel panel-default">
            <div class="panel-heading heading">
                <h3>{{ topic.title }}</h3>
                <p>
                    <span class="decription">发布于&nbsp;{{ topic.create_at }}</span>
                    <span class="decription">
                        作者&nbsp;{{author}}
                    </span>
                    <span class="decription">{{ topic.pv }}&nbsp;浏览</span>
                </p>
            </div>
            <div class="panel-body" v-html="topic.content">
            </div>
            <div class="panel-heading">
                回复
            </div>
            <div class="panel-body">
                <div class="comment-ceil" v-for="item in comments">
                    <div class="row">
                        <div class="col-xs-4">
                            <img class="img-thumbnail" v-bind:src="item.author_id.gravatar">
                        </div>
                        <div class="col-xs-8">
                            {{ item.author_id.userName }}
                        </div>
                    </div>
                    <div style="margin-top:5px;" class="content">
                        <a v-if="item.replyer_id" :href="'/user'+item.replyer_id.userName">
                            @{{ item.replyer_id.userName }}
                        </a>
                        {{ item.content }}
                    </div>
                    <Reply :topic_id="topic._id"/>
                </div>
            </div>
            <div class="panel-heading">
                添加评论
            </div>
            <div class="panel-body">
                <div class="form-group">
                    <textarea v-model="comment_content" class="form-control" rows="5"></textarea>
                </div>
                <button @click="do_comment" class="btn btn-primary">评论</button>
            </div>
        </div>
    </div>
</template>

<script>
    import computedTime from '../assets/computedTime';
    import config from '../../config/config';
    import Reply from './reply';
    import 'whatwg-fetch'
    export default {
        data () {
            return {
                topic: '',
                author: '',
                comment_content: '',
                comments: [],
                show: false
            }
        },
        components: {
            Reply: Reply
        },
        methods: {
            do_comment () {
                let pattern = /^@(\w+)\s{1}/;
                let replyer;
                let content = this.comment_content;
                content.replace(pattern, (match, code) => {
                    replyer = code;
                });
                content = content.replace(pattern, '');
                let data = {
                    topic_id: this.topic._id,
                    content,
                    replyer
                };
                fetch(`${config.server}/topic/comment`, {
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
                    console.log(json);
                });
            },
            showModel () {
                this.show = !this.show;
            }
        },
        created () {
            fetch(`${config.server}${location.pathname}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                if (!json.errorcode) {
                    json.topic.create_at = computedTime(json.topic.create_at);
                    this.topic = json.topic;
                    this.comments = json.comment;
                    this.author = json.topic.author_id.userName;
                }
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
    .comment-ceil {
        border: 2px solid #e7e7e7;
        border-radius: 4px;
        margin-top: 10px;
        padding: 5px;
    }
</style>

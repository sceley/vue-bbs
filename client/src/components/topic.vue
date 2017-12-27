<template>
    <div class="topic-container">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="break-word">{{ topic.title }}</h3>
                <p>
                    <span class="decription">
                        发布于&nbsp;{{ topic.create_at }}
                    </span>
                    <span class="decription">
                        作者&nbsp;{{author}}
                    </span>
                    <span class="decription">
                        {{ topic.pv }}&nbsp;浏览
                    </span>
                </p>
            </div>
            <div class="break-word panel-body">
                {{ topic.content }}
            </div>
            <div class="panel-heading">
                回复
            </div>
            <div class="panel-body">
                <div v-for="item in comments" class="media comment-ceil">
                    <div class="media-left">
                        <a :href="'/user/'+item.author_id.userName">
                            <img class="img-thumbnail img-size media-object" :src="item.author_id.gravatar" alt="...">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4>{{ item.author_id.userName }}</h4>
                    </div>
                    <div>
                        <h4>
                            <a v-if="item.replyer_id" :href="'/user/'+item.replyer_id.userName">
                                @{{ item.replyer_id.userName }}
                            </a>
                            {{ item.content }}
                        </h4>
                    </div>
                    <Reply :replyer="item.author_id.userName" :topic_id="topic._id"/>
                </div>
            </div>
            <div class="panel-heading">
                添加评论
            </div>
            <p v-if="topic_status" class="bg-info">{{ topic_status }}</p>
            <div class="pull-center panel-body">
                <div class="form-group">
                    <textarea v-model="content" class="form-control" rows="5"></textarea>
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
                content: '',
                comments: [],
                show: false,
                topic_status: ''
            }
        },
        components: {
            Reply: Reply
        },
        methods: {
            do_comment () {
                let pattern = /^@((\w+|[\u4e00-\u9fa5]+))\s{1}/;
                let replyer;
                let content = this.content;
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
                    if (!json.errorcode) {
                        location.reload();
                    } else if (json.errorcode == 333) {
                        localStorage.token = '';
                        this.topic_status = '请先进行登录';
                    } else {
                        this.topic_status = json.msg;
                    }
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
        padding-right: 2px;
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
    .img-size {
        width: 64px;
        height: 64px;
    }
    .break-word {
        word-wrap: break-word;
    }
</style>

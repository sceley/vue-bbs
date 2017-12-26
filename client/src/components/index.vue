<template>
    <div class="topic">
        <div class="panel panel-default">
            <div class="panel-heading heading">
                <ul class="nav nav-pills">
                    <li>
                        <a v-bind:class="{tab: tab=='all'}" href="/?tab=all">全部</a>
                    </li>
                    <li>
                        <a v-bind:class="{tab: tab=='technology'}" href="/?tab=technology">技术</a>
                    </li>
                    <li>
                        <a v-bind:class="{tab: tab=='entertainment'}" href="/?tab=entertainment">娱乐</a>
                    </li>
                    <li>
                        <a v-bind:class="{tab: tab=='life'}" href="/?tab=life">生活</a>
                    </li>
                    <li>
                        <a v-bind:class="{tab: tab=='interest'}" href="/?tab=interest">兴趣</a>
                    </li>
                </ul>
            </div>
            <div class="panel-body">
                <p class="bg-info">{{ topic_status }}</p>
                <ul class="nav nav-pills nav-stacked">
                    <li v-for="item in topic">
                        <div class="row">
                            <div class="col-xs-3 col-custom">
                                <a v-bind:href="'/user/' + item.author_id.userName">
                                    <img class="img-thumbnail" v-bind:src="item.author_id.gravatar">
                                </a>
                            </div>
                            <div class="col-xs-2 col-custom">
                                <span class="topic-tab">{{ item.tab }}</span>
                            </div>
                            <div class="col-xs-7 col-custom">
                                <a v-bind:href="'/topic/' + item._id">
                                    <div class="topic-title">
                                        {{ item.title }}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
 
            <div class="panel-footer footer">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li v-if="page > 1">
                            <a v-bind:href="'?tab='+tab+'&page='+(page - 1)">
                                <span>&laquo;</span>
                            </a>
                        </li>
                        <li v-for="item in pageselect">
                            <a v-bind:class="{page: page == item}" v-bind:href="'?tab='+tab+'&page='+item">{{ item }}</a>
                        </li>
                        <li v-if="page < pages">
                            <a v-bind:href="'?tab='+tab+'&page='+(page + 1)">
                                <span>&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
    import computedTime from '../assets/computedTime';
    import computedQuery from '../assets/computedQuery';
    import config from '../../config/config';
    import 'whatwg-fetch';
    export default {
        data () {
            return {
                topic: '',
                pages: '',
                page: '',
                pageselect: '',
                tab: '',
                topic_status: ''
            }
        },
        methods: {
            signout () {
                localStorage.token = '';
                location.href="/";
            },
            pagination () {
                this.pageselect = [this.page - 2, this.page - 1, this.page, 
                this.page + 1, this.page + 2];

                this.pageselect = this.pageselect.filter(item => {
                    return (item >= 1 && item <= this.pages);
                });
            }
        },
        created () {
            let query = computedQuery(location.search);
            this.tab = query.tab || 'all';
            this.page = parseInt(query.page) || 1;

            fetch(`${config.server}/topiccount/?tab=${this.tab}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                if (!json.errorcode){
                    this.pages = Math.ceil(json.count / 10);
                    this.pagination();
                } else {
                    this.topic_status = json.msg;
                }
            });

            fetch(`${config.server}/topics${location.search}`)
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            }).then(json => {
                if (!json.errorcode) {
                    this.topic = json.topic;
                } else {
                    this.topic_status = json.msg;
                }
            });
        }
    }
</script>

<style scoped>
    ul, li{
        padding: 0;
        margin: 0;
    }
    .heading, .footer {
        text-align: center;
    }
    .nav li a{
        padding-top: 0;
        padding-bottom: 0;
    }
    .tab, .page, .topic-tab{
        background: #80BD01;
        border-radius: 4px;
        color: white;
    }
    .topic-tab{
        padding: 4px 6px;
    }
    .col-custom{
        padding: 5px;
    }
    .topic-title{
        width: 100%;
        overflow: hidden;
    }
    .img-size {
        width: 64px;
        height: 64px;
    }
</style>
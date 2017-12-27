<template>
    <div class="index">
        <div class="panel panel-default">
            <div class="panel-heading">
                <ul class="index-nav">
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='all'}" href="/?tab=all">
                            全部
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='technology'}" href="/?tab=technology">
                            技术
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='entertainment'}" href="/?tab=entertainment">
                            娱乐
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='life'}" href="/?tab=life">
                            生活
                        </a>
                    </li>
                    <li class="index-nav-item">
                        <a :class="{tab: tab=='interest'}" href="/?tab=interest">
                            兴趣
                        </a>
                    </li>
                </ul>
            </div>
            <div class="panel-body">
                <p class="bg-info">{{ topic_status }}</p>
                <div class="media topic-border-style" v-for="item in topic">
                    <div class="media-left">
                        <a :href="'/user/' + item.author_id.userName">
                            <img class="img-size media-object" :src="item.author_id.gravatar" alt="...">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">
                            <a class="break-word" :href="'/topic/' + item._id">{{ item.title }}</a>
                        </h4>
                    </div>
                </div>
            </div>
            <div class="panel-footer footer">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li v-if="page > 1">
                            <a :href="'?tab='+tab+'&page='+(page - 1)">
                                <span>&laquo;</span>
                            </a>
                        </li>
                        <li v-for="item in pageselect">
                            <a :class="{tab: page == item}" :href="'?tab='+tab+'&page='+item">
                                {{ item }}
                            </a>
                        </li>
                        <li v-if="page < pages">
                            <a :href="'?tab='+tab+'&page='+(page + 1)">
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
                    this.pages = Math.ceil(json.count / 5);
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
    .index-nav {
        text-align: center;
    }
    .index-nav-item {
        display: inline-block;
        margin: 5px 0;
    }
    .index-nav-item a {
        padding: 5px 10px;
    }
    .tab {
        background: #80BD01;
        border-radius: 4px;
        color: white;
    }
    .footer {
        text-align: center;
    }
    .img-size {
        width: 64px;
        height: 64px;
    }
    .topic-border-style {
        border: 2px solid #e7e7e7;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
    }
</style>
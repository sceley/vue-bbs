<template>
	<div class="user-container">
		<div class="panel panel-default">
			<div class="panel-heading">
				<a href="/">首页</a>
				<span>/</span>
				<span>用户</span>
			</div>
			<div class="panel-body">
				<p class="bg-info">{{  }}</p>
				<div class="pull-center">头像</div>
				<div>
					<img class="gravatar" v-bind:src="user.gravatar">
				</div>
				<div class="form-group">
					<label>用户名</label>
					<div>{{ user.userName }}</div>
				</div>
				<div class="form-group">
					<label>邮箱</label>
					<div>{{ user.email }}</div>
				</div>
				<div class="form-group">
					<label>个性签名</label>
					<div>{{ user.signature }}</div>
				</div>
			</div>
			<div class="panel-heading">
				话题:
			</div>
			<div class="panel-body">
				<ul class="list-group">
					<li v-for="item in topic" class="list-group-item">
						<span class="tab">
							{{ item.tab }}
						</span>
						<a :href="'/topic/' + item._id">
							{{ item.title }}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import config from '../../config/config'
	import 'whatwg-fetch'
	export default {
		data () {
			return {
				user: '',
				topic: '',
				user_status: ''
			}
		},
		created () {
			fetch(`${config.server}${location.pathname}`)			
			.then(res => {
				if(res.ok){
					return res.json();
				}
			})
			.then(json => {
				if (!json.errocode) {
					this.user = json.user;
					this.topic = json.topic;
				} else {
					this.user_status = json.msg;
				}
			});
		}
	}
</script>
<style scoped>
	.gravatar {
		display: block;
		width: 100px;
		margin: 0 auto;
		margin-top: 10px;
	}
	.tab {
		background: #80BD01;
		padding: 5px 10px;
		border-radius: 5px;
	}
</style>
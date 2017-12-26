<template>
	<div class="user">
		<div class="panel panel-default panel-custom">
			<div class="panel-heading panel-custom">
				<a href="/">首页</a>
				<span>/</span>
				<span>用户</span>
			</div>
			<div class="panel-body panel-custom">
				<p class="bg-info">{{  }}</p>
				<div class="pull-center">头像</div>
				<div class="gravatar-wrap">
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
				<div v-for="item in topic" class="topic-cell">
					<div class="row">
						<div class="tab col-xs-3">
							{{ item.tab }}
						</div>
						<div class="col-xs-9">
							<a v-bind:href="'/topic/' + item._id">
								{{ item.title }}
							</a>
						</div>
					</div>
				</div>
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
	.user {
		margin-top: 20px;
	}
	.pull-center {
		text-align: center;
	}
	.gravatar {
		display: block;
		width: 100px;
		margin: 0 auto;
		margin-top: 10px;
	}
	.topic-cell {
		border-bottom: 1px solid #ddd;
		padding: 5px 0;
	}
	.tab {
		background: #80BD01;
		border-radius: 10px;
		text-align: center;
	}
</style>
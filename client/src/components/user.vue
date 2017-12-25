<template>
	<div class="user">
		<div class="panel panel-default panel-custom">
			<div class="panel-heading panel-custom">
				<a href="/">首页</a>
				<span>/</span>
				<span>用户</span>
			</div>
			<div class="panel-body panel-custom">
				<div class="pull-center">头像</div>
				<div class="gravatar-wrap">
					<img class="gravatar" v-bind:src="userInfo.gravatar">
				</div>
				<div class="form-group">
					<label>用户名</label>
					<div>{{ userInfo.userName }}</div>
				</div>
				<div class="form-group">
					<label>邮箱</label>
					<div>{{ userInfo.email }}</div>
				</div>
				<div class="form-group">
					<label>个性签名</label>
					<div>{{ userInfo.signature }}</div>
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
				userInfo: '',
				topic: ''
			}
		},
		created () {
			//userInfo
			// fetch(`${config.server}/user/${location.pathname}`)
			fetch(`http://yapi.demo.qunar.com/mock/2781/club/user/sceley`)			
			.then(res => {
				if(res.ok){
					return res.json();
				}
			})
			.then(json => {
				if (!json.errocode) {
					this.userInfo = json.userInfo;
				} else if(json.errocode == 500) {
					console.log(json.msg);
				}
			});

			//user-topic
			fetch(`http://yapi.demo.qunar.com/mock/2781/club/user/sceley`)			
			.then(res => {
				if(res.ok){
					return res.json();
				}
			})
			.then(json => {
				if (!json.errocode) {
					this.userInfo = json.userInfo;
					this.topic = json.topic;
				} else if(json.errocode == 500) {
					console.log(json.msg);
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
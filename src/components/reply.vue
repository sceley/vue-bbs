<template>
	<div class="comment">
		<div>
			<p class="bg-info">{{ statement }}</p>
		</div>
		<div class="row">
			<div class="col-xs-3">
				<img v-bind:src="settingurl + '/' + message.from.gravatar" alt="">
			</div>
			<div class="col-xs-7">
				{{ message.from.userName }}
			</div>
			<div class="col-xs-2">
				<span @click="showModel" class="glyphicon glyphicon-edit"></span>
			</div>
		</div>
		<div class="content">
			<a class="username" v-bind:href="'/user/' + message.to._id">@{{ message.to.userName }}</a>
			<span>{{ message.content }}</span>
		</div>
		<div v-if="show">
			<div class="form-group">
				<textarea v-model="content" class="form-control" rows="5"></textarea>
			</div>
			<button @click="reply" class="btn btn-primary">回复</button>
		</div>
	</div>
</template>
<script>
	import config from '../../config/config';
	export default {
		data () {
			return {
				show: false,
				content: '',
				settingurl: '',
				statement: ''
			}
		},
		props: ['message', 'id'],
		methods: {
			showModel () {
				if(this.show){
					this.show = false;
				}
				else{
					this.show = true;
				}
			},
			reply () {
				if(!localStorage.token){
					return this.statement = '请先进行登陆';
				}
				let data = {
					content: this.content,
					to: this.message.from._id
				};
				fetch(`${this.settingurl}/reply/${this.id}`, {
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
		}
	}
</script>
<style scoped>
	.content {
		margin-top: 15px;
	}
	.username{
		padding: 0 4px;
		text-decoration: underline;
	}
</style>
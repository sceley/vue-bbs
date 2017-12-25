<template>
	<div>
		<div class="comment">
			<p class="bg-info">{{ statement }}</p>
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
				{{ message.content }}
			</div>
			<div v-if="show">
				<div class="form-group">
					<textarea v-model="content" class="form-control" rows="5"></textarea>
				</div>
				<button @click="reply" class="btn btn-primary">回复</button>
			</div>
		</div>
		<div class="reply" v-for="item in message.reply">
			<reply v-bind:message="item" v-bind:id="message._id"></reply>
		</div>
	</div>
</template>
<script>
	import Reply from './reply'
	import config from '../../config/config'
	import fetch from 'whatwg-fetch'
	export default {
		data () {
			return {
				content: '',
				statement: '',
				settingurl: '',
				show: false
			}
		},
		props: ['message'],
		components: {
			Reply
		},
		created () {
			this.settingurl = config.settingurl;
		},
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
				let id = this.message._id;
				let data = {
					content: this.content,
					to: this.message.from._id
				};
				fetch(`${this.settingurl}/reply/${id}`, {
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
		}
	}
</script>
<style scoped>
	.content{
		margin-top: 15px;
	}
</style>
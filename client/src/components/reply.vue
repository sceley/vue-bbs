<template>
	<div>
		<p v-if="reply_status" class="bg-danger">
			{{ reply_status }}
		</p>
		<div class="clearfix">
			<span @click="showModel" class="btn-showModel pull-right glyphicon glyphicon-share-alt"></span>
		</div>
		<div v-if="show">
			<div class="form-group">
				<textarea v-model="content" class="form-control" rows="5"></textarea>
			</div>
			<button @click="do_comment" class="btn btn-primary">回复</button>
		</div>
	</div>
</template>

<script>
	import config from '../../config/config';
	export default {
		data () {
			return {
				show: false,
				content: '@'+this.replyer+' ',
				reply_status: ''
			}
		},
		props: ['topic_id', 'replyer'],
		methods: {
			do_comment () {
			    let pattern = /^@(\w+)\s{1}/;
			    let replyer;
			    let content = this.content;
			    content.replace(pattern, (match, code) => {
			        replyer = code;
			    });
			    content = content.replace(pattern, '');
			    let data = {
			        topic_id: this.topic_id,
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
			    		location.href = '/user/signin';
			    	} else {
			    		this.reply_status = json.msg;
			    	}
			    });
			},
			showModel () {
			    this.show = !this.show;
			}
		}
	}
</script>

<style>
	.btn-showModel {
		transform: rotate(180deg);
		font-size: 18px;
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>
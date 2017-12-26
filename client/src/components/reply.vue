<template>
	<div>
		<div class="clearfix">
			<span @click="showModel" class="pull-right glyphicon glyphicon-edit"></span>
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
				content: ''
			}
		},
		props: ['topic_id'],
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
			    	location.reload();
			        console.log(json);
			    });
			},
			showModel () {
			    this.show = !this.show;
			}
		}
	}
</script>

<style>
	
</style>
<template>
	<div class="wrap" id="app">
		<div class="nav-custom">
			<a class="brand" href="/">
				<img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
			</a>
			<ul class="menu">
				<li class="menu-list">
					<a href="/">首页</a>
				</li>
				<li v-if="signin" class="menu-list">
					<a href="/public">发表话题</a>
				</li>
				<li v-if="!signin" class="menu-list">
					<a href="/signup">注册</a>
				</li>
				<li v-if="!signin" class="menu-list">
					<a href="/signin">登陆</a>
				</li>
				<li v-if="signin" class="menu-list">
					<a @click="signout" href="javascript:;">退出</a>
				</li>
				<li v-if="signin" class="menu-list">
					<a href="/setting">设置</a>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data () {
			return {
				signin: localStorage.token,
				topic: []
			}
		},
		methods: {
			signout () {
				localStorage.token = '';
				location.href="/";
			}
		}
	}
</script>

<style>
	body{
		background: #E1E1E1;
	}
	ul, li{
		list-style-type: none;
		padding: 0;
	}
	li{
		float: left;
	}
	.wrap{
		padding: 5px;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	.nav-custom{
		background: #444444;
		padding-top: 10px;
		text-align: center;
	}
	.brand{
		display: block;
		width: 120px;
		height: 28px;
		margin: 0 auto;
	}
	img{
		max-width: 100%;
		height: auto;
	}
	.menu{
		padding: 0;
		display: inline-block;
		overflow: hidden;
		margin-top: 10px;
	}
	.menu-list a{
		padding: 0 15px;
	}
	.topic{
		margin-top: 20px;
	}
	.comment{
		padding: 20px 0;
		border-bottom: 1px solid #DDD;
	}
</style>

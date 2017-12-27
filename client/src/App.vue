<template>
	<div id="app">
		<div class="nav-container">
			<a class="brand" href="/">
				<img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
			</a>
			<ul class="app-nav">
				<li class="app-nav-item">
					<a href="/">首页</a>
				</li>
				<li v-if="signin" class="app-nav-item">
					<a href="/topic/public">发表话题</a>
				</li>
				<li v-if="!signin" class="app-nav-item">
					<a href="/user/signup">注册</a>
				</li>
				<li v-if="!signin" class="app-nav-item">
					<a href="/user/signin">登陆</a>
				</li>
				<li v-if="signin" class="app-nav-item">
					<a @click="signout" href="javascript:;">退出</a>
				</li>
				<li v-if="signin" class="app-nav-item">
					<a href="/user/setting">设置</a>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				signin: localStorage.token
			}
		},
		methods: {
			signout () {
				localStorage.token = '';
				location.href = "/";
			}
		}
	}
</script>

<style>
	body{
		background: #E1E1E1;
		font-size: 16px;
	}
	ul, li{
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
	}
	.nav-container{
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
	.app-nav {
		display: inline-block;
		margin-top: 10px;
	}
	.app-nav-item {
		margin: 5px 0;
		padding: 0 15px;
		float: left;
	}
</style>

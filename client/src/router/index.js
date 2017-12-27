import Vue from 'vue'
import Router from 'vue-router'
import Signup from '@/components/signup'
import Signin from '@/components/signin'
import seek_password from '@/components/seek-password'
import Setting from '@/components/setting'
import Public from '@/components/public'
import Index from '@/components/index'
import Topic from '@/components/topic'
import User from '@/components/user'
import NotFoundComponent from '@/components/NotFoundComponent'

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/user/signup',
			name: 'Signup',
			component: Signup
		},
		{
			path: '/user/signin',
			name: 'Signin',
			component: Signin
		},
		{
			path: '/user/seek-password',
			name: 'seek_password',
			component: seek_password
		},
		{
			path: '/user/setting',
			name: 'Setting',
			component: Setting
		},
		{
			path: '/topic/public',
			name: 'Public',
			component: Public
		},
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/topic/:id',
			name: 'Topic',
			component: Topic
		},
		{
			path: '/user/:username',
			name: 'User',
			component: User
		},
		{
			path: '*',
			component: NotFoundComponent
		}
	]
});
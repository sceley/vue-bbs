const express = require('express');
const multer = require('multer');
const router = express.Router();
const body_parser = require('body-parser');

//sign
const signup = require('./controllers/sign/signup');
const signin = require('./controllers/sign/signin');

//middle
const authjwt = require('./middleware/authjwt');

//user
const change_userinfo = require('./controllers/user/change-userinfo');
const change_password = require('./controllers/user/change-password');
const change_image  = require('./controllers/user/change-image');
const user = require('./controllers/user/user');
const setting = require('./controllers/user/setting');
const seek_password = require('./controllers/user/seek-password');

//topic
const comment = require('./controllers/topic/comment');
const get_topic = require('./controllers/topic/get-topic');
const get_topics = require('./controllers/topic/get-topics');
const get_topiccount = require('./controllers/topic/get-topiccount');
const topic_public = require('./controllers/topic/topic-public');

const verify = require('./controllers/verify');
const seek_verifyCode = require('./controllers/seek-verifyCode');

router.post('/user/signup', body_parser.json(), signup);
router.post('/user/signin', body_parser.json(), signin);
router.post('/user/change-userinfo', body_parser.json(), authjwt, change_userinfo);
router.post('/user/change-image', multer().array('image'), authjwt, change_image);
router.post('/user/change-password', authjwt, change_password);
router.post('/user/seek-password', body_parser.json(), seek_password);
router.get('/user/setting', authjwt, setting);
router.get('/user/:userName', user);

router.post('/topic/public', body_parser.json(), authjwt, topic_public);
router.post('/topic/comment', body_parser.json(), authjwt, comment);
router.get('/topic/:id', get_topic);
router.get('/topics', get_topics);
router.get('/topiccount', get_topiccount);


router.post('/getVerifyCode', body_parser.json(), verify);
router.post('/seek/getVerifyCode', body_parser.json(), seek_verifyCode);

module.exports = router;
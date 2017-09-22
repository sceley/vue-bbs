export default (url) => {
	let query = url.slice(1);
	let value = query.split('&');
	let obj = {};
	for(let i = 0; i < value.length; i++){
	  let pair = value[i].split('=');
	  obj[pair[0]] = pair[1];
	}
	return obj;
};
export default (time) => {
	let date = new Date(time);
	let createYear = date.getFullYear();
	let currentYear = (new Date()).getFullYear();
	let createMonth = date.getMonth();
	let currentMonth = (new Date()).getMonth();
	let createDay = date.getDate();
	let currentDay = (new Date()).getDate();
	let createHours = date.getHours();
	let currentHours = (new Date()).getHours();
	let createMinutes = date.getMinutes();
	let currentMinutes = (new Date()).getMinutes();
	if(currentYear > createYear){
		if(currentYear - createYear >= 2){
			if(currentMonth > createMonth){
				return currentYear - createYear + '年前';
			}
			else{
				return currentYear - createYear - 1 + '年前';
			}
		}
		else{
			if(currentMonth > createMonth) {
				return currentYear - createYear + '年前';		
			}
			else{
				return currentMonth + 12 - createMonth + '月前';
			}			
		}
	  
	}
	else if(currentMonth > createMonth){
		if(currentMonth - createMonth >= 2){
			if(currentDay > createDay){
				return currentMonth - createMonth + '月前';
			}
			else{
				return currentMonth - createMonth - 1 + '月前';
			}
		}
		else{
			if(currentDay > createDay) {
				return currentMonth - createMonth + '月前';		
			}
			else{
				return currentDay + 30 - createDay + '日前';
			}			
		}
	}
	else if(currentDay > createDay){
		if(currentDay - createDay >= 2){
			if(currentHours > createHours){
				return currentDay - createDay + '日前';
			}
			else{
				return currentDay - createDay - 1 + '日前';
			}
		}
		else{		
			if(currentHours > createHours){
				return currentDay - createDay + '日前';
			}
			else{
				return currentHours + 24 - createHours + '小时前';
			}
		}
	}
	else if(currentHours > createHours){
		if(currentHours - createHours >= 2){
			if(currentMinutes > createMinutes){
				return currentHours - createHours + '小时前';						
			}
			else{
				return currentHours - createHours - 1 + '小时前';		
			}
		}
		else{
			if(currentMinutes > createMinutes){
				return currentHours - createHours + '小时前';		
			}
			else{
				return currentMinutes + 60 - createMinutes + '分前';
			}			
		}
	}
	else if(currentMinutes > createMinutes){
	  return currentMinutes - createMinutes + '分前';
	}
	else{
	  return '刚刚';
	}
}
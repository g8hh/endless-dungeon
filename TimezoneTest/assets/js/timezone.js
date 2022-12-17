(function($) {
  "use strict";
  var nextActiveDate;
  var timezoneDiff;
  var offset;
  
  var offlineTimeFormat = function(offlineSecond){
	let offlineHour = Math.floor(offlineSecond / 3600);
	let offlineMinute = Math.floor((offlineSecond - (offlineHour * 3600)) / 60);
	let offlineSec = Math.floor(offlineSecond - (offlineHour * 3600) - (offlineMinute * 60));
	if(offlineHour < 10) offlineHour = "0"+offlineHour;
	if(offlineMinute < 10) offlineMinute = "0"+offlineMinute;
	if(offlineSec < 10) offlineSec = "0"+offlineSec;
	return offlineHour+":"+offlineMinute+":"+offlineSec;
  };
  
  var getCurrentTimestamp = function(){
	let date = new Date();
	
	let currentDatetime = date.getTime();
	if(timezoneDiff != undefined) currentDatetime += timezoneDiff;
	
	return currentDatetime;
  };
  
  var restDailyResetTimer = function(){
	let currentTime = getCurrentTimestamp();
	return (nextActiveDate-currentTime)/1000;
  };
  
  var initData = function(){
	$("#container").empty();
	let date = new Date();
	offset = date.getTimezoneOffset();
	console.log(offset*60);
	
	//let date2 = date + (offset * 60000);
	
	let localDatetime = new Date(1671321600000);
	//let serverDatetime = new Date(2022,11,15,0,0,0);
	let serverDatetime = new Date(1671321600000);
	let date2 = new Date();
	let serverDt = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate(), date2.getUTCHours(), date2.getUTCMinutes(), date2.getUTCSeconds()));
	let nexServerDt = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate()+1));
	nextActiveDate = nexServerDt.getTime();
	let localDate = "Local Time&nbsp;&nbsp;&nbsp;: "+date.getTime()+" - "+date;
	let serverDate = "Server Time&nbsp;&nbsp;: "+serverDt.getTime()+" - "+date.toUTCString();
	let nextServerDate = "Next Server Reset : "+nexServerDt.getTime()+" - "+nexServerDt.toUTCString();
	let restResetTimerString = restDailyResetTimer();

	let string = "Test Local&nbsp;&nbsp;:"+localDatetime.getTime()+" - "+localDatetime+"<br/>";
	//string += "Test Server :"+(localDatetime.getTime()+(offset*60000))+" - "+localDatetime.toUTCString()+"<br/>";
	string += "Test Server :"+serverDatetime.getTime()+" - "+serverDatetime.toUTCString()+"<br/>";
	string += localDate+"<br/>";
	string += serverDate+"<br/>";
	string += nextServerDate+"<br/>";
	string += "Reset In : "+offlineTimeFormat(restResetTimerString);

	$("#container").html(string);
  };
  
  var setActiveDate = function(){
	let date = new Date(getCurrentTimestamp());
	let date2 = new Date();
	let serverDt = new Date(Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate(), date2.getUTCHours(), date2.getUTCMinutes(), date2.getUTCSeconds()));
	let localNextActiveDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()+1).getTime() - (offset * 60000);
	nextActiveDate = new Date(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate());
	if(timezoneDiff != undefined) nextActiveDate -= timezoneDiff;
	let restResetTimerString = restDailyResetTimer();
	
	$("#container").append("<br/>Next Local Reset Time : "+new Date(localNextActiveDate)+"<br/>Next Server Reset Time : "+new Date(nextActiveDate).toUTCString()+"<br/>Reset In : "+offlineTimeFormat(restResetTimerString)+"<br/>Offset : "+(offset/60)+" Hour(s)");
  };
  
  initData();
  //setActiveDate();
  
})(jQuery);
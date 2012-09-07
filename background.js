

chrome.extension.getVersion = function() { 
  if (!chrome.extension.version_) { 
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", chrome.extension.getURL('manifest.json'), false); 
    xhr.onreadystatechange = function() { 
      if (this.readyState == 4) { 
        var manifest = JSON.parse(this.responseText); 
        chrome.extension.version_ = manifest.version; 
      } 
   }; 
   xhr.send(); 
 } 
 return chrome.extension.version_; 
}


document.addEventListener('DOMContentLoaded',  function(e) {
	var old_ver = ( localStorage["version"] || "" ).split(".");
	var new_ver = (chrome.extension.getVersion() + "").split(".");
	
	badge((localStorage["nowpage"] || "1"));	

	
	if(old_ver[0]+'.'+old_ver[1]+'.'+old_ver[2] != new_ver[0]+'.'+new_ver[1]+'.'+new_ver[2]){
	
		if((localStorage["notepad"+"1"] || "") == ""){
			localStorage["notepad"+"1"] = localStorage["notepad"];
		}
		
		chrome.tabs.getAllInWindow(undefined, function(tabs) {
			for (var i = 0, tab; tab = tabs[i]; i++) {
				var str = tab.url;
				if (str.match('dekuyou.ddo.jp/knowledge/')) { 
					chrome.tabs.update(tab.id, {selected: true});
					return;
				}
			}
			chrome.tabs.create({url:'http://dekuyou.ddo.jp/knowledge/?chrome/extensions'});
		});
		
		localStorage["version"] = chrome.extension.getVersion();
		
		// 255, 0, 0 red
		chrome.browserAction.setBadgeText({text:"new!"});
		chrome.browserAction.setBadgeBackgroundColor({color:[0,255,255, 255]});
		
	}
}, false);


function getSelectedText() {
	chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendRequest(tab.id, {selected:true}, function(res){
			return(res.text || "");
		});
	});

	
}

function badge(nowpage){
	chrome.browserAction.setBadgeText({text:"p"+nowpage});
	chrome.browserAction.setBadgeBackgroundColor({color:[255,0,255, 200]});


}

function twitter(nowpage){
	// http://twitter.com/statuses/update.xml
	// http://watcher.moe-nifty.com/memo/docs/twitterAPI49.txt
//	if((localStorage["twitterid"] || "") == ""){
//		chrome.tabs.create({url:'http://twitter.com/home?status='+encodeURIComponent((localStorage["notepad"+nowpage] || ""))});

		// http://twitter.com/intent/tweet?status=
		
	window.open('http://twitter.com/intent/tweet?status='+encodeURIComponent((localStorage["notepad"+nowpage] || "")), 'Twitter', 'width=600, height=250, menubar=no, toolbar=no, scrollbars=yes');
		
//	}else{
//		var xhr = new XMLHttpRequest(); 
//	
//		xhr.open('POST', 'http://twitter.com/statuses/update.xml', true, localStorage["twitterid"], localStorage["twitterpass"]);
//
//		xhr.onreadystatechange = function() { 
//			if (this.readyState == 4) { 
//				console.log(xhr.responseText);
//				if(this.status == 200){
//					chrome.extension.sendRequest({status:200});
//				}else {
//					chrome.extension.sendRequest({status:404});				
//				}
//			} 
//		}; 
//		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//		xhr.send('status='+encodeURIComponent((localStorage["notepad"+nowpage] || "")));
//	}
}

function gmail(nowpage){
	//https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&body=

//	chrome.tabs.create({url:'https://mail.google.com/mail/?view=cm&fs=1&tf=1&source=mailto&body='+encodeURI((localStorage["notepad"+nowpage] || ""))});

	var domain;
	if((localStorage["appsdomain"])){
		domain="a/"+(localStorage["appsdomain"]);
	}else{
		domain="mail";
	}
	var rnum = (localStorage["notepad"+nowpage] || "").split(/\n/g);
	var su = rnum[0];
	var url = 'https://mail.google.com/'+ domain +'/?view=cm&fs=1&tf=1&su='+encodeURIComponent(su)+'&source=mailto&body='+encodeURIComponent((localStorage["notepad"+nowpage] || ""));
	
	window.open(url, 'gmail1', 'width=600, height=400, menubar=no, toolbar=no, scrollbars=yes');
	
}


function gCalendar(nowpage){
	//https://www.google.com/calendar/b/0/render?action=TEMPLATE&text=&details=


	var domain;
	if((localStorage["appsdomain"])){
		domain="calendar/a/"+(localStorage["appsdomain"]);
	}else{
		domain="calendar";
	}
	var rnum = (localStorage["notepad"+nowpage] || "").split(/\n/g);
	var su = rnum[0];
	var url = 'https://www.google.com/'+ domain +'/render?action=TEMPLATE&text='+encodeURIComponent(su)+'&details='+encodeURIComponent((localStorage["notepad"+nowpage] || ""));
	
	window.open(url, 'Google Calendar', 'width=600, height=400, menubar=no, toolbar=no, scrollbars=yes');
	
}

	
function foo() { alert("bar"); }


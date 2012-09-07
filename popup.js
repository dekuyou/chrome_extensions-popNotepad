

var background = chrome.extension.getBackgroundPage();

var text="";

var nowpage=(localStorage["nowpage"] || "1");


window.addEventListener('load', function(e) {
	init();
	
	checkAreasize();
	
	getSelectedText();
	
	document.getElementById("byte").innerHTML = countByte((localStorage["notepad"+nowpage] || ""));

	background.badge(nowpage);

	document.getElementById("pageno").innerHTML = nowpage;

	document.getElementById("indexLink").addEventListener('click', indexLink);

	document.getElementById("prevpage").addEventListener('click', prevPage);
	document.getElementById("nextpage").addEventListener('click', nextPage);


	document.getElementById("twitter").addEventListener('click', twitter);

	document.getElementById("mail").addEventListener('click', postMail);

	document.getElementById("gmail").addEventListener('click', gmail);

	document.getElementById("gCalendar").addEventListener('click', gCalendar);

	document.getElementById("rm").addEventListener('click', remove);


	document.getElementById("doSearch").addEventListener('click', doSearch);







}, false);

function console(){
	console.log('test:' + text);
	background.foo();

}



window.addEventListener('keyup', function(e) {
	update();
	
	checkAreasize();
}, false);

window.addEventListener('keydown', function(e) {
	
	checkAreasize();
}, false);

function getSelectedText(){
	chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendRequest(tab.id, {selected:true}, function(res){
			text = (res.text || "");
			document.getElementById("rtxt").value = document.getElementById("rtxt").value +text;
			update();
			checkAreasize();
			

		});
	});
}

function init(){
	document.getElementById("rtxt").value = ( localStorage["notepad"+nowpage] || "" )+"";
}

function update(){
	localStorage["notepad"+nowpage] = document.getElementById("rtxt").value ;
	
	document.getElementById("byte").innerHTML = countByte((localStorage["notepad"+nowpage] || ""));

}

function checkAreasize(){ 
	tval = document.getElementById("rtxt").value;
	num = tval.match(/\n/g);   //
	rnum = tval.split(/\n/g);
	var retu =40;
	var gyosuu = 10;
	if(tval==""){
		return;
	}
	for(i=0;i < rnum.length;i = i +1){
		if (retu < countByte(rnum[i])){
			retu = countByte(rnum[i]);
		}
	}

	if(num!=null){
		

		
		gyosuu = num.length +2;
		if(gyosuu < 10){
			gyosuu = 10;
		}
	}
	
	document.getElementById("rtxt").cols = retu;
	document.getElementById("rtxt").rows = gyosuu;

}


function countByte(str) {
    var count = 0;
    for(var i = 0; i < str.length; i++) {
       if (escape(str.charAt(i)).length < 4) {
          count++;
       }
       else {
          count += 2;
       }
    }
    return count;
}

function nextPage(){
	update();


	if((nowpage-0) <999){
		nowpage = localStorage["nowpage"] = nowpage -0 + 1;
	}else{
		nowpage = localStorage["nowpage"] = 1;
	}
	init();
	checkAreasize();	
	document.getElementById("byte").innerHTML = countByte((localStorage["notepad"+nowpage] || ""));
	
	document.getElementById("pageno").innerHTML = nowpage;
	background.badge(nowpage);

}

function prevPage(){
	update();

	if((nowpage-0) >1){
		nowpage = localStorage["nowpage"] = nowpage -0 - 1;
	}else{
		nowpage = localStorage["nowpage"] = 999;
	}
	init();
	checkAreasize();
	document.getElementById("byte").innerHTML = countByte((localStorage["notepad"+nowpage] || ""));
	
	document.getElementById("pageno").innerHTML = nowpage;

	background.badge(nowpage);

}

function viewStatus(str1,str2){
    //
    var status = document.getElementById(str1);
    status.innerHTML = str2;
    setTimeout(function() { status.innerHTML = ""; }, 3 * 1000);


}


function twitter(){
	//loadinfo.net.gif
	document.getElementById("status").innerHTML ="<img src='./images/loadinfo.net.gif' label='updateing.'>";


	background.twitter(nowpage);


}


function doT(){
		viewStatus("status","");
		popdown('comment');
}
function cancelT(){
		viewStatus("status","cancel.");
		popdown('comment');
}


function gmail(){
//a/bsweb.office-on-the.net mail
	var domain;
	if(localStorage["appsdomain"]){
		domain="a/"+localStorage["appsdomain"];
	}else{
		domain="mail"
	}
	
	var rnum = (localStorage["notepad"+nowpage] || "").split(/\n/g);
	var su = rnum[0];
	
	var url = 'https://mail.google.com/'+ domain +'/?view=cm&fs=1&tf=1&su='+encodeURIComponent(su)+'&source=mailto&body='+encodeURIComponent((localStorage["notepad"+nowpage] || ""))

	if(countByte(url) > 2000){
		viewStatus("status","Text is too long.");
		return;
	}

	background.gmail(nowpage);
	
	
}


function gCalendar(){

	background.gCalendar(nowpage);
	
	
}

function copy(){
	viewStatus("status","Copy to ClipBoard.");

}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
        if (request.status==200){
			viewStatus("status","posted.");
		}else if(request.status==404){
			viewStatus("status","failed.");
		}
});






function popup( id) {
    var elm = document.getElementById(id);
    elm.style.display='block';
    elm.style.position='absolute';

	elm.style.left = (event.pageX -35) + "px";

    elm.style.top = (event.pageY -40) + "px";
}

function popdown(id) {
    document.getElementById(id).style.display='none';
}


function postMail(){
	document.getElementById("status").innerHTML ="<img src='./images/loadinfo.net.gif' label='updateing.'>";

	var rnum = (localStorage["notepad"+nowpage] || "").split(/\n/g);
	var su = rnum[0];
	var url = 'mailto:?subject='+encodeURIComponent(su)+'&body='+encodeURIComponent((localStorage["notepad"+nowpage] || ""));



	document.getElementById("popupBody").innerHTML ='<a href="'+url+'" target=_blank id="doT">Send</a> &nbsp; <span id="cancelT">cancel</span>';
	popup('comment');
	document.getElementById("doT").addEventListener('click', doT);
	document.getElementById("cancelT").addEventListener('click', cancelT);

	
	}

function remove(){
	document.getElementById("status").innerHTML ="<img src='./images/loadinfo.net.gif' label='updateing.'>";

	document.getElementById("popupBody").innerHTML ='<a href=# id="doRemove">delet</a> &nbsp; <span id="cancelT";>cancel</span>';
	popup('comment');

	document.getElementById("doRemove").addEventListener('click', doRemove);
	document.getElementById("cancelT").addEventListener('click', cancelT);


}

function doRemove(){
	viewStatus("status","Delete.");
	localStorage.removeItem("notepad"+nowpage);
	
	init();
	checkAreasize();
	
	document.getElementById("byte").innerHTML = countByte((localStorage["notepad"+nowpage] || ""));

	popdown('comment');
}


function doNotepad(setpage){
	nowpage = localStorage["nowpage"] = setpage;
	showNotepad();
	init();
	checkAreasize();
	
	document.getElementById("byte").innerHTML = countByte((localStorage["notepad"+nowpage] || ""));
	
		document.getElementById("pageno").innerHTML = nowpage;
			background.badge(nowpage);

}

function showNotepad(){
	document.getElementById('notearea').style.display='inline';
	document.getElementById('menuarea').style.display='none';
}


function doMenu(){
	document.getElementById('notearea').style.display='none';
	document.getElementById('menuarea').style.display='inline';

	var menuline = "";

	var str="";
	var newnote = true;
	var retu=0;
	var arry = new Array();
	for(i=1;i <1000;i = i +1){
		rtxt=(localStorage["notepad" + i] || "");
		if(rtxt.length > 0){
			rnum = rtxt.split(/\n/g);
			menuline = menuline + '<li><a href=# id="doNotepad_'+i+'" >P.'+i+'<span class="secondaryWLink" style="width: 220px; white-space: nowrap; overflow: hidden; text-overflow: clip;">'+htmlEscape(rnum[0])+'</span></a></li>';


			arry.push(i);

			// document.getElementById("doNotepad_"+i).addEventListener('click', (function (i){ return function (){doNotepad(i);} })(i),false );

			retu = retu +1;
		}else{
			if(newnote){
				menuline = menuline + '<li><a href=# id="doNotepad_'+i+'" >P.'+i+'<span class="secondaryWLink" >New Note.</span></a></li>';
				arry.push(i);

				// document.getElementById("doNotepad_"+i).addEventListener('click', (function (i){ return function (){ doNotepad(i);} })(i),false );


				newnote = false;
				retu =retu +1;
			}
		
		}
	}
	
	menuline=menuline+'<li><a href=options.html target=_blank>&nbsp;<span class="secondaryWLink" >About popNotepad</span></a></li>';
	document.getElementById('menuline').innerHTML = menuline;


	window.location.hash = "menuline";

	for (var i = 0; i < arry.length ; i++) {
		
		var args = arry[i];
		document.getElementById("doNotepad_"+ args ).addEventListener('click', (function (args){ return function (){ doNotepad(args);} })(args),false );
	};
	
}
function doSearch(){
	document.getElementById('notearea').style.display='none';
	document.getElementById('menuarea').style.display='inline';
	var menuline = "" ;
	var arry = new Array();

	menuline ='<li><a href=# id="doMenu" ><img src="./images/la.png" label="prev." ><span class="secondaryWLink" >back Menu.</span></a></li>';


	
	for(i=1;i <1000;i = i +1){
		rtxt=(localStorage["notepad" + i] || "");
		if(rtxt.indexOf(document.getElementById('searchtext').value) >= 0){
			if(rtxt.length > 0){

				rnum = rtxt.split(/\n/g);
				menuline = menuline + '<li><a href=# id="doNotepad_'+i+'" >P.'+i+'<span class="secondaryWLink" style="width: 220px; white-space: nowrap; overflow: hidden; text-overflow: clip;">'+htmlEscape(rnum[0])+'</span></a></li>';

				arry.push(i);


			}
		}
	}
	
	

	document.getElementById('menuline').innerHTML = menuline;
	
	window.location.hash = "menuline";

	document.getElementById("doMenu").addEventListener('click', doMenu );
	for (var i = 0; i < arry.length ; i++) {
		
		var args = arry[i];
		document.getElementById("doNotepad_"+ args ).addEventListener('click', (function (args){ return function (){ doNotepad(args);} })(args),false );
	};	
	
}
var htmlEscape = (function(){
  var map = {"<":"&lt;", ">":"&gt;", "&":"&amp;", "'":"&#39;", "\"":"&quot;", " ":"&nbsp;"};
  var replaceStr = function(s){ return map[s]; };
  return function(str) { return str.replace(/<|>|&|'|"|\s/g, replaceStr); };
})();

function indexLink(){
	update();
	doMenu();

}


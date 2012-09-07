

var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded',  function(e) {
//	init();
	
	document.getElementById("ver").innerHTML = background.chrome.extension.getVersion();
//	document.getElementById("twitterid").value = (localStorage["twitterid"] || "");
	document.getElementById("apps").value = (localStorage["appsdomain"] || "");


}, false);

function init(){
	document.form7.text71.value = ( localStorage["notepad"] || "" )+"";
}

function update(){
	localStorage.removeItem("notepad");

}

function viewStatus(str1,str2){
    //
    var status = document.getElementById(str1);
    status.innerHTML = str2;
    setTimeout(function() { status.innerHTML = ""; }, 1 * 1000);


}


function save_twitter() {
    //
    localStorage["twitterid"] = document.getElementById("twitterid").value;
    localStorage["twitterpass"] = document.getElementById("twitterpass").value;
	
	viewStatus("status_twitter","Options Saved.");
	
	
}
function save_domain() {

	localStorage["appsdomain"] = document.getElementById("apps").value + "";
	viewStatus("status_domain","Options Saved.");

}





chrome.extension.onRequest.addListener( 
  function(request, sender, sendResponse) {
	var txt =  window.getSelection() + "";
	sendResponse({text:txt});
  }); 
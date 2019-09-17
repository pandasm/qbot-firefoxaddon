browser.browserAction.onClicked.addListener(function(tab) {
    //Do what you want to do when the browser UI button is clicked.
	//console.log(tab.id);
	
	//*************Injcet script on current active tab ***************	
chrome.storage.local.get(null, function(obj) {	
      // console.log(obj.identifier);
       if(obj.identifier !== undefined)
	   {
		   browser.tabs.executeScript(tab.id,{
		   file: "/data/QAF-mousejs.js"
		}); 
		
	   } else
	   {	   	
			chrome.notifications.create(
				'QAF',{   
				type: 'basic', 
				iconUrl: '/data/QAF32.png', 
				title: "QAF", 
				message: "Please activate plugin from QAF to start using!" 
				});		
				
				   setTimeout(function () {
						chrome.notifications.clear('QAF');
				}, 3000);
	   }
});
		
 



//**************Get value from Injected js ***********
/* chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
			if(request.action == "Qbot-LocatorData")
			{
			
			console.log("I am in backgound" + request.source);
			console.log("backgound J :-" + j);
			console.log("Apidata :-" + request.apidata);
			 var array = request.apidata.split(';');
				 projectname = array[0];
				 console.log(projectname);
				 testcasename = array[1];
				 console.log(testcasename);
				 mainurl = array[2];
				 console.log(mainurl);
			getXElementTreeXPath(request.source);	
		/*	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
			 chrome.tabs.sendMessage(tabs[0].id, {
                action: 'Qbot-Background-To-ContentScript',
                source:  request.source
            });
			}); */
			//}
       // }); */
			
  //console.log("Hey done!");
});
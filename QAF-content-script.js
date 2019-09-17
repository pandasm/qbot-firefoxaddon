
//**************Get value from Injected js ***********
chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.action == "Qbot-Background-To-ContentScript")
			{   
				console.log(" I am in Content_Script :- "+request.source);		 
			}
        });
		
document.addEventListener("newMessage", function(data) {
	//alert("i m in helper");
	var url=JSON.stringify(data.detail.state);
	chrome.storage.local.set({"identifier":url},function (){
    console.log("Storage Succesful");
	});	
});

		
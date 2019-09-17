window.addEventListener("mouseover", handleMouseOver, true);
window.addEventListener("mouseout", handleMouseOut, true);
window.addEventListener("click", mouseclick, true);

var framepath = '';
var framepath2 = '';
var frameid = '';
var frameid2 = '';
var inputarry = [];
var selectarray = [];
var textareaarray = [];
var buttonarray = [];
var iframeinputarry = [];
var iframeselectarray = [];
var iframetextareaarray = [];
var iframebuttonarray = [];
var iframenamearray = [];
var subiframeeventremover = [];
var finaliframename = '';
var iframenameidarray = [];
var iframeindex = '';
var iframedom = '';

//********************find disabled field *****************  
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].disabled == true || inputs[i].disabled) {
        inputarry.push(inputs[i]);
        inputs[i].disabled = false;
        inputs[i].setAttribute("readonly", "readonly");
    }
}
var selects = document.getElementsByTagName("select");
for (var i = 0; i < selects.length; i++) {
    if (selects[i].disabled == true || selects[i].disabled) {
        selectarray.push(selects[i]);
        selects[i].disabled = false;
        selects[i].setAttribute("readonly", "readonly");
    }
}
var textareas = document.getElementsByTagName("textarea");
for (var i = 0; i < textareas.length; i++) {
    if (textareas[i].disabled == true || textareas[i].disabled) {
        textareaarray.push(textareas[i]);
        textareas[i].disabled = false;
        textareas[i].setAttribute("readonly", "readonly");
    }
}
var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].disabled == true || buttons[i].disabled) {
        buttonarray.push(buttons[i]);
        buttons[i].disabled = false;
        buttons[i].setAttribute("readonly", "readonly");
    }

}

//*************click method of mouse*********************
function mouseclick(e) {
    var node = e.target;
    var pp = '';

    //*************Set disabled field true********************
    for (var i = 0; i < inputarry.length; i++) {
        inputarry[i].disabled = true;
        inputarry[i].style.outline = "none";
        inputarry[i].removeAttribute("readonly");
    }

    for (var i = 0; i < selectarray.length; i++) {
        selectarray[i].disabled = true;
        selectarray[i].style.outline = "none";
        selectarray[i].removeAttribute("readonly");
    }

    for (var i = 0; i < textareaarray.length; i++) {
        textareaarray[i].disabled = true;
        textareaarray[i].style.outline = "none";
        textareaarray[i].removeAttribute("readonly");
    }

    for (var i = 0; i < buttonarray.length; i++) {
        buttonarray[i].disabled = true;
        buttonarray[i].style.outline = "none";
        buttonarray[i].removeAttribute("readonly");
    }

    getXElementdata(node);
    e.preventDefault();
    e.stopPropagation();
    window.removeEventListener("click", mouseclick, true);
    window.removeEventListener("mouseover", handleMouseOver, true);
    window.removeEventListener("mouseout", handleMouseOver, true);

    for (var j = 0; j <= subiframeeventremover.length - 1; j++) {
        subiframeeventremover[j].contentWindow.removeEventListener("mouseover", iframehandleMouseOver, true);
        subiframeeventremover[j].contentWindow.removeEventListener("mouseout", iframehandleMouseOver, true);
        subiframeeventremover[j].contentWindow.removeEventListener("click", iframemouseclick, true);
        subiframeeventremover[j].contentWindow.removeEventListener("mousedown", iframemousedown(pp));
    }

}

//*************MouseOver Method*******************
function handleMouseOver(e) {
    e.target.style.outline = "dotted #87CEFA";
    var elem = document.activeElement;
    if (elem && elem.tagName == 'IFRAME') {
        iframeevent(elem); //Pass iframe name to iframeevent method
    }
}
//*************MouseOut Method*******************
function handleMouseOut(e) {
    e.target.style.outline = "none";
}

//********Iframe Remove function (When multiple Subiframe present then this function is use for remove mouseover control for previous iframe)********************
function iframeeventremover(elem) {
    window.removeEventListener("click", mouseclick, true);
    window.removeEventListener("mouseover", handleMouseOver, true);
    window.removeEventListener("mouseout", handleMouseOver, true);

    /*   iframedom.contentWindow.removeEventListener("mouseover", iframehandleMouseOver, false);
       iframedom.contentWindow.removeEventListener("mouseout", iframehandleMouseOver, false);
       iframedom.contentWindow.removeEventListener("click", iframemouseclick, true); */

    iframeevent(elem);
}

function iframeevent(elem) {
    document = document || window.document;

    if (iframedom !== elem && iframedom !== '') {
        var finaliframedata = '';
        elem.contentWindow.addEventListener("mouseover", iframehandleMouseOver, true);
        elem.contentWindow.addEventListener("mouseout", iframehandleMouseOut, true);
        elem.contentWindow.addEventListener("click", iframemouseclick, true);
        // iframedom=elem;
        var checkexistsname = subiframeeventremover.indexOf(elem);
        if (checkexistsname === -1) {
            subiframeeventremover.push(elem);
        }
        var subifrm = iframedom.contentWindow.document.getElementsByTagName("iframe");
        for (var i = 0; i <= subifrm.length; i++) {
            // Recall
            var focused = subifrm[i];
            if (elem === focused) {
                var pp = i + ";" + focused.id + ";" + focused.name;
                elem.contentWindow.addEventListener("mousedown", function(e) {
                    e = e || window.event;
                    var button = e.which || e.button;
                    if (e.button == 0) { // left click
                        iframemousedown(pp);
                    }
                });
                break;
            }

        }
        //********************find IFrame disabled field************************
        var inputs1 = elem.contentWindow.document.getElementsByTagName("input");
        for (var i = 0; i < inputs1.length; i++) {
            if (inputs1[i].disabled == true || inputs1[i].disabled) {
                iframeinputarry.push(inputs1[i]);
                inputs1[i].disabled = false;
                inputs1[i].setAttribute("readonly", "readonly");
            }
        }
        var selects1 = elem.contentWindow.document.getElementsByTagName("select");
        for (var i = 0; i < selects1.length; i++) {
            if (selects1[i].disabled == true || selects1[i].disabled) {
                iframeselectarray.push(selects1[i]);
                selects1[i].disabled = false;
                selects1[i].setAttribute("readonly", "readonly");
            }
        }
        var textareas1 = elem.contentWindow.document.getElementsByTagName("textarea");
        for (var i = 0; i < textareas1.length; i++) {
            if (textareas1[i].disabled == true || textareas1[i].disabled) {
                iframetextareaarray.push(textareas1[i]);
                textareas1[i].disabled = false;
                textareas1[i].setAttribute("readonly", "readonly");
            }
        }
        var buttons1 = elem.contentWindow.document.getElementsByTagName("button");
        for (var i = 0; i < buttons1.length; i++) {
            if (buttons1[i].disabled == true || buttons1[i].disabled) {
                iframebuttonarray.push(buttons1[i]);
                buttons1[i].disabled = false;
                buttons1[i].setAttribute("readonly", "readonly");
            }
        }

    } else {
        // Get iframes
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i <= iframes.length; i++) {
            // Recall
            var focused = iframes[i];
            if (elem === focused) {
                iframeindex = i;
                iframedom = iframes[i];
                var checkexistsname = subiframeeventremover.indexOf(iframes[i]);
                if (checkexistsname === -1) {
                    subiframeeventremover.push(elem);
                }
                try {

                    elem.contentWindow.addEventListener("mouseover", iframehandleMouseOver, true);
                    elem.contentWindow.addEventListener("mouseout", iframehandleMouseOut, true);
                    elem.contentWindow.addEventListener("click", iframemouseclick, true);
                    var pp = i + ";" + focused.id + ";" + focused.name;
                    elem.contentWindow.addEventListener("mousedown", function(e) {
                        e = e || window.event;
                        var button = e.which || e.button;
                        if (e.button == 0) { // left click
                            iframemousedown(pp);
                        }
                    });
                } catch (ex) {
                    console.error("outer", ex.message);
                }
                //********************find IFrame disabled field************************
                var inputs1 = iframes[i].contentWindow.document.getElementsByTagName("input");
                for (var i = 0; i < inputs1.length; i++) {
                    if (inputs1[i].disabled == true || inputs1[i].disabled) {
                        iframeinputarry.push(inputs1[i]);
                        inputs1[i].disabled = false;
                        inputs1[i].setAttribute("readonly", "readonly");
                    }
                }
                var selects1 = iframes[i].contentWindow.document.getElementsByTagName("select");
                for (var i = 0; i < selects1.length; i++) {
                    if (selects1[i].disabled == true || selects1[i].disabled) {
                        iframeselectarray.push(selects1[i]);
                        selects1[i].disabled = false;
                        selects1[i].setAttribute("readonly", "readonly");
                    }
                }
                var textareas1 = iframes[i].contentWindow.document.getElementsByTagName("textarea");
                for (var i = 0; i < textareas1.length; i++) {
                    if (textareas1[i].disabled == true || textareas1[i].disabled) {
                        iframetextareaarray.push(textareas1[i]);
                        textareas1[i].disabled = false;
                        textareas1[i].setAttribute("readonly", "readonly");
                    }
                }
                var buttons1 = iframes[i].contentWindow.document.getElementsByTagName("button");
                for (var i = 0; i < buttons1.length; i++) {
                    if (buttons1[i].disabled == true || buttons1[i].disabled) {
                        iframebuttonarray.push(buttons1[i]);
                        buttons1[i].disabled = false;
                        buttons1[i].setAttribute("readonly", "readonly");
                    }
                }
                break;
            }

        }
    }

}

//*************Iframe MouseOver Method*******************
function iframehandleMouseOver(e) {
    e.target.style.outline = "dotted #87CEFA";

    if (e.target.tagName === 'IFRAME') {
        var ggg = e.target.innerHTML;
        iframeeventremover(e.target);
    }
}

//*********Iframe Mouse Down Function, Getting Correct Iframe Name**********
function iframemousedown(test) {
    finaliframename = test;
}


//*************Iframe MouseOut Method*******************
function iframehandleMouseOut(e) {
    e.target.style.outline = "none";
}

//*************Iframe click method of mouse*********************
function iframemouseclick(e) {
    var node = e.target;
    var pp = '';

    //*************Set disabled IFrame field true********************
    for (var i = 0; i < iframeinputarry.length; i++) {
        iframeinputarry[i].disabled = true;
        iframeinputarry[i].style.outline = "none";
        iframeinputarry[i].removeAttribute("readonly");
    }

    for (var i = 0; i < iframeselectarray.length; i++) {
        iframeselectarray[i].disabled = true;
        iframeselectarray[i].style.outline = "none";
        iframeselectarray[i].removeAttribute("readonly");
    }

    for (var i = 0; i < iframetextareaarray.length; i++) {
        iframetextareaarray[i].disabled = true;
        iframetextareaarray[i].style.outline = "none";
        iframetextareaarray[i].removeAttribute("readonly");
    }

    for (var i = 0; i < iframebuttonarray.length; i++) {
        iframebuttonarray[i].disabled = true;
        iframebuttonarray[i].style.outline = "none";
        iframebuttonarray[i].removeAttribute("readonly");
    }
    getXElementdata(node);
    e.preventDefault();
    e.stopPropagation();
    window.removeEventListener("click", mouseclick, true);
    window.removeEventListener("mouseover", handleMouseOver, true);
    window.removeEventListener("mouseout", handleMouseOver, true);
    try {

        for (var j = 0; j <= subiframeeventremover.length - 1; j++) {
            subiframeeventremover[j].contentWindow.removeEventListener("mouseover", iframehandleMouseOver, true);
            subiframeeventremover[j].contentWindow.removeEventListener("mouseout", iframehandleMouseOver, true);
            subiframeeventremover[j].contentWindow.removeEventListener("click", iframemouseclick, true);
            subiframeeventremover[j].contentWindow.removeEventListener("mousedown", iframemousedown(pp));
        }
    } catch (ex) {
        console.error("iframe remover issue ", ex.message);
    }
}

//********Create Xpath***********
function getXElementdata(node) {
    var url1 = node;
    var text = url1.text;
    var optionmuliple = node.parentNode.multiple;
    var optionname = node.nodeName;

    //*************Iframe tagname and name**************
    var iframetext = '';
    var iframetag = '';

    var array = finaliframename.split(';');
    var iframeindex = array[0];
    var iframedataid = array[1];
    var iframedataname = array[2];

    if (iframeindex != '') {
        var iframetext = 'Iframe Index' + ':-' + array[0];
    }

    if (iframedataid != '' && iframedataid != undefined) {
        var iframetext = iframetext + ', ' + 'Iframe ID' + ':-' + iframedataid;
    }

    if (iframedataname != '' && iframedataname != undefined) {
        var iframetext = iframetext + ', ' + 'Iframe Name' + ':-' + iframedataname;
    }

    var iframetext1 = 'IFRAME' + '|' + iframetext;

    //*********nodetag***********
    var nodetag = 'nodetag' + '|' + node.nodeName;
    var text1 = node.text;
    var title = node.title;
    var value = node.value;
    //**********get linktext***********
    var linktext = 'linktext' + '|' + node.text;
    var x = node.childNodes;
    var y = x.length;

    //*****************Get TEXT*********************
    if (node.text != null && node.text != undefined && node.text != '') {
        var text1 = node.text;

    } else if (node.title != null && node.title != '' && node.title != undefined) {
        var text1 = node.title;

    } else if (node.name != '' && node.name != undefined && node.name != null) {
        var text1 = node.name;

    } else if (node.value != null && node.value != '' && node.value != undefined) {
        var text1 = node.value;

    } else {
        for (var i = 0; i < node.childNodes.length; i++) {
            if (node.childNodes[i].nodeValue != null && node.childNodes[i].nodeValue != '' && node.childNodes[i].nodeValue != undefined) {

                if (!(node.childNodes[i].nodeValue.replace(/^\s+|\s+$/g, '') == '')) {
                    var text1 = node.childNodes[i].nodeValue;
                }
                break;
            }
        }
    }
    var text = 'text' + '|' + text1;

    //***************Get Name****************	
    if (node.name != '' || node.name != undefined) {
        var name = node.name;
      //  console.log(name);
    }
    var name1 = 'name' + '|' + name;
   // console.log(name1);

    //***************Get Csspath***************	   
    if (node.id != '') {
        var csspath = '#' + node.id;

    } else if (node.className != '') {
        var tag = node.nodeName.toLowerCase();
        var csspath = tag + '.' + node.className;
    }

    var csspath1 = 'csspath1' + '|' + csspath;

    //******************Full Xpath from root html to child********************
    var paths = [];
    var csspaths = [];
    for (; node && node.nodeType == node.ELEMENT_NODE; node = node.parentNode) {

        var index = 0;
        for (var sibling = node.previousSibling; sibling; sibling = sibling.previousSibling) {
            if (sibling.nodeType == node.DOCUMENT_TYPE_NODE) {
                continue;
            }
            if (sibling.nodeName == node.nodeName) {
                ++index;
            }
        }

        var tagName = node.nodeName.toLowerCase();
        var xid = node.id;

        if (node.id == '') {
            var pathIndex = '[' + (index + 1) + ']';
            paths.unshift(tagName + pathIndex);
        } else {
            break;
        }
    }
    //*******************Create Full Path******************************
    var path = paths.join('/');
    var Xpath = '/' + path;
    var tagname = node.nodeName.toLowerCase();
    var demo = node.id;
    var nodeid = "'" + demo + "'";
    var array = nodeid.split('+');
    var spilt1 = array[0];
    var nodedata = spilt1 + node.id + spilt1;
    var trimdata = nodedata.trim();

    if (path == '') {
        var xid = 'xid' + '|' + '//' + tagname + '[@id=' + nodeid + ']';
        var ID1 = node.id;
        var ID2 = 'id' + '|' + node.id;

    } else if (tagname != '#document') {
        if (optionname != 'OPTION') {
            var xid = 'xid' + '|' + '//' + tagname + '[@id=' + nodeid + ']' + Xpath;

        } else if (optionname == 'OPTION' && optionmuliple == true) {
            var xid = 'xid' + '|' + '//' + tagname + '[@id=' + nodeid + ']' + Xpath;

        } else if (optionname == 'OPTION' && optionmuliple == false) {
            var xid = 'xid' + '|' + '//' + tagname + '[@id=' + nodeid + ']';
            var ID1 = node.id;
            var ID2 = 'id' + '|' + node.id;

            //*********nodetag***********
            var nodetag = 'nodetag' + '|' + node.nodeName;
            var text1 = node.text;
            var title = node.title;
            var value = node.value;

            //**********get linktext***********
            var linktext = 'linktext' + '|' + node.text;
            var x = node.childNodes;
            var y = x.length;

            //*****************Get TEXT*********************
            if (node.text != null && node.text != undefined && node.text != '') {
                var text1 = node.text;

            } else if (node.title != null && node.title != '' && node.title != undefined) {
                var text1 = node.title;

            } else if (node.name != '' && node.name != undefined && node.name != null) {
                var text1 = node.name;

            } else if (node.value != null && node.value != '' && node.value != undefined) {
                var text1 = node.value;

            } else {
                for (var i = 0; i < node.childNodes.length; i++) {
                    if (node.childNodes[i].nodeValue != null && node.childNodes[i].nodeValue != '' && node.childNodes[i].nodeValue != undefined) {

                        if (!(node.childNodes[i].nodeValue.replace(/^\s+|\s+$/g, '') == '')) {
                            var text1 = node.childNodes[i].nodeValue;
                        }
                        break;
                    }
                }
            }
            var text = 'text' + '|' + text1;

            //***************Get Name****************	
            if (node.name != '' || node.name != undefined) {
                var name = node.name;
                console.log('name :- ' + name);
            }
            var name1 = 'name' + '|' + name;

            //***************Get Csspath***************	   
            if (node.id != '') {
                var csspath = '#' + node.id;
            } else if (node.className != '') {
                var tag = node.nodeName.toLowerCase();
                var csspath = tag + '.' + node.className;
            }
            var csspath1 = 'csspath1' + '|' + csspath;
        }
    } else {
        var xid = 'xid' + '|' + Xpath;
    }
    var ID = ID2;

    var last = nodetag + '|' + text + '|' + csspath1 + '|' + xid + '|' + name1 + '|' + linktext + '|' + iframetext1 + '|' + ID;
   // console.log(last);

    /* try {
        //****************Browser Notification**********************
       if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function(status) {
                var n = new Notification('QAF', {
                    body: messagebody,
                    icon: img // optional
                });
                n.close();
            });
        }
    } catch (ex) {
        console.error("Image Error ", ex.message);
    } */

    //******************Get Url from Local Storage and call XMLHttpRequest to QAF**************************** 
    var Apiurl = '';
    var projectname = '';
    var testcasename = '';
    var mainurl = '';

    chrome.storage.local.get('identifier', function(obj) {	
        //console.log(JSON.stringify(obj.identifier.replace(/\"/g, "")));
        Apiurl = obj.identifier.replace(/"/g, '');
       // console.log(Apiurl);
        var array1 = Apiurl.split(';');
        //console.log(array1);
        projectname = array1[0];
       // console.log(projectname);
        testcasename = array1[1];
       // console.log(testcasename);
        mainurl = array1[2];
        //console.log(mainurl);

        var array = last.split('|');
        var nodetag1 = array[0];
        var nodetag = array[1];

        var text1 = array[2];
        var text2 = array[3];

        if (text2 != 'undefined' && text2 != '') {
            var text = text2.trim();
        } else {
            var text = nodetag;
        }

        var csspath1 = array[4];
        var csspath2 = array[5];
        if (csspath2 != 'undefined') {
            var csspath = csspath2;
        } else {
            var csspath = '';
        }

        var xid1 = array[6];
        var xid = array[7];

        var name1 = array[8];
        var name2 = array[9];

        if (name2 != 'undefined') {
            var name = name2;
        } else {
            var name = '';
        }

        var linktext1 = array[10];
        var linktext2 = array[11];

        if (linktext2 != 'undefined') {
            var linktext = linktext2.trim();
        } else {
            var linktext = '';
        }


        var id1 = array[14];
        var id = array[15];

        if (id != undefined) {
            var ID = id;
        } else {
            var ID = '';
        }
        if (mainurl == '') {

            //*********Alert Box Data *************
            var iframetext1 = array[12];
            //console.log(iframetext1);
            var iframetext = array[13];
            //console.log(iframetext);  
            if (iframetext != undefined && iframetext != '') {
                var IFRAME = iframetext;
            } else {
                var IFRAME = '';
            }
            var data007 = "Xpath : " + xid + "\\n\\n" + "Text : " + text + "\\n\\n" + "Csspath : " + csspath + "\\n\\n" + "Nodetag : " + nodetag + "\\n\\n" + "Name : " + name + "\\n\\n" + "Linktext : " + linktext + "\\n\\n" + "ID : " + ID + "\\n\\n" + "Iframe : " + IFRAME;
            //var contentdata = 'alert(' + '"' + data007 + '"' + ');';

        } else {
            var IFRAME = '';
            if (array[13] !== '') {
                var array = array[13].split(',');
                var iframeindex = array[0];
                var iframedataid = array[1];
                var iframedataname = array[2];
                var iframetext = '';
                if (iframedataid !== '' && iframedataid != undefined) {
                    iframetext = iframedataid.split(':-')[1];
                    //console.log("iframetext :-- "+iframetext);  
                } else if (iframedataname !== '' && iframedataname != undefined) {
                    iframetext = iframedataname.split(':-')[1];
                    //console.log("iframetextname :-- "+iframetext); 
                }
                var iframetext1 = '';
                if (iframetext != '') {
                    IFRAME = 'IFRAME' + ';' + iframetext;
                    //console.log("iframetext11"+ IFRAME);
                } else {
                    IFRAME = 'IFRAMEIndex' + ';' + iframeindex.split(':-')[1];
                    //console.log("iframetext12"+ IFRAME);
                }
            }

            var myData = {
                Xpathid: xid,
                projectname: projectname,
                testcaseid: testcasename,
                csspath: csspath,
                nodetag: nodetag,
                text: text,
                name: name,
                linktext: linktext,
                xid: ID,
                window: IFRAME
            };


            //**********POST Qaf Api ******************* 
            var DataForDB = JSON.stringify(myData);
            var messagebody = '';
			var iconurl=chrome.extension.getURL("data/QAF32.png");
            var xhr = new XMLHttpRequest();
            var posturl = 'http://' + mainurl + '/QAFWeb/qafwebservice';
            //console.log("posturl" + posturl);
            xhr.open('POST', posturl, false);
            xhr.setRequestHeader('Content-Type', 'application/json');
			
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                    console.log("shdjsghd" + xhr.status);
                    messagebody = "'" + text + "'" + ' Object Added Successfully!';
				    if (window.Notification && Notification.permission !== "denied") {
					Notification.requestPermission(function(status) {
						var n = new Notification('QAF', {
							body: messagebody,
							icon: iconurl // optional
						});
						
						setTimeout(function() {
							 n.close()
						  }, 3000);
					});
				  }
                } else {
                    console.log("fvdg" + xhr.status);
                    messagebody = 'Please check your Connection!';
					
					 if (window.Notification && Notification.permission !== "denied") {
					Notification.requestPermission(function(status) {
						var n = new Notification('QAF', {
							body: messagebody,
							icon: iconurl // optional
						});
						
						setTimeout(function() {
							 n.close()
						  }, 3000);
					});
				}
                }
            }
			
            xhr.send(DataForDB); // Send json format data in Api
			
        }
    });
	

    /* chrome.runtime.sendMessage({
						action: "Qbot-LocatorData",
						source: last,
						apidata: Apiurl
                    });		 */

    //browser.runtime.sendMessage({"url": last007});   
    //browser.runtime.sendMessage(last);//last
    //  alert("Xpath : " + xid + "\n\nText : " +text+ "\n\nCsspath : "+csspath+"\n\nNodetag : "+nodetag+"\n\nName : " +name+"\n\nLinktext : "+linktext+"\n\nXid : "+ID+"\n\nIFrame : "+IFRAME);
    // alert(data007);

}
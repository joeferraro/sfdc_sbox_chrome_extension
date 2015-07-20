init();

function init() {
	chrome.storage.sync.get({
	  showPod: true,
	}, function(items) {
		var showPod = items.showPod;

		var sd = subDomain(document.location.href);
		if (sd.indexOf('cs') !== -1 || sd.indexOf('tapp') !== -1 || sd.indexOf('test') !== -1) {
			changeFavicon();
		}

		if (showPod) {
			changeTitle(sd);
    }
	});
}

function subDomain(url) {
	// IF THERE, REMOVE WHITE SPACE FROM BOTH ENDS
	url = url.replace(new RegExp(/^\s+/),""); // START
	url = url.replace(new RegExp(/\s+$/),""); // END
 
	// IF FOUND, CONVERT BACK SLASHES TO FORWARD SLASHES
	url = url.replace(new RegExp(/\\/g),"/");
 
	// IF THERE, REMOVES 'http://', 'https://' or 'ftp://' FROM THE START
	url = url.replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i),"");
 
	// IF THERE, REMOVES 'www.' FROM THE START OF THE STRING
	url = url.replace(new RegExp(/^www\./i),"");
 
	// REMOVE COMPLETE STRING FROM FIRST FORWARD SLASH ON
	url = url.replace(new RegExp(/\/(.*)/),"");
 
	// REMOVES '.??.??' OR '.???.??' FROM END - e.g. '.CO.UK', '.COM.AU'
	if (url.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) {
	      url = url.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i),"");
 
	// REMOVES '.??' or '.???' or '.????' FROM END - e.g. '.US', '.COM', '.INFO'
	} else if (url.match(new RegExp(/\.[a-z]{2,4}$/i))) {
	      url = url.replace(new RegExp(/\.[a-z]{2,4}$/i),"");
	}
 
	return url;
}

function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//sets title like so: na2 | salesforce.com | Home
function changeTitle(sd) {
	var serverName = sd.split('.')[0];
  if (endsWith(serverName, '--c')) {
    serverName = serverName.substring(0, serverName.length - 3);
  }
  window.document.title = serverName+' | '+window.document.title;
}

function changeFavicon() {
  var head = document.getElementsByTagName("head")[0];
  var links = head.getElementsByTagName("link");
  // Remove previous favicon
  for (var i = 0; i < links.length; i++) {
    if (links[i].rel=="shortcut icon") {
      head.removeChild(links[i]);
      break;
    }
  }
  // Add new favicon
  var sboxFavIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQzFBRUQ4MzI3MjYxMUU1ODUwODlDODg4OEQ5QUU5MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQzFBRUQ4NDI3MjYxMUU1ODUwODlDODg4OEQ5QUU5MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBDMUFFRDgxMjcyNjExRTU4NTA4OUM4ODg4RDlBRTkwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBDMUFFRDgyMjcyNjExRTU4NTA4OUM4ODg4RDlBRTkwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+b74ongAABBlJREFUeNrsl11sU2UYx//v6Tmn7Tn92jpi3fcY2zJH2BzRaIgXfkAUTSQmAibEj0i42R1eEBODidz6ceG8mOCN0cSvYPzIEq/UmCgJcQvKwhgwNhgCo+vWru3a057z+rynacfY1p4NCRfyJE1P2r7v83uf9/98lHHOcTdNwl22ewDyal+YHDxjWjBMomSA6mJQ6YHe2B0FEI6TOQsTyRyGozmMz+cIgOGBkILOKgWNusyDRFL83ZxhIU9CFnAhVYImS2uClG91fokcfzuZxkdn5jEezy25rM6gigMdfjzb6OVzBsfP/yzQK4MraRNNPhnb6zx4LOJGe1Dhuiw5gmA3p+H1BZO/PTSLAXK+muluCT1Vqn3ykZix7PutG9x4qydkw1i0dTJX2F+TGXzK8uiUALIm59/Ryff8Ok2huL173Rbx4tU2HcSIsXgBstmnoLfGjY6gjBqPqwRSApjNWnzfLzcweDl9xxTfHFDw0kYdr7T5sImeBUQJQIS/9ZsppLJW2U3e2xzArnY/Nlarpc++Holj9x8xxyAvt/vwTm+V0A1bUgeIoaLzg4+ElzgX9mJXEBdeqHMM8OlYEp+fTyJncV4CoOxBV0Atu3Df5qD9/gkJlR27aL86PpvEX9cWbKi+Rq9jiKNnk4hmrEIaivSLUeiFUsuZrhZ4h6PZ0mdjtEn3j9fWrIcJqi9/Ro1CKY5mTHw4ksDwrFF20eC5Qnr274jg1HMRfPVoNfbe5163KEcpQ1ie7mFgNIE+ISKrcms+1hvCQ7UebIkshjtF+fbF6Tj2D82tCeAD0pNMAPh4NOnIuTDbydCiKBv8Mna2+fE6qXqSwnrkXMoxQE9YhSSS7lTMqPjjdo8Evr/FDn3R3jidsNNvgEQprMmvOHZeT6W7i3pLQVUOpiIhtulk3g69uIaiPRFU8FSzZj/HDcsxQF9nwG5eLEN30PDlFG6k8xUXFevASjZOUWw9fsWR892tGt59OIwGnQqR6Fl7WzRHC0XI3z8xYzu72X6i7Hhm8GrF9Y2kl0PdQRzuqUKtJi82o5FZg7/22wxOTmf+09q/s0FDwM2gUdFvIX30ht3YWqMub0aiEJ24nkX/aBw/XF6o2A+cOj/UHcL9mgRR3wJ03yHVtXo7FhBiCrqYMDGVymOKNHF8Ir2k6q1kYa8LD1a7Qc0UsayJAPX8p+u9eL5Jp8FEhtfFmKOJSJC1Upiob3ODNhPjVoQ2P/C7AV6mST1JRekg9YiAwqj/MzotR0RzrXjaihPRrXY1bfKjZ+fRTxPSsiyhg+2o8+JNEtU2KseKxNY1rJYFENeSoNwenjHw/aUU/o7lMJ/n1Mdd2F7rxeN0+nq9cpjXDVA00bcTdCUZIhIVW0zAPgq5xyXd9pjO7v03/N8D/CvAAKhttvZ/WR+LAAAAAElFTkSuQmCC';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}
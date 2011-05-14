init();

function init() {
	var sd = subDomain(document.location.href);
	//console.log('subdomain is: ' + sd);
	if (sd.indexOf('cs') != -1 || sd.indexOf('tapp') != -1 || sd.indexOf('test') != -1) {
		changeFavicon();
	}
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
  var sboxFavIcon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD///8A////APz8/AHw8PAO2NjYJsjIyDXKysoz3t7eH/Ly8gz8/PwB////AP///wD///8A////AP///wD///8A/Pz8Afb29gfo6OgVysrKM66poW67rJGtuKuUoa6sqF7MzMwy4uLiHOzs7BL29vYH/Pz8Af///wD///8A////AOrq6hTS0tIrurq6RLesmJPz1aH/9d+2//Xetf/rz573q6WZgaysrFK6urpE0tLSK+jo6BXy8vIM+Pj4Bv///wDExMQ6sqmaib6vkrnmzqTu+evR//v05f/78+T/yr6n/6yae/PKtpPe072W06+pnXy2trZIxMTEOtra2iTy8vIMy7qbrfTaq//458j/+/Hg//779f/f3t3/MDAw/wAAAP8AAAD/AAAA/3x0Zv/s06f3vq+UucGvkbayraVq1NTUKvLVn//56c7//fft///9/P//////YGBg/zAwMP/f39////7+/7++vP8AAAD/3NXH//nr0//24bz/68+d9722qm702aj/+u/a//78+f///////////+/v7//f39///////8/Pz/9wcHD/AAAA/8/Ozf/+/Pf//PTl//flw//iyZrg7tOg8/nr0v/+/Pf/////////////////gICA/xAQEP8AAAD/EBAQ/4CAgP////////////78+P/67tn/89im/+DTvHj137b//fjv////////////n5+f/wAAAP9wcHD/r6+v///////////////////////+/Pn/+u/c//TZqf/g4OAe9Nmq//z05////v7//////4+Pj/8gICD/7+/v/+/v7/9QUFD/cHBw///+/f/+/Pn//Pbr//joy//s0qTl6OjoFfPXpf/679v//vz3///+/v/v7uz/MDAv/wAAAP8AAAD/EBAP/83Iv//78d7/+u7Y//jnx//z2Kf/7eLPXPb29gfq0ajK9+TC//vx4P/89ej/+/Hg//nq0P+7sqD/vLSm//ns1P/13rX/7dewx+/Zs8Xv2bO18ebTV/z8/AH8/PwB8ereOvDTofD13rT/9uG7//TZqv/q2ryN8NWl4/PYpv/w1aTw8OPMZ/z8/AH///8A////AP///wD///8A////AP///wD59vIU8eXNZfHfwYf17uI1/Pz8Af///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//8AAPn/AADgfwAAgB8AAAADAAAAAQAAAAAAAAAAAACAAAAAgAAAAIABAACAAwAAwD8AAPf/AAD//wAA//8AAA==';
  var link = document.createElement("link");
  link.type = "image/png";
  link.rel = "shortcut icon";
  link.href = sboxFavIcon;
  head.appendChild(link);
}
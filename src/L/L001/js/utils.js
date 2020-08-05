//获取url中"?"符后的字串
export function GetRequesta(urlString) { 
    var parameter  = urlString.split('?')[1].split('#')[0];
    var url = urlString.substr(parameter); 
    var theRequest = new Object();
    if (/\?/.test(url)) {
        let str = url.substr(1);
        console.log(str)
        let strs = str.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
} 
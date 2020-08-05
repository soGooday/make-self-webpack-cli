const urlBase = `//cdn.ituibei.cn/dist/welfareAT02/public/lib`
// 页面头部的公共内容
let topHtml = `
 <!DOCTYPE html>
 <html>
     <head>
         <meta charset="UTF-8">
         <meta https-equiv="X-UA-Compatible" content="IE=edge">
         <meta name="viewport"
             content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
         <meta name="apple-mobile-web-app-capable" content="yes">
         <meta name="apple-mobile-web-app-status-bar-style" content="black"> 
         <title></title> 
         <script>
             var docEl = document.documentElement,
             resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
             recalc = function () {
                 var clientWidth = docEl.clientWidth || 375;
                 clientWidth > 750 ? clientWidth = 750 : clientWidth = clientWidth;
                 if (clientWidth){
                     const fz = docEl.style.fontSize = 20 * (clientWidth / 375);
                     docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
                     window.remscale = clientWidth / 375;
                     var realfz = ~~(+window.getComputedStyle(document.getElementsByTagName("html")[0]).fontSize.replace('px','')*10000)/10000
                     if (fz !== realfz) {
                         document.getElementsByTagName("html")[0].style.cssText = 'font-size: ' + fz * (fz / realfz) +"px";
                     }
                 }
             };
             if (document.addEventListener){
                 window.addEventListener(resizeEvt, recalc, false);
                 document.addEventListener('DOMContentLoaded', recalc, false);
             }
         </script>
     </head>
     <body>
`;
// 页面底部的公共内容
const bottomHtml = `
        <script src="${urlBase}/zepto/zepto.js"></script>
        </body>
    </html>
    `;

module.exports = {
    topHtml,
    bottomHtml, 
}
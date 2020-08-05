import "./index.scss"
import {setHttp} from "./js/http"
import {GetRequesta} from "./js/utils"
import {makeImgList} from "./js/makeImgList"

class L001{
    constructor(){
        this.parameterObj = GetRequesta(window.location.search);
        console.log('当前的获取的参数:',this.parameterObj)
        this.init(this.parameterObj);
        document.title = "!!!!"
    }
    init(parameterObj){
        this.inquiryMage(parameterObj);
    }
    //向服务器请求相关的参数
    inquiryMage(parameterObj){
        setHttp("product/get", "GET", { id: parameterObj.productId },  (res)=> {
            if (res.errorUrl) {
                window.location.href = res.errorUrl;
            }  
            this.showImageList(res);
            console.log('res:', res)
        }, function (err) {
            console.log('err:', err)
        })
    }
    showImageList(res){
        makeImgList(res.headImgs,'head-img-box',true);
        makeImgList(res.headImgs,'middle-img-box',true);
        makeImgList(res.headImgs,'bottom-img-box',true);
    }

}

new L001();
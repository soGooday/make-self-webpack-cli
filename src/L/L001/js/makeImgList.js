
/**
 * 生成相关的列表
 * @param {string} stringimgUrl 图片的字符串
 * @param {string} imgdDivID div的ID
 * @param {boolean} isFirst 是否为头部图片 因为头部的第一张图片素材需要添加点击事件
 */
export function makeImgList(stringimgUrl,imgdDivID,isFirst=false) {
    // makeImg(stringimgUrl, "head-img-box")
    makeImg(stringimgUrl, imgdDivID,isFirst)
}
//对图片进行处理
function makeImg(stringimgUrl, id,isFirst) {
    if (stringimgUrl === "" || stringimgUrl === null || stringimgUrl === undefined) return;
    var fragment = document.createDocumentFragment();
    // 因为头部的第一张图片素材需要添加点击事件
    if (isFirst) {
        fragment = isAddImgFun(stringimgUrl, fragment);
    } else {
        fragment = addImg(stringimgUrl, fragment)
    }
    document.getElementById(id).appendChild(fragment);
}
//对图片进行处理
function addImg(stringimgUrl, fragment) {
    var ingArray = stringimgUrl.split(',');
    ingArray.forEach(function (imgUrl) {
        fragment.appendChild(getImgHTML(imgUrl));
    });
    return fragment;
}
//对图片进行处理
function getImgHTML(imgUrl) {
    var img = document.createElement("img");
    img.src = imgUrl;
    return img;

}
//跳转的方法 点击会进行跳转至表单地方
function isAddImgFun(stringimgUrl, fragment) {
    var ingArray = stringimgUrl.split(',');
    ingArray.forEach(function (imgUrl, index) {
        var img = getImgHTML(imgUrl);
        if (index === 0) {
            img.id = "need-jump-img-node"
        }
        fragment.appendChild(img);
    });
    return fragment;
}
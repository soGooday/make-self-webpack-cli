export var setHttp = function(url, type, parameter, BACK, ERROR) {
    var baseURL = '//47.98.242.33:18330/'
    // var baseURL = '//zjzapi.tandehao.com/'
    url = baseURL + url
    $.ajax({
        url: url,
        type: type,
        data: type === 'GET' ? parameter : JSON.stringify(parameter),//GET 与POST
        dataType: 'json',
        crossDomain: true, //强制使用5+跨域
        contentType: 'application/json',
        success: function (res) {
            if (BACK != null) {
                BACK(res);
            }
        },
        error: function (xhr, text) {
            if (xhr.status == 200) {
                if (BACK != null) {
                    BACK(text);
                }
            } else {
                if (ERROR != null) {
                    ERROR(xhr);
                    console.log('xhr:', xhr)
                }

            }
        }
    });
} 
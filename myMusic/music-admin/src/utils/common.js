// 设置cookie
export function setCookie(c_name, value, expiredays) {
    if (expiredays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expiredays);
        document.cookie = c_name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /;";
    } else {
        document.cookie = c_name + "=" + escape(value) + ";path = /;";
    }
}

// 获取cookie
export function getCookie(name) {
    var arr;
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if (document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return '';
    }
}
// 删除cookie
export function delCookie(name, domain, value = '') {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 1);
    if (name != null && domain) {
        document.cookie = name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /;domain=" + domain;
    } else {
        document.cookie = name + "=" + escape(value) + ";expires = " + exdate.toGMTString() + ";path = /;";
    }
}

// 图片转base64
export function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export const apiBaseUrl = process.env.NODE_ENV === 'production' ? '' : '/api';
export const resourceUrl = 'http://47.102.107.202:8080/';   //http://localhost:8080/  || http://47.102.107.202:8080/
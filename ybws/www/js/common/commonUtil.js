/* 
* @Author: Administrator
* @Date:   2018-05-27 16:15:03
* @Last Modified by:   Administrator
* @Last Modified time: 2018-05-27 16:15:03
*/
/**
 * [ajaxUtil 数据请求类]
 * @type {Object}
 */
var loading ;
var ajaxUtil = {
    
	/**
     * post异步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     * @param {String} beforeMsg 请求前load信息
     * @param {Object} errcallback 返回失败回调函数
     * @param {Object} cworkState 网络不可用回调函数
     */
    ajaxByAsyncPost : function(functionName, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
        log.v("发送到java端加密之前的数据：" + param);
        log.v("请求的URL地址是:"+ website.path + functionName);
        $.ajax({
            //远程Rest接口
            url : website.path + functionName,
            type : "POST",
            cache : false,
            //返回的数据类型
            dataType : "json",
			      data:param,
            // data : {
            //     "def" : param
            // },
            timeout : 60000,
            success : respFuncCallBack,
            beforeSend:function(){
                loading(beforeMsg);
            },complete:function(){
                colseLoad();
            },
            error : function(jqXHR, textStatus, errorThrown) {
                colseLoad();
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
                toastUtils.showToast('服务器异常');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },
   
    /**
     * @Author:      muchen
     * @DateTime:    2014-12-10 09:54:09
     * @Description: ajax同步返回data
     */
    ajaxBySyncPost : function(functionName, param,beforeMsg, errcallback,cworkState) {
        log.v("发送到java端加密之前的数据：" + param);
        log.v("请求的URL地址是:"+ website.path + functionName);
        var result;
        $.ajax({
            //远程Rest接口
            url : website.path + functionName,
            type : "POST",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : {
                "def" : param
            },
            timeout : 60000,
            async: false,
            success : function(data){
                colseLoad();
                result = data;
            },
            beforeSend:function(){
               loading();
            },complete:function(){
                colseLoad();
            },
            error : function(jqXHR, textStatus, errorThrown) {
                colseLoad();
              log.v(jqXHR);
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
                toastUtils.showToast('服务器异常');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
        return result;
    },

    /**
     * get异步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     */
    ajaxByAsyncGet : function(url, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
         log.v("get请求发送到java端加密之前的数据：" + param);
        $.ajax({
            //远程Rest接口
            url : website.path +  url,
            type : "GET",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : param,
            timeout : 60000,
            success : respFuncCallBack,
            beforeSend:function(){
                loading();
            },complete:function(){
                colseLoad();
            },
            error : function(jqXHR, textStatus, errorThrown) {
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
               toastUtils.showToast('服务器异常');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    },

    /**
     * get同步请求
     * @param {Object} functionName 请求方法名
     * @param {Object} param    请求参数
     * @param {Object} respFuncCallBack 返回成功回调函数
     */
    ajaxBySyncGet : function(url, param, respFuncCallBack,beforeMsg, errcallback,cworkState) {
         log.v("get请求发送到java端加密之前的数据：" + param);
        $.ajax({
            //远程Rest接口
            url :  website.path + url,
            type : "GET",
            cache : false,
            //返回的数据类型
            dataType : "json",
            data : param,
            timeout : 60000,
            async: false,
            success : respFuncCallBack,
            beforeSend:function(){
                 loading();
            },complete:function(){
               colseLoad();
            },
            error : function(jqXHR, textStatus, errorThrown) {
              log.v("错误信息======="+jqXHR.status+"===="+jqXHR.readyState+"===="+textStatus);
               toastUtils.showToast('服务器异常');
                if (null != errcallback) {
                    errcallback(jqXHR, textStatus, errorThrown);
                }
            }
        });
    }
}


/**
 * 显示进度条
 * @param {提示} beforeMsg 
 */
function loading(beforeMsg){
    if(!(undefined==beforeMsg||null==beforeMsg)){
        loading = weui.loading(beforeMsg, {
            className: 'custom-classname'
        });
     }else{
        loading = weui.loading("", {
            className: 'custom-classname'
        });
     }
}

/**
 * 关闭进度条
 */
function colseLoad(){
    loading.hide(function() {
        log.v('关闭进度条');
    });
}


/**
 * [log 日志打印]
 * @type {Object}
 */
var log = {
  v : function(message){
    if (website.isLog) {
      console.log(message);
    };
  },
  a : function(message){
    if (website.isLog) {
      alert(message);
    };
  }
}

/**
 *  json数据格式转换
 */
var jsonUtils = {

    toObject : function(value) {
        return $.parseJSON(value);
    },

    toJson : function(value) {
        return JSON.parse(value);
    },

    toString : function(value) {
        return JSON.stringify(value);
    }
}

/**
 *本地数据存取函数
 */
var localStorageUtils = {
    setParam : function(name, value) {
        store.set(name, jsonUtils.toString(value));
    },
    getParam : function(name) {
         var obj = store.get(name);
         return jsonUtils.toJson(obj);
    },
    removeParam : function(name) {
        store.remove(name);
    },
    clear : function(){
        store.clear();
    }
}

/**
 * session数据存取函数
 */

var sessionStorageUtils = {
    setParam : function(name, value) {
        store.set(name, jsonUtils.toString(value));
    },
    getParam : function(name) {
         var obj = store.get(name);
         return jsonUtils.toJson(obj);
    },
    removeParam : function(name) {
        store.remove(name);
    },
    clear : function(){
        store.clear();
    }
}





/**
 * [toastUtils 显示toast消息]
 * @type {Object}
 */
var toastUtils = {
	showToast : function(text){
    if(text == null || text == ""){
      return;
    }
     weui.toast(text, 3000);
    },
    showToast_callBack : function(text, callBackFunName){
        window.setTimeout(function () {
            eval(callBackFunName);
        },2000);
    }
}
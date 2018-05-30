/*
* @Author: Administrator
* @Date:   2018-05-28 16:49:19
* @Last Modified by:   Administrator
* @Last Modified time: 2018-05-28 16:49:19
*
*/
/**
 *网站访问地址
 */
var website = {
    path:"http://192.168.1.106:8081/yzfdemo/Query",//接口
    isLog : true,//是否打印日志
};

/**
 * [cpAPIParam 配置接口参数]
 */
var cpAPIParam = {
	/**************     一标五实接口参数配置开始      *******************/
	getUsersIndex : { // 网络请求测试
		getUrl : function(){return "";},
		title : "加载中..."
    }
    /**************     一标五实接口参数配置结束      *******************/
};

/**
 * [cpAPI 接口Api]
 */
var cpAPI = {
	/*********************     一标五实心接口开始   ************************/
	getUsersIndex : function(params,callBackFn) {//网络请求测试
		ajaxUtil.ajaxBySyncPost(
			cpAPIParam.getUsersIndex.getUrl(),
			params,
			callBackFn,
			cpAPIParam.getUsersIndex.title
		)
    }
    /*********************     一标五实心接口结束   ************************/
}

/*
 * 
 * 微慕小程序开源版
 * author: jianbo
 * organization: 微慕  www.minapper.com
 * github:    https://github.com/iamxjb/winxin-app-watch-life.net
 * 技术支持微信号：iamxjb
 * 开源协议：MIT
 *  *Copyright (c) 2017 https://www.minapper.com All rights reserved.
 * 
 */


import config from '../../utils/config.js'
var Api = require('../../utils/api.js');
var util = require('../../utils/util.js');
var auth = require('../../utils/auth.js');

var wxApi = require('../../utils/wxApi.js');
var wxRequest = require('../../utils/wxRequest.js');


Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: null,
        title: "",

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var self = this;
        //console.log(decodeURIComponent(options.url));
        console.log(options);
        if (options.url != null) {
            var url = decodeURIComponent(options.url);
            if (url.indexOf('*') != -1) {
                url = url.replace("*", "?");
            }
            self.setData({
                url: url
            });
           
        }
        else {
            self.setData({
                url: 'https://' + config.getDomain
            });
        }

    },
    onShareAppMessage: function (options) {
        var self = this;
        var url = options.webViewUrl;
        if(url.indexOf("mp.weixin.qq.com") !=-1)
        {
            url=self.data.url;
        }
        if (url.indexOf("?") != -1) {
            url = url.replace("?", "*");
        }
        url = 'pages/webpage/webpage?url=' + url;
        console.log(url);
        return {
            title: '分享"' + config.getWebsiteName + '"的文章' + self.data.title,
            path: url,
            success: function (res) {
                // 转发成功
                console.log(url);
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
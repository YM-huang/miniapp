/**
 * @brief 请求一个地址
 * @param url:要请求的地址
 * @param pdata:POST数据
 * @param success:请求成功回调
 * @param fail:请求失败回调
 * @retval None
 */
function api_request(url, pdata, success, fail)
{
  my.httpRequest({
    url: url,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
//      'User-Agent': 'HavfunClient-WeChatAPP',
      'X-Requested-With': 'XMLHttpRequest',
    },
    data: pdata == null ? {} : pdata,
    dataType: 'text',
    method: 'POST',

    success: function(res){
      if (res.data[0] == '{') {
        res.data = JSON.parse(res.data);
      }
      if(success != null)
        success(res.data, res.headers);
    },
    fail: function(){
      if(fail != null)
        fail();
    }
  })
}

var gettingVCode = false;
/**
 * @brief 下载验证码
 * @param success:请求成功回调
 * @param fail:请求失败回调
 * @retval None
 */
function _get_verifycode(success,fail)
{
  const app = getApp();
  my.downloadFile({
    url: app.globalData.ApiUrls.VerifyCodeURL + "?code=" + Math.random(),
    success: function(res)
    {
      if (success != null)
        success(res);
    },
    fail:function()
    {
      if (fail != null)
        fail();
    }
  })
}

function get_verifycode(callback) {
  if (gettingVCode)return;
  gettingVCode = true;
  _get_verifycode(function (res) {
    gettingVCode = false;
    callback(true, res.apFilePath);
  },
  function () {
    gettingVCode = false;
    callback(false, "../../imgs/loaderror.png", '网络错误');
  });
}

module.exports = {
  api_request: api_request,
  get_verifycode: get_verifycode
}

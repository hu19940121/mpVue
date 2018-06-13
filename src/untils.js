//工具函数库
import config from './config'
//请求get
export function get(url,data){
    return request(url,'GET',data)
}
//请求post
export function post(url,data){
    return request(url,'POST',data)
}


function request(url,method,data,header={}){
    return new Promise((reslove,reject)=>{        
        wx.request({
            data,
            method,
            header,
            url:config.host+url,
            success:function(res){
                if (res.data.code==0) {
                    reslove(res.data)
                }else{
                    showModal('失败',res.data.data.msg)
                    reject(res.data)
                }
            }
        })
    })
}
//成功弹窗
export function showSuccess(text){
    wx.showToast({
        title: text,
        icon: 'success',
        duration: 2000
    })
}
//失败弹窗
export function showFail(text){
    wx.showToast({
        title: text,
        icon: 'none',
        duration: 2000
    })
}
//成功模态框
export function showModal(title,content){
    wx.showModal({
        title: title,
        content:content,
        showCancel:false,
        success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
    })
}

//loading
export function showLoading(){
    wx.showLoading({
        title: '加载中',
    })
}




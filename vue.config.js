 module.exports = {
    configureWebpack:{
        devServer:{
            proxy:{
                "/maoyan":{
                    target: "http://m.maoyan.com",
                    pathRewrite: {"^/maoyan" : ""},
                    changeOrigin:true
                },
                "/api":{
                    target: "http://zhouxunwang.cn/",
                    pathRewrite: {"^/zhouxunwang" : ""},
                    changeOrigin:true
                }
                
            }    
        }
    }
} 
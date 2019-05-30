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
                    target: "http://39.97.33.178/api",
                    pathRewrite: {"^/api" : ""},
                    changeOrigin:true
                }
                
            }    
        }
    }
} 
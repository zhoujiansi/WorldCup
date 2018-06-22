const protocol = window.location.protocol + "//"
const config = {
    development:{
        domain:{
            user: 'http://event.hach.com.cn/H5_server/api',
            // partner: protocol + 'test-invest-partner.jdcf88.com',
            partner: protocol + '192.168.3.118:8081/invest-partner-api',
            helper: protocol + 'xiniu.hexun.com'
        }
    },
    test:{
        domain:{
            user: 'http://event.hach.com.cn/H5_server/api',
            // partner: protocol + 'test-invest-partner.jdcf88.com',
            partner: protocol + '192.168.3.118:8081',
            helper: protocol + 'xiniu.hexun.com'
        }
    },
    production:{
        domain:{
            user: 'http://event.hach.com.cn/H5_server/api',
            partner: protocol + 'invest-partner.jdcf88.com',
            helper: protocol + 'xiniu.hexun.com'
        }
    }
}
const env = process.env.NODE_ENV || 'production'
export default config[env]
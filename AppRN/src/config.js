export default {
    isDev: false,
    dev: {
        server: "http://10.70.14.42:8034/",
        map: "http://10.70.14.42:8034/map.html",
        updateTag: "test",
        version: "https://app.youxinpai.com/uxzhengba/ios/test/version.json",
        // 本地地址
        // footprint:'http://10.10.4.50/footprint.html',
        // position:'http://10.10.4.50/position.html',
        // rule:'http://10.10.4.45/rules.html',
        // 测试地址
        footprint:'http://10.70.14.42:8034/footprint.html',
        position: 'http://10.70.14.42:8034/position.html',
        rule:'http://10.70.14.42:8034/rules.html',
        positionTimer: 180000,
        timeInterval:8000
    },
    production: {
        server: 'https://league.youxinpai.com/',
        map: "https://league.youxinpai.com/map.html",
        footprint:'https://league.youxinpai.com/footprint.html',
        position:'https://league.youxinpai.com/position.html',
        rule:'https://league.youxinpai.com/rules.html',
        updateTag: "production",
        version: "https://app.youxinpai.com/uxzhengba/ios/production/version.json",
        positionTimer: 900000,
        timeInterval:8000
    },
}

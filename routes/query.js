var http = require('http');
var zlib = require('zlib');

var Query =  function(zkzh, xm){
    this.querystring = '?zkzh=' + zkzh + '&xm=' + xm;

    this.options = {
        url: 'www.chsi.com.cn',
        encoding: null,
        host: 'www.chsi.com.cn',
        path: '/cet/query' + this.querystring,
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, sdch',
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Connection': 'keep-alive',
            'Cookie': 'JSESSIONID=8D79F004CB79FC5352F123F76CF4D853; __utmt=1; __utma=65168252.1576213452.1471513579.1471575867.1471575870.3; __utmb=65168252.5.10.1471575870; __utmc=65168252; __utmz=65168252.1471575870.3.3.utmcsr=baidu|utmccn=(organic)|utmcmd=organic|utmctr=%E5%AD%A6%E4%BF%A1%E7%BD%91',
            'Host': 'www.chsi.com.cn',
            'Referer': 'http://www.chsi.com.cn/cet/',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
        }
    }
};

Query.prototype.sendRequest = function(){
    var self = this;
    // console.log(this.querystring);
    return new Promise(function(resolve, reject){
            var req = http.request(self.options, function(res){
            var gunzip = zlib.createGunzip();
            res.pipe(gunzip);
            var data = '';
            res.setEncoding('binary');
            gunzip.on('data', function(chunk){                
                data += chunk;
            }).on('end', function(res){
                resolve(data);
            });
        });

        req.on('error', function(err){
            reject(err);
        });

        req.end();
    });
};

module.exports = Query;
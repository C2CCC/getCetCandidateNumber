var http = require('http');
var querystring = require('querystring');
var zlib = require('zlib');

var Query =  function(zkzh, xm){
    this.querystring = querystring.stringify({
        zkzh: zkzh,
        xm: xm
    });

    this.options = {
        url: 'www.chsi.com.cn',
        encoding: null,
        host: 'www.chsi.com.cn',
        path: '/cet/query?' + this.querystring,
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
    return new Promise(function(resolve, reject){
            var req = http.request(self.options, function(res){
            var gunzip = zlib.createGunzip();
            res.pipe(gunzip);
            var data = '';
            gunzip.on('data', function(chunk){                
                data += chunk;
            }).on('end', function(res){
                var result = Query.prototype.handleHtml(data);
                resolve(result);
            });
        });

        req.on('error', function(err){
            reject(err);
        });

        req.end();
    });
};

Query.prototype.handleHtml = function(htmlstring){
    var result = {};
    var resultProperty = ['name', 'school', 'type', 'number', 'time', 'score'];
    htmlstring = htmlstring.replace(/[\r\n\s]/g, '');
    var tableReg = new RegExp('<tableborder="0"align="center"cellpadding="0"cellspacing="6"class="cetTable">.*</table>', 'g'),
        trReg = new RegExp('<tr>.*?</tr>', 'g'),
        scoreReg = new RegExp('\d+', 'g');
    var tableArr = htmlstring.match(tableReg);
    var table, trArr, item, i, scoreArr;
    if(tableArr == null){
        result.success = false;
        result.name = '未找到对应分数';
    } else {
        result.success = true;
        table = tableArr[0];
        trArr = table.match(trReg);
        for(i = 0; i < 6; i++){
            item = trArr[i].replace(/<.*?>/g,'');
            result[resultProperty[i]] = item;
        }
    }
    return result;
};

module.exports = Query;
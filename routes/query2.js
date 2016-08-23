var request = require('request');
var querystring = require('querystring');
var zlib = require('zlib');
var iconv = require('iconv-lite');

var Query =  function(zkzh, xm){
    this.content = {
        id: zkzh,
        name: iconv.encode(xm, 'gbk')
    };

    this.options = {
        uri: 'https://cet.99sushe.com/getscore' + zkzh,
        url: 'https://cet.99sushe.com/getscore' + zkzh,
        // encoding: null,
        // host: 'cet.99sushe.com',
        // path: '/getscore' + zkzh,
        method: 'POST',
        // encoding: 'GBK',
        form: this.content,
        jar: true,
        headers: {
            // ':authority': 'cet.99sushe.com',
            // ':method': 'POST',
            // ':path': '/getscore' + zkzh,
            // ':scheme': 'https',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'accept-encoding': 'gzip, deflate, br',
            'accept-language': 'zh-CN,zh;q=0.8',
            'cache-control': 'max-age=0',
            'content-length': '36',
            'content-type': 'application/x-www-form-urlencoded',
            // 'cookie': 'score=; CNZZDATA30023677=cnzz_eid%3D690716702-1471511380-null%26ntime%3D1471846407; id=' + zkzh,
            'origin': 'https://cet.99sushe.com',
            'referer': 'https://cet.99sushe.com/',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
        }
    }
};

Query.prototype.sendRequest = function(){
    var self = this;
    return new Promise(function(resolve, reject){
            request(self.options, function(err, res, body){
                console.log(res);
                console.log(body);
            // var gunzip = zlib.createGunzip();
            // res.pipe(gunzip);
            // var data = '';
            // res.on('data', function(chunk){
            //     data += chunk;
            // }).on('end', function(res){console.log(data);
            //     var result = Query.prototype.handleHtml(data);
            //     resolve(result);
            // });
        });

        // req.on('error', function(err){
        //     reject(err);
        // });
        // // req.write(self.content);
        // req.end();
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
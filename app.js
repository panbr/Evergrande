
var express = require("express");
var superagent = require("superagent");
var cheerio = require("cheerio");

var baseUrl = "http://www.gzevergrandefc.com";

var app = express();

/**
 * 赛程表
 */
app.get("/matchlist", function(req, res, next) {
    var year = req.query.year;
    var matchlistUrl = baseUrl + '/data/matchlist/208_' + year + '.html';
    superagent.get(matchlistUrl)
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
            // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
            var $ = cheerio.load(sres.text);
            var items = {
                year: null,
                matchlist: []
            };
            items.year = $("#head").text();
            $('table tr').each(function (idx, element) {
                var $element = $(element);
                var tds = $element.find("td");
                items.matchlist.push({
                    turn      : tds.eq(0).text().trim(),
                    date      : tds.eq(1).text().trim(),
                    tee_time  : tds.eq(2).text().trim(),
                    host_team : tds.eq(3).text().trim(),
                    score     : tds.eq(4).text().trim(),
                    guest_team: tds.eq(5).text().trim(),
                    field     : tds.eq(6).text().trim(),
                    sumary    : tds.eq(7).text().trim()
                })
            })

            res.send(items);
        })
})

/**
 * 赛事预告
 */
app.get("/advance", function(req, res, next) {
    var advancetUrl = baseUrl + '/default.aspx';
    superagent.get(advancetUrl)
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = {
                meta: {
                    time: $(".saishi_bottom").text().trim().split(' ')[0],
                    field: $(".saishi_bottom").text().trim().split(' ')[1],
                    live: $(".saishi_bottom").text().trim().split(' ')[2]
                },
                match: []
            };
            $('.saishi_top ul li').each(function (idx, element) {
                var $element = $(element);
                items.match.push({
                    team: $element.find('a').text().trim(),
                    img: baseUrl + '/' + $element.find('img').attr('src')
                })
            })

            res.send(items);
        })
})

/**
 * 新闻列表
 */
app.get('/newsList', function(req, res, next) {
    var newsListUrl = baseUrl + '/news.aspx?fid=110';
    superagent.get(newsListUrl)
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = {
                newsList: []
            };
            $('.Nlist ul li').each(function (idx, element) {
                var $element = $(element);
                items.newsList.push({
                    time: $element.find('span').text().trim(),
                    newsUrl: $element.find('a').attr('href').trim(),
                    newsId: $element.find('a').attr('href').split('ftid=')[1],
                    title: $element.find('a').text().trim()
                })
            })

            res.send(items);
        })
})

/**
 * 新闻详情
 */
app.get('/newsDetail', function(req, res, next) {
    var id = req.query.id;
    var newsDetailUrl = baseUrl + '/news.aspx?fid=110' + '&ftid=' + id;
    superagent.get(newsDetailUrl)
        .end(function(err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = {
                title: '',
                meta: '',
                content: ''
            };
            items.title = $(".Newstile>ul>span").text().trim();
            items.meta = $(".Newstile>ul>a").text().trim();
            items.content = $(".NewsCont").html();

            res.send(items);
        })
})

app.listen(3100, function(req, res) {
    console.log("app is running at http://localhost:3100");
})
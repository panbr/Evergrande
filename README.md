## Evergrande

广州恒大足球队赛事信息接口（非官方）

> 赛程表

```
127.0.0.1:3100/matchlist?year=Number
```

输出示例：
```
{
    "year": "2016赛季",
    "matchlist": [
        {
            "turn": "轮次",
            "date": "日期",
            "tee_time": "开球时间",
            "host_team": "主队",
            "score": "比分",
            "guest_team": "客队",
            "field": "场地",
            "sumary": "战报"
        },
        {
            "turn": "第1轮",
            "date": "2016年03月06日",
            "tee_time": "15:30",
            "host_team": "重庆力帆",
            "score": "21",
            "guest_team": "广州恒大淘宝",
            "field": "重庆奥体中心",
            "sumary": "战报"
        }
    ]
}
```


> 赛事预告

```
127.0.0.1:3100/advance
```

输出示例：
```
{
    "meta": {
        "time": "比赛时间：2017年02月22日20:00",
        "field": "地点：天河体育中心",
        "live": "直播：CCTV5"
    },
    "match": [
        {
            "team": "亚冠联赛",
            "img": "http://www.gzevergrandefc.com/UploadFile\\2013-02\\dfa6c482-f0f8-403d-a5f5-36c1bd071982.png"
        },
        {
            "team": "广州恒大淘宝",
            "img": "http://www.gzevergrandefc.com/UploadFile\\2015-10\\c08a2887-0abf-4dc3-9b9f-b24776dbf215.png"
        },
        {
            "team": "香港东方",
            "img": "http://www.gzevergrandefc.com/UploadFile\\2017-01\\95aff243-7c48-418d-86e3-359aac803835.png"
        }
    ]
}
```


未完待续。。。
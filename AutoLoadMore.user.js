// ==UserScript==
// @name auto load more
// @description auto load more !自动点击加载更多的按钮!
// @version 1.0.5
// @grant none
// @include *
// @author       legalthan.com
// @homepage https://github.com/GoldenAscending/auto-load-more
// @namespace  https://greasyfork.org/zh-CN/scripts/29328-auto-load-more
// @updateURL  https://greasyfork.org/scripts/29328-auto-load-more/code/auto%20load%20more.user.js
// @copyright  反馈和建议(feedback)E-mail: nolazyload@foxmail.com
// ==/UserScript==

let alm_time_interval = 500; //运行间隔(毫秒)
let alm_lo; //当前网址 *html5的历史前进后退功能导致页面载入不刷新,例如Y2B,要不断检测页面对应的按钮
let alm_dis = 4000; //load_more按钮距离底边距离像素




let alm_sites = [
    {
    "urls":[
        /https?:\/\/www.youtube.com\/user\/.+/gi,
        /https?:\/\/www.youtube.com\/channel\/.+/gi],
    "btns":[{
    "id":".load-more-text",
    "distance":0}]
    }, //youtube_user_page
    {
    "urls":[
        /https?:\/\/www.youtube.com\/watch\?.+/gi,
        /https?:\/\/www.youtube.com\/watch2\?.+/gi],
    "btns":[{
    "id":"[data-uix-load-more-target-id=comment-section-renderer-items]",
    "distance":0},
    {
    "id":"#watch-more-related-button",
    "distance":0}]
    }, //youtube_watch_page
    {
    "urls":[
        /https?:\/\/www.zhihu.com\/question\/.+/gi,
        /https?:\/\/www.zhihu.com\/people\/.+/gi,
        /https?:\/\/www.zhihu.com\/search\?.+/gi],
    "btns":[{
    "id":"[aria-role=button]",
    "distance":0}]
    }, //zhihu_question
    {
    "urls":[
        /https?:\/\/www.instagram.com\/?.+/gi],
    "btns":[{
    "id":"a._1cr2e._epyes",
    "distance":0}]
    },
    {
    "urls":[
        /https?:\/\/media.weibo.cn\/article\?.+/gi],
    "btns":[{
    "id":"div.f-art-opt a",
    "distance":0}]
    },
    
    {
        "urls":[ //地址正则
            /https?:\/\/www.youtube.com\/channel777\/.+/gi,
            /https?:\/\/www.youtube.com\/channel999\/.+/gi],
        "btns":[{ //加载更多按钮,可以有多个
        "id":"bt3", //CSS选择器
        "distance":0},
        {
        "id":"bt4",
        "distance":0}]
    } // example 示例
];


let alm_autotimer = setInterval(alm_auto,alm_time_interval);

function alm_check_domain(dm){

   let d = dm;
    for ( let x in alm_sites )
    {
        for ( let u in alm_sites[x].urls )
        {
            if(alm_sites[x].urls[u].test(d))
            {
                //console.log('true111');
                return true;
            }
        }

    }
    //console.log('false222');
    return false;
}

function alm_auto()
{
    try
    {
        alm_lo = document.location; //当前网址
        for (let  x in alm_sites )
        {
            for (let  u in alm_sites[x].urls )
            {
                if(alm_sites[x].urls[u].test(alm_lo))
                {
                    //console.log("bbb");
                    for (let  b in alm_sites[x].btns )
                    {
                        try
                        {
                            //console.log(alm_sites[x].btns[b].distance+"|"+lo+"|"+alm_sites[x].urls[u])
                            //console.log(alm_sites[x].btns[b].id)
                            let alm_bts = document.querySelector(alm_sites[x].btns[b].id);
                            if(alm_bts)
                            {
                                //console.log("|"+alm_sites[x].btns[b].id);
                                
                                if(alm_tob(alm_bts)<alm_dis && alm_bts.getBoundingClientRect().top != alm_sites[x].btns[b].distance )
                                {
                                    alm_sites[x].btns[b].distance = alm_bts.getBoundingClientRect().top;
                                    alm_bts.click();
                                    console.log("auto_click_load_more_1_times");
                                }
                            }
                        }catch(e){console.log(e)}
                    }
                }
            }

        }
    }catch(e)
    {
        console.log("error"+e);
    }
}

function alm_tob(x) //返回元素上边到浏览器窗口底边距离,正值表示元素上边在浏览器底边以下的距离,负值表示元素在浏览器底边以上
{
    let bh = document.documentElement.clientHeight;//浏览器可视高
    let ett = x.getBoundingClientRect().top;//元素距离浏览器上边高
    return ett - bh;
}
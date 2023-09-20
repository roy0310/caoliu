const puppeteer = require('puppeteer');
const cheerio = require('cheerio')

let config = {
    headless: false,
    defaultViewport: null,
    slowMo: 6,
    args: [
        "--window-size=1920,960",
        "--disable-blink-features=AutomationControlled",
        "--lang=zh-CN",
    ],
};


function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}


function logId(id) {

}

//使用async/await处理异步
(async () => {
    //创建一个Browser（浏览器）实例
    let browser = await puppeteer.launch(config);
    //在浏览器中创建一个新的页面
    let page = await browser.newPage();

    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 Core/1.94.175.400 QQBrowser/11.1.5155.400');

    //设置页面的尺寸
    // await page.setViewport({
    //     width: 1360,
    //     height: 960,
    // });


    let url= 'https://t66y.com/htm_data/2309/7/5955199.html';

    // console.log(1);
    await page.goto(url);
// console.log(2);
    const html = await page.content();
    // return console.log(html);

    // #main > div:nth-child(6) > table > tbody > tr.tr1.do_not_catch > th:nth-child(2) > table > tbody > tr > td:nth-child(1)
    let id = '#main > div:nth-child(6) > table > tbody > tr.tr1.do_not_catch > th:nth-child(2) > table > tbody > tr > td:nth-child(1) > div.tpc_content.do_not_catch'
    id = 'div.do_not_catch'

    // const res = await page.$$(id);
    let div = await page.$$eval(id, div => {
        return div.map(e => e.outerHTML);
    });

    for (let i=0; i<div.length; i++) {
        console.log('第'+(i+1)+'条评论：')
        console.log(div);
    }

    // console.log('第一条评论（二级评论）：')
    //
    // id = '#comm100689302'
    // div = await page.$eval(id, e => e.outerHTML);
    // // await div.con
    // console.log(div);
    //
    // console.log('第二条评论：')
    // id = '#main > div:nth-child(8) > table > tbody > tr.tr1.do_not_catch > th:nth-child(2) > table > tbody > tr > td > div.tpc_content.do_not_catch';
    // div = await page.$eval(id, e => e.outerHTML);
    // console.log(div);

})();

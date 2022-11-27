import axios from "axios"
import { CreatData } from "./result.js"
import puppeteer from 'puppeteer';
async function asdaBeers() {
    const browser = await puppeteer.launch({ headless: true, ignoreDefaultArgs: ['--disable-extensions'], args: ['--no-sandbox',] });
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
    page.setDefaultNavigationTimeout(0)
    // await page.setRequestInterception(true)
    await page.goto('https://groceries.asda.com/product/ale/st-austell-brewery-proper-job-cornish-ipa/910001696166');

    await page.waitForSelector("#onetrust-accept-btn-handler", { delay: 3000 })
    await page.click("#onetrust-accept-btn-handler")

    let prmotion = []
    try {
        await page.waitForSelector('.product-detail-page__linksave-sticker', { delay: 10000 })
        await page.screenshot({ path: './image.png', type: 'png' })
        const prmotionHTML = await page.$eval('.link-save-banner-large__meat-sticker', el => el.outerHTML);
        const re = /\d/g;
        let e
        while ((e = re.exec(prmotionHTML)) != null) {
            prmotion.push(e[0])
        }
        console.log(prmotion)
    } catch (error) {
        console.log(error)
    }


    await page.waitForSelector('.pdp-main-details__price')
    const searchValue = await page.$eval('.pdp-main-details__price', el => el.innerHTML);
    const re = /\/span>(.*)/i;
    const str = re.exec(searchValue);
    let _currentPrice = str[1]
    _currentPrice = _currentPrice.replace("£", "")
    let _totolNum = prmotion[0]
    let _purchesedNum = prmotion[1]
    let _realPrice = parseFloat(_currentPrice) * _purchesedNum / _totolNum
    console.log(_currentPrice)
    console.log(_realPrice)

    await browser.close();
    let _data = CreatData()
    _data.Shop = "ASDA"
    _data.IsPriceDiscounted = true
    _data.ProductPrice = _currentPrice + `${_totolNum} for ${_purchesedNum} [${_realPrice}]`
    _data.DefaultListPrice = "1.59"
}
export { asdaBeers }
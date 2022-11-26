import axios from "axios"
import { CreatData } from "./result.js"
import puppeteer from 'puppeteer';
async function aldiBeers() {


    var config = {
        method: 'get',
        url: 'https://groceries.aldi.co.uk/en-GB/p-proper-job-cornish-ipa-500ml/5028403155146',
        headers: {
            "Cookie": ""
        }
    };

    const browser = await puppeteer.launch({ headless: true, ignoreDefaultArgs: ['--disable-extensions'], args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
    page.setDefaultNavigationTimeout(0)
    await page.goto('https://groceries.aldi.co.uk/en-GB/')
    await page.goto('https://groceries.aldi.co.uk/en-GB/p-proper-job-cornish-ipa-500ml/5028403155146', { timeout: 0, waitUntil: 'load', });
    try {
        await page.waitForSelector('#onetrust-accept-btn-handler')
        await page.click('#onetrust-accept-btn-handler', { delay: 3000 })
    } catch (error) {
        console.log(error)
    }


    await page.waitForSelector('.product-price')
    const searchValue = await page.$eval('.product-price', el => el.outerHTML);

    const re = /\-bold\">(.*)<\/span/i;
    const str = re.exec(searchValue);
    let _currentPrice = str[1]

    console.log(_currentPrice)
    await browser.close();
    let _data = CreatData()
    _data.IsPriceDiscounted = false
    _data.ListPrice = _currentPrice
    _data.DefaultListPrice = "£1.59"
    return _data;
}

export { aldiBeers }
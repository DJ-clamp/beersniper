import axios from "axios"
import { CreatData } from "./result.js"
import puppeteer from 'puppeteer';
async function aldiBeers() {
    const browser = await puppeteer.launch({ headless: true, ignoreDefaultArgs: ['--disable-extensions'], args: ['--no-sandbox',] });
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36")
    page.setDefaultNavigationTimeout(0)
    // await page.setRequestInterception(true) //must be have proxy
    await page.goto('https://groceries.aldi.co.uk/en-GB/')
    await page.goto('https://groceries.aldi.co.uk/en-GB/p-proper-job-cornish-ipa-500ml/5028403155146');
    let resolve;
    page.on('response', async response => {
        if (resolve && response.url() === 'https://groceries.aldi.co.uk/api/product/calculatePrices') {
            resolve(await response.json());
        }
    });
    var promise = new Promise(x => resolve = x);
    var output = await promise;
    console.log(output);
    // try {
    //     await page.waitForSelector('#onetrust-accept-btn-handler', { delay: 30000 })
    //     await page.click('#onetrust-accept-btn-handler', { delay: 30000 })
    // } catch (error) {
    //     console.log(error)
    // }


    // await page.waitForSelector('.product-price', { delay: 30000 })
    // const searchValue = await page.$eval('.product-price', el => el.outerHTML);

    // const re = /\-bold\">(.*)<\/span/i;
    // const str = re.exec(searchValue);
    // let _currentPrice = str[1]

    // console.log(_currentPrice)
    await browser.close();
    let _data = CreatData()
    _data.IsPriceDiscounted = output.ProductPrices[0].IsPriceDiscounted
    _data.ProductPrice = output.ProductPrices[0].ListPrice
    _data.ListPrice = output.ProductPrices[0].ListPrice
    _data.DefaultListPrice = output.ProductPrices[0].DefaultListPrice
    return _data;
}

export { aldiBeers }
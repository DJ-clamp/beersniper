import axios from "axios"
import { CreatData } from "./result.js"
async function aldiBeers() {


    var config = {
        method: 'get',
        url: 'https://groceries.aldi.co.uk/en-GB/p-proper-job-cornish-ipa-500ml/5028403155146',
        headers: {
        }
    };

    let cookie;
    try {
        await axios(config)

    } catch (error) {
        cookie = error.response.headers['set-cookie'];
    }


    // aldi params
    // ProductPrices -> IsPriceDiscounted DefaultListPrice ListPrice
    var data = JSON.stringify({
        "products": [
            "5028403155146"
        ]
    });
    var config = {
        method: 'post',
        baseURL: "",
        url: 'https://groceries.aldi.co.uk/api/product/calculatePrices',
        headers: {
            'referer': 'https://groceries.aldi.co.uk/en-GB/p-proper-job-cornish-ipa-500ml/5028403155146',
            'origin': 'https://groceries.aldi.co.uk',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'accept-language': 'en-GB',
            'Content-Type': 'application/json',
            'Cookie': cookie,
        },
        data: data
    };
    let _tmpResult
    try {
        _tmpResult = await axios(config)
    }
    catch (error) {
        // console.log(error);
    };
    let _data = CreatData()
    _data.IsPriceDiscounted = _tmpResult.data.ProductPrices[0].IsPriceDiscounted
    _data.ListPrice = _tmpResult.data.ProductPrices[0].ListPrice
    _data.DefaultListPrice = _tmpResult.data.ProductPrices[0].DefaultListPrice
    return _data;
}

export { aldiBeers }
import fetch from 'node-fetch';
import { CreatData } from "./result.js"
async function tescoBeers() {
    var requestOptions = {
        method: 'GET',
        headers: {
            'User-Agent': 'text/html',
            'Accept-language': 'en',
        },
        redirect: 'follow'
    };
    let _tmpResult;
    try {
        let data = await fetch("https://www.tesco.com/groceries/en-GB/products/264792757", requestOptions)
        let html = await data.text()
        const re = /ld\+json\"\>(.*)<\/script/i;
        const str = re.exec(html);
        let _tmpJson = JSON.parse(str[1])
        _tmpJson.forEach(e => {
            if (e.name != undefined && e.name.indexOf("Proper Job") > -1) {
                _tmpResult = e
                return e
            }
        });
        let _data = CreatData()
        _data.DefaultListPrice = _tmpResult.offers.price
        _data.ProductPrice = _tmpResult.offers.price
        _data.Shop = "Tesco"
        return _data
    } catch (error) {
        console.log('error', error)
    }
}

export { tescoBeers }
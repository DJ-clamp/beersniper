import { aldiBeers } from "./aldi.js";
import { tescoBeers } from "./tesco.js";
import { asdaBeers } from './asda.js';
import fs from 'fs'
import { exit } from "process";
let result = []

const shop = {
    aldi: "aldi",
    tesco: "tesco",
    asda: "asda",
    merge: "merge"
}

let price1
let price2
let price3
let param = getParams()

if (param == shop.aldi) {
    price1 = await aldiBeers() //ALDI needs to use proxy then can be connected
    storeData(price1, "./aldi.json")
    result.push(price1)
    exit(0)
} else {
    price1 = JSON.parse(fs.readFileSync("./aldi.json", "utf8"))
    result.push(price1)
}

price2 = await tescoBeers()
result.push(price2)

price3 = await asdaBeers()
result.push(price3)
console.log(result)

const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

storeData(result, "./data.json")


function getParams() {
    let args = process.argv;

    return args[2]
}
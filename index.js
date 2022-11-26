import axios from "axios";
import { aldiBeers } from "./aldi.js";
import { tescoBeers } from "./tesco.js";
import fs from 'fs'
let result = []

let price1 = await aldiBeers()
result.push(price1)
let price2 = await tescoBeers()
result.push(price2)
console.log(result)
const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

storeData(result, "./data.json")
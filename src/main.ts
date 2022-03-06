import {readFileSync, writeFileSync} from 'fs';
const puppeteer = require('puppeteer');
const phone = puppeteer.devices['iPhone X'];

function addStr(str: string, index: number, stringToAdd: any){
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

let file = readFileSync('html/boilerplate.html', 'utf-8');

console.log(file.length)
let date1: string = "testifdasadsng testing"
let date2: string = "remofdsafadsved"

let dateOneLength: number = date1.length

file = (addStr(file, 93462, date1));
file = (addStr(file, 93537 + dateOneLength, date2));

writeFileSync('html/index.html', file)



puppeteer.launch({headless:true}).then(async (browser: { newPage: () => any; close: () => any; }) => {
    const page = await browser.newPage();
    await page.emulate(phone);
    await page.goto('http://localhost:63342/covid-screening/html/index.html?_ijt=673a5gp7sr6johd04p5uljun3o&_ij_reload=RELOAD_ON_SAVE');
    await page.screenshot({ path: 'screenshots/screenshot.png'});
    // await browser.close();
});
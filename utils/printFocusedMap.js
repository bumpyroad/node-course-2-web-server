const puppeteer = require('puppeteer');
const uuidv1 = require('uuid/v1');

const printFocusedMap = (address, callback) => {
    
    let imgName = uuidv1() + '.png';
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.google.com');
        await page.screenshot({path: './img/' +  imgName});      
        await browser.close();
        callback(undefined, imgName);
      })();
      //callback(undefined, 'printing is under way');
      console.log('I am working on it.');
}    

module.exports = printFocusedMap;
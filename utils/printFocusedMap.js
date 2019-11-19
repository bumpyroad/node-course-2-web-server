const puppeteer = require('puppeteer');
const uuidv1 = require('uuid/v1');

const printFocusedMap = (requestQueryObject, relLocation, callback) => {

    let imgName = uuidv1() + '.png';
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto(relLocation + '/focusmap' + '?d=' + requestQueryObject, {"waitUntil":"networkidle0"});
      await page.screenshot({path: './img/' +  imgName});
      await browser.close();
      callback(undefined, imgName);
      })();
}    

module.exports = printFocusedMap;
const puppeteer = require('puppeteer');
const uuidv1 = require('uuid/v1');

const printFocusedMap = (requestQueryObject, relLocation, callback) => {

    let imgName = uuidv1() + '.png';
    imgName = './img/' +  imgName;
    try {
      doScreenCapture(relLocation + '/focusmap' + '?d=' + requestQueryObject, imgName);
    } catch(e){
      console.log(`error doing screen capture`, e);
    }
    callback(undefined, imgName);
} 

async function doScreenCapture(url, imageName){
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url, {"waitUntil":"networkidle0"});
  await page.screenshot({path: imageName})
  .then((result) => { console.log('Screen captured'); })
  .catch((e => { console.error(`That was a fail`, e); }));;
  await browser.close(); 
}

module.exports = printFocusedMap;
const puppeteer = require('puppeteer');

async function doScreenCapture(url, imageName, callback){

    var imgPathAndName = './img/' +  imageName;
    var captureWidth = 640;
    var captureHeight = 800;
    var captureCornerX = 0;
    var captureCornerY = 0;

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    if(url.includes('barcode')){
        captureWidth = 300;
        captureHeight = 45;
        captureCornerX = 10;
        captureCornerY = 10;
    }
    await page.setViewport({
        width: captureWidth,
        height: captureHeight
    });
    await page.goto(url,{"waitUntil":"networkidle0"});
    let shotResult = await page.screenshot({
        path: imgPathAndName,
        clip: {
            x: captureCornerX,
            y: captureCornerY,
            width: captureWidth,
            height: captureHeight
          }
    })
      .then((result) => { 
        console.log('Screen captured');
        return result; 
      }).catch((e => { 
        console.error(`That was a fail`, e);
        return false; 
      }));;  
    
    //if(shotResult){
    //  return sfPostPromise(shotResult, null);    
    //} else {
    //  return null;
    //}
  
    await browser.close();
    if(shotResult){ callback(undefined, imageName); }
    else{ callback('nope', undefined); }
  }

  module.exports = doScreenCapture;
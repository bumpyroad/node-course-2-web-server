const puppeteer = require('puppeteer');
const uuidv1 = require('uuid/v1');

const printFocusedMap = (requestQueryObject, relLocation, callback) => {

    var imgName = uuidv1() + '.png';
    try {
      doScreenCapture(relLocation + '/focusmap' + '?d=' + requestQueryObject, imgName, callback);
    } catch(e){
      console.log(`error doing screen capture`, e);
    }
} 

async function doScreenCapture(url, imageName, callback){

  var imgPathAndName = './img/' +  imageName;
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(url,{"waitUntil":"networkidle0"});
  let shotResult = await page.screenshot({path: imgPathAndName})
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

module.exports = printFocusedMap;
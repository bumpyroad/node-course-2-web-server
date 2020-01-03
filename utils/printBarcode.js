const doScreenCapture = require('./doScreenCapture');
const uuidv1 = require('uuid/v1');

const printBarcode = (requestQueryObject, relLocation, callback) => {

    var imgName = uuidv1() + '.png';
    try {
      doScreenCapture(relLocation + '/barcode' + '?d=' + requestQueryObject, imgName, callback);
    } catch(e){
      console.log(`error doing screen capture`, e);
    }
}

module.exports = printBarcode;
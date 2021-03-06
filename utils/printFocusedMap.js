const doScreenCapture = require('./doScreenCapture');
const uuidv1 = require('uuid/v1');

const printFocusedMap = (requestQueryObject, relLocation, callback) => {

    var imgName = uuidv1() + '.png';
    try {
      doScreenCapture(relLocation + '/focusmap' + '?d=' + requestQueryObject, imgName, callback);
    } catch(e){
      console.log(`error doing screen capture`, e);
    }
}

module.exports = printFocusedMap;
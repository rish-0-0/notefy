const RNFS = require('react-native-fs');

function writeToFile(filename, data, successCallback, errorCallback) {
  RNFS.writeFile(
    RNFS.DocumentDirectoryPath + '/Notefy/' + filename + '.notefy.json',
    data,
    'utf8',
  )
    .then((success) => {
      successCallback(success);
    })
    .catch((e) => {
      console.log(e);
      errorCallback(e);
    });
}

export default writeToFile;

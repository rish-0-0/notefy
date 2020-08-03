const RNFS = require('react-native-fs');

function writeToFile(filename, data, successCallback, errorCallback) {
  console.log(filename);
  console.log(RNFS.DocumentDirectoryPath, RNFS.ExternalStorageDirectoryPath);
  RNFS.writeFile(
    RNFS.DocumentDirectoryPath + '/' + filename + '.notefy.json',
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

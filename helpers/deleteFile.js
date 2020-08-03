const RNFS = require('react-native-fs');

function getOrifiginalFilePath(header) {
  return (
    RNFS.DocumentDirectoryPath +
    '/Notefy/' +
    header.split(' ').join('_') +
    '.notefy.json'
  );
}

function deleteFile(path, actual, successCallback, errorCallback) {
  if (actual) {
    RNFS.unlink(RNFS.DocumentDirectoryPath + '/Notefy/' + path + '.notefy.json')
      .then(() => {
        successCallback();
      })
      .catch((e) => {
        errorCallback(e);
      });
  } else {
    RNFS.unlink(getOrifiginalFilePath(path))
      .then(() => {
        successCallback();
      })
      .catch((e) => {
        errorCallback(e);
      });
  }
}

export default deleteFile;

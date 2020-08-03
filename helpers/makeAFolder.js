const RNFS = require('react-native-fs');

function makeAFolder(folderName, successCallback, errorCallback) {
  RNFS.readdir(RNFS.DocumentDirectoryPath)
    .then((result) => {
      console.log(result);
      if (result.indexOf(folderName)) {
        return Promise.reject(new Error('Folder already exists'));
      }
      return RNFS.mkdir(RNFS.DocumentDirectoryPath + '/' + folderName);
    })
    .then((succ) => {
      successCallback(succ);
    })
    .catch((error) => {
      errorCallback(error);
    });
}

export default makeAFolder;

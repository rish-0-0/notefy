const RNFS = require('react-native-fs');

function getFiles(dirName, successCallback, errCallback) {
  RNFS.readDir(RNFS.DocumentDirectoryPath + '/' + dirName)
    .then((result) => {
      console.log(result);
      return Promise.resolve(
        result
          .filter((item) => item.isFile())
          .sort((a, b) => b.mtime.getTime() - a.mtime.getTime()),
      );
    })
    .then(async (arr) => {
      try {
        const stuff = [];
        for await (var ele of arr) {
          console.log(ele);
          const content = await RNFS.readFile(ele.path);
          console.log(content, JSON.parse(content));
          stuff.push(JSON.parse(content));
        }
        successCallback(stuff);
      } catch (e) {
        return Promise.reject(
          new Error('Some error ocurred' + e.message + 'code: ' + e.code),
        );
      }
    })
    .catch((e) => {
      console.log(e);
      errCallback(e);
    });
}

export default getFiles;

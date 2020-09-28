const fs = require("fs");
const path = require("path");
const dataPath = path.resolve(__dirname, "../data");
const jsonPath = path.resolve(__dirname, "../json");
const date = fs.readdirSync(dataPath);
for (let d of date) {
  const newFile = d + ".json";
  let obj = {};
  const cvsFiles = fs.readdirSync(path.resolve(dataPath, d));
  obj.date = d;
  for (let cvsFile of cvsFiles) {
    const dataBuffer = fs.readFileSync(path.resolve(dataPath, d, cvsFile));
    const data = dataBuffer.toString().split("\n");
    for (let i = 1; i < data.length; i++) {
      if (data[i]) {
        let [word, translate] = data[i].split(",");
        if (!obj[cvsFile.split(".")[0]]) {
          obj[cvsFile.split(".")[0]] = [];
        }
        obj[cvsFile.split(".")[0]].push({ word, translate });
      }
    }
  }
  fs.writeFileSync(path.join(jsonPath, newFile), JSON.stringify(obj));
}

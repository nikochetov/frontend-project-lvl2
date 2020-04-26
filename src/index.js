import fs from "fs";
// import path from "path";

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFileData = fs.readFileSync(pathToFirstFile, 'UTF-8');
  const secondFileData = fs.readFileSync(pathToSecondFile, 'UTF-8');
  const firstFileDataToObj = JSON.parse(firstFileData);
  const secondFileDataToObj = JSON.parse(secondFileData);
  const firstFileKeys = Object.keys(firstFileDataToObj);
  const secondFileKeys = Object.keys(secondFileDataToObj);
  const deletedData = firstFileKeys
    .filter(item => !secondFileKeys.includes(item))
    .reduce((acc, current) => {
      acc.push([`  - ${current}: ${firstFileDataToObj[current]}`]);
      return acc;
    }, []);
  const addedData = secondFileKeys
    .filter(item => !firstFileKeys.includes(item))
    .reduce((acc, current) => {
      acc.push([`  + ${current}: ${secondFileDataToObj[current]}`]);
      return acc;
    }, []);
  const reduced = firstFileKeys.reduce((acc, current) => {
    if (firstFileDataToObj[current] === secondFileDataToObj[current]) {
      acc.push([`    ${current}: ${firstFileDataToObj[current]}`]);
    }

    if (secondFileKeys.includes(current) &&
      firstFileDataToObj[current] !== secondFileDataToObj[current]) {
      acc.push([`  + ${current}: ${firstFileDataToObj[current]}`]);
      acc.push([`  - ${current}: ${secondFileDataToObj[current]}`]);
    }

    return acc;
  }, []);

  const result = [reduced, deletedData, addedData].flat().join('\n');
  return `{\n${result}\n}`;
};

export default genDiff;

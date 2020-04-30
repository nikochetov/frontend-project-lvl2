import fs from 'fs';
import parser from './parsers.js';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const parse = parser(pathToFirstFile);
  const firstFileData = parse((fs.readFileSync(pathToFirstFile, "UTF-8")));
  const secondFileData = parse((fs.readFileSync(pathToSecondFile, "UTF-8")));
  const firstFileKeys = Object.keys(firstFileData);
  const secondFileKeys = Object.keys(secondFileData);
  const addedData = secondFileKeys
    .filter(item => !firstFileKeys.includes(item))
    .reduce((acc, current) => {
      acc.push([`  + ${current}: ${secondFileData[current]}`]);
      return acc;
    }, []);
  const reduced = firstFileKeys.reduce((acc, current) => {
    if (!secondFileKeys.includes(current)) {
      acc.push([`  - ${current}: ${firstFileData[current]}`]);
    }
    if (firstFileData[current] === secondFileData[current]) {
      acc.push([`    ${current}: ${firstFileData[current]}`]);
    }
    if (
      secondFileKeys.includes(current) &&
      firstFileData[current] !== secondFileData[current]
    ) {
      acc.push([`  + ${current}: ${secondFileData[current]}`]);
      acc.push([`  - ${current}: ${firstFileData[current]}`]);
    }

    return acc;
  }, []);

  return `{\n${[reduced, addedData].flat().join("\n")}\n}`;
};

export default genDiff;

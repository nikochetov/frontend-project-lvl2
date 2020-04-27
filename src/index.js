import fs from 'fs';

const genDiff = (pathToFirstFile, pathToSecondFile) => {
  const firstFileData = fs.readFileSync(pathToFirstFile, "UTF-8");
  const secondFileData = fs.readFileSync(pathToSecondFile, "UTF-8");
  const firstFileDataToObj = JSON.parse(firstFileData);
  const secondFileDataToObj = JSON.parse(secondFileData);
  const firstFileKeys = Object.keys(firstFileDataToObj);
  const secondFileKeys = Object.keys(secondFileDataToObj);
  const addedData = secondFileKeys
    .filter(item => !firstFileKeys.includes(item))
    .reduce((acc, current) => {
      acc.push([`  + ${current}: ${secondFileDataToObj[current]}`]);
      return acc;
    }, []);
  const reduced = firstFileKeys.reduce((acc, current) => {
    if (!secondFileKeys.includes(current)) {
      acc.push([`  - ${current}: ${firstFileDataToObj[current]}`]);
    }
    if (firstFileDataToObj[current] === secondFileDataToObj[current]) {
      acc.push([`    ${current}: ${firstFileDataToObj[current]}`]);
    }
    if (
      secondFileKeys.includes(current) &&
      firstFileDataToObj[current] !== secondFileDataToObj[current]
    ) {
      acc.push([`  + ${current}: ${firstFileDataToObj[current]}`]);
      acc.push([`  - ${current}: ${secondFileDataToObj[current]}`]);
    }

    return acc;
  }, []);

  return `{\n${[reduced, addedData].flat().join("\n")}\n}`;
};

export default genDiff;

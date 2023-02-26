export const RandomArr = (): Array<number> => {
  let arr: Array<number> = [];
  const minLengthArray = 3;
  const maxLengthArray = 17;
  const min = 0;
  const max = 100;
  let lengthArray = Math.floor(Math.random()*(maxLengthArray-minLengthArray+1) + minLengthArray);
  for(let i = 0; i<=lengthArray; i++) {
    arr.push(Math.floor(Math.random()*(max-min+1) + min));
  }
  return arr;
}

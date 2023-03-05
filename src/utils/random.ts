import { MAX_LENGTH_ARRAY, MAX_VALUES, MIN_LENGTH_ARRAY, MIN_VALUES } from "../constants/element-random";

export const RandomArr = (): Array<number> => {
  let arr: Array<number> = [];
  let lengthArray = Math.floor(Math.random()*(MAX_LENGTH_ARRAY-MIN_LENGTH_ARRAY+1) + MIN_LENGTH_ARRAY);
  for(let i = 0; i<=lengthArray; i++) {
    arr.push(Math.floor(Math.random()*(MAX_VALUES-MIN_VALUES+1) + MIN_VALUES));
  }
  return arr;
}

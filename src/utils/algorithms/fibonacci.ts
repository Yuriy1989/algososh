export const fibonacciAlg = (num: number): Array<number> => {
  let arr: Array<number> = [1, 1];

  if(Number(num) === 1) {
    return arr;
  }

  if(num > 1) {
    for(let i = 2; i <= num; i++){
      arr.push(arr[i-2] + arr[i-1]);
    }
    return arr;
  }
  return arr;
};

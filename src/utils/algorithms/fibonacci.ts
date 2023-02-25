export const fibonacciAlg = (num: number): Array<String> => {
  let arr: Array<String> = [1, 1];

  if(num > 1) {
    for(let i = 2; i <= num; i++){
      // let t = Number(arr[i-2]) + Number(arr[i-1]);
      arr.push((Number(arr[i-2]) + Number(arr[i-1])));
      console.log("arr", arr);
    }
    return arr;
  }
  return arr;
};

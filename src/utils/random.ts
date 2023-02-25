export const RandomArr = (): Array<number> => {
  let range = [0, 100];
  let Arr: Array<number> = [];
  const min = 3;
  const max = 17;
  let n = Math.floor(Math.random()*(max-min+1) + min);
  console.log("n = ", n);

  return Arr;
}

var line;
var num = readInt();
var solveMeFirst = (a,b) => a+b;
while((line = read_line()) != ''){
  let arr = line.split(' ');
  arr.sort((a,b) =>{
    return a-b;
  });
  let a = parseInt(arr[0]);
  let b = parseInt(arr[1]);
  let c = solveMeFirst(a, b);
  console.log(arr);
}
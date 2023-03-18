var x=1;
function one(){
    x=2;
    console.log(x);
}
function two(){
    console.log(x);
}

one(0);
two(0);
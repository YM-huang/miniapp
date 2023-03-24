function funPlus( m , n ){
    console.log( n );
    return{
    funPlus : function ( o ){
        return funPlus( o , m );
    }
}
}
hello = funPlus(0) .funPlus(1).funPlus(2).funPlus(3);
console.log(["1","2","3"].map(parseInt));
console.log(['1','2','3'].map(function(i){return parseInt(i,10)}));
console.log(new Array() instanceof Array);
console.log(typeof(null) == "object");
console.log(Object.prototype.toString.apply(Object(3)).indexOf('Number') > 8);
console.log((1^2) == ~~3.6);//按位非

console.log(~~3.6)//MATH.floor，但是效能高，取反-1
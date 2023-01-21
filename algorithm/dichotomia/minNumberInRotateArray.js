function minNumberInRotateArray(rotateArray)
{
    if(!rotateArray.length) return 0;
    let left = 0,right = rotateArray.length-1;
    while(left < right){
        let mid = Math.floor((right+left) >> 1);
        if(rotateArray[left] <= rotateArray[right]){
            return rotateArray[left];
        }
        if(rotateArray[left] < rotateArray[mid]){
            left = mid + 1;
        }else if(rotateArray[right] > rotateArray[mid]){
            right = mid;
        }else{
            left++;
        }
    }
}
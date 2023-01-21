function GetNumberOfK(data, k)
{
    let low = 0,high = data.length-1;
    let pos,count = 0;
    while(low < high){
        let mid = Math.floor((low+high)>>1);
        if(data[mid] === k){
            pos = mid;
            break;
        }else if(data[mid] < k){
            low = mid + 1;
        }else{
            high = mid-1;
        }
    }
    if(pos !== undefined){
        count++;
        let left = pos,right = pos;
        while(left--){
            if(data[left] === k){
                count++;
            }else{
                break;
            }
        }
        while(right++){
            if(data[right] === k){
                count++;
            }else{
                break;
            }
        }
        return count;
    }else return 0;
}
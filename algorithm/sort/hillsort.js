function hillSort(arr){
    let len = arr.length;
    for(let gap = parseInt(len >> 1);gap >= 1;gap = parseInt(gap >> 1)){
        for(let i = gap;i < len;i++){
            if(arr[i] < arr[i-gap]){
                let temp = arr[i];
                let j = i - gap;
                while(j >= 0 && arr[j] > temp){
                    arr[j+gap] = arr[j];
                    j -= gap;
                }
                arr[j+gap] = temp;
            }
        }
    }
    return arr;
}
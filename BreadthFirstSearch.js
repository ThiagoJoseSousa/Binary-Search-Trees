class nodeFactory{
    constructor(data) {
this.data=data;
this.right=null;
this.left=null;
    }

    
}

class treeFactory { 
    constructor(array) {
this.root= buildTree(array);

    }

}

function buildTree (array) {
//first sort and delete duplicates of the array, then build a binary search tree
let sortedArray=duplicateRemove((sortArray(array)))

let root=sortedArray[(sortedArray.length-1)/2]
let startToMiddle=sortedArray.slice(0,(sortedArray.length-1)/2)
let middleToEnd=sortedArray.slice((sortedArray.length-1)/2)


}
// merge sort algorithm
function sortArray(array) {
 if (array.length===1) {return array}
let left=array.slice(0,(array.length)/2)
let right=array.slice((array.length)/2)
return concatArrays(sortArray(left),sortArray(right))
}

function concatArrays(lft,rgt) {
    let result=[]
    let lftI=0;
    let rgtI=0;
    while (lftI<lft.length && rgtI<rgt.length) {
        if (lft[lftI]<rgt[rgtI]) {
            result.push(lft[lftI])
            lftI++
        }
        else {result.push(rgt[rgtI]); rgtI++}
    }
    return result.concat(lft.slice(lftI)).concat(rgt.slice(rgtI))
}

function duplicateRemove(array) {
    let i=0;
while (i<array.length) { //splice alters the length, so I must not let the I get summed
    if (array[i-1]===array[i]) {array.splice(i,1)} /*we can acess array -1 but not array+1 on the if */
    else {i++}
}
return array;
}

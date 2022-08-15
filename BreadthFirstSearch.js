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
let sortedArray=deleteDuplicates(sortArray(array))


let root=sortedArray[(sortedArray.length-1)/2]
let startToMiddle=sortedArray.slice(0,(sortedArray.length-1)/2)
let middleToEnd=sortedArray.slice((sortedArray.length-1)/2)

}
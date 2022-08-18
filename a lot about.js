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
//first sort and delete duplicates of the array, then build a binary search tree
let arrayOfData= [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let sortedArray=duplicateRemove((sortArray(arrayOfData)))

function buildTree (arr, start=0, end=arr.length-1) {
if (start>end ) {return null}

let mid = Math.floor((start+end)/2)
 //math floor for odd numbers
 let node = new nodeFactory(arr[mid])
//loops that creates nodes and uses tree factory to create a balanced tree.
// this func should return the level 0 root node. (We still arent going to implement BFS)

node.left =buildTree(arr, start, mid-1)
node.right=buildTree(arr,mid+1, end)
return node; //returns the created node object
}
// merge sort algorithm
function sortArray(array) {
 if (array.length===1) {return array}
let left=array.slice(0,Math.floor((array.length)/2))
let right=array.slice(Math.floor((array.length)/2))
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
    if (array[i-1]===array[i]) {array.splice(i,1)} /*we can acess array -1 but not array+1 on the loop, crazy how if scope works */
    else {i++}
}
return array;
}

let newTree= buildTree(sortedArray)
console.log(newTree.left) // everything right, we take the mid recursively of each part, making a balanced tree.
console.log(newTree.right)



//built tree is just the root of the tree, every node is also a root
function insertFn(builtTree,value){ if (builtTree==null){ builtTree=new nodeFactory(value) ;return builtTree}
    if (builtTree.data>value) {builtTree.left= insertFn(builtTree.left,value)} else if (builtTree.data<value){builtTree.right=insertFn(builtTree.right,value)};
    return builtTree} // i can instantiate an object in an object property! As node is unchanged if not the leaf, builTree.left=builtTree, its wrong!
 // While node exists, percur tree to left or to right according to its data, thats why else if.
// every NODE IS A ROOT, root 0 is a thing
 

function inorderRec(root)
    {
        if (root != null) {
            inorderRec(root.left);
            console.log(root.data);
            inorderRec(root.right);
        }
    }


inorderRec(newTree)

//searches for a value and deletes
function deleteFn(builtTree, value){
    
    if( builtTree==null) {return builtTree};//if the tree is empty
if (builtTree.data>value) {builtTree.left=deleteFn(builtTree.left,value)} else if (builtTree.data<value) { //else if specifies the other case action
    builtTree.right=deleteFn(builtTree.right, value)
}
else { //if not greater/lesser or null, its equal. Check if node with only one child or no child: (no child returns null)
    if(builtTree.left==null) { return builtTree.right} // if no node to the left return the right node. It checks left first, if not null and right null, returns the pointer that isnt null
    else if (builtTree.right == null) {return builtTree.left} //the returned value updates each node as its recursive, node 5 is now 4

// node with two children (left and right): Get the inorder
// successor (smallest in the RIGHT subtree of the root)
builtTree.data=minValue(builtTree.right); //overwrites the data with the data of the leaf of right-left subtree
// Delete the inorder successor
builtTree.right = deleteFn(builtTree.right, builtTree.data); //searches the new data of buildtree and deletes, recursively remaking the right pointer
}
return builtTree;
}

function minValue(builtTree) {
let minVal= builtTree.data;
while (builtTree.left!==null){
minVal=builtTree.left.data;
builtTree=builtTree.left;
}
return minVal;
}

console.log(find(newTree, 1000))

function find(builtTree,value){
    //basecase
    if (builtTree===null || builtTree===value) {return builtTree;} // builtTree is not changed through the func
    if(builtTree.data>value) {return find(builtTree.left, value)} //value must be at left,try to return next left node
    else if(builtTree.data<value) {return find(builtTree.right, value)}

return builtTree
}

// check by level BFS, easy to implement a fn using consolelog
function levelOrder (builtTree) {
 let queue = [];
 queue.push(builtTree);
 while (queue.length!=0) {
    let tempNode = queue.shift(); //each iteration removes and returns the 1st element
    if (tempNode.left!=null) {
        queue.push(tempNode.left)
    }
    if (tempNode.right!=null) {// if nothing is added no node is entered, queue reaches length 0, left is added 1st
        queue.push(tempNode.right)
    }
 }
}

function inOrder(builtTree){if (builtTree==null){return builtTree} else {
    inOrder(builtTree.left);
    console.log(builtTree.data)
    inOrder(builtTree.right)
}}
function preOrder(builtTree,current)
{let arr=current || [];
    if (builtTree==null) {return null}
    arr.push(builtTree.data)
    preOrder(builtTree.left,arr)
    preOrder(builtTree.right,arr)
    
    return arr;
//pre.push(builtTree) not needed with return
// original  return combinations(current.concat(true)).concat(combinations(current.concat(false)));, where concat.lgt is checked on basecase
}

function postOrder(builtTree){if (builtTree==null) {return builtTree};
postOrder(builtTree.left)
postOrder(builtTree.right)
console.log(builtTree.data)
}


// * Compute the "height" of a tree -- the number of nodes along the root and the longest path to leaf
function height(builtTree){
 
    // Initialising a variable to count the
    // height of tree
    let depth = 0
 
    let q = []
     
    // pushing first level element along with null
    q.push(builtTree)
    q.push(null)
    while(q.length>0){
        let temp = q.shift()
     
        // When null encountered, increment the value
        if(temp == null)
            depth += 1
         
        // If null not encountered, keep moving but dont increment
        if(temp != null){
            if(temp.left)
                q.push(temp.left)
             
            if(temp.right)
                q.push(temp.right)
        }
             
        // If queue still have elements left, the null shifted on the beginning wasnt the last element
        // push null again to the queue. Every null is +1
        else if(q.length>0)
            q.push(null)
    }   //
    return depth
 
}

function depth(builtTree, root) {
    height(root)-= height(builtTree)
}

//just checks
function isBalanced(builtTree){
if (builtTree==null){return null}

let leftheight=isBalanced(builtTree.left) //stores the returned height so it can compare
if (leftheight===false) {return false}

let rightheight=isBalanced(builtTree.right)
if (rightheight===false) {return false}

if (Math.abs(leftheight - rightheight) >1) {
    return false
}


//if it is balanced return height + the counter of the percurred node
return (Math.max(leftheight, rightheight) +1);
}

console.log(height(newTree))
insertFn(newTree,1000) //unbalances the tree

function rebalance(builtTree) {
let unbalancedTreeAsSortedArray=sortArray(preOrder(builtTree))
builtTree=new buildTree(unbalancedTreeAsSortedArray)
//likely ill have to do all of what i did on preOrder for every traversal order, no problem.

}
console.log(preOrder(newTree)) 
//rebalance(newTree)

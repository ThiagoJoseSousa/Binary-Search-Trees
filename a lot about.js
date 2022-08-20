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



function find(builtTree,value){
    //basecase
    if (builtTree===null || builtTree===value) {return builtTree;} // builtTree is not changed through the func
    if(builtTree.data>value) {return find(builtTree.left, value)} //value must be at left,try to return next left node
    else if(builtTree.data<value) {return find(builtTree.right, value)}

return builtTree
}

// check by level BFS, easy to implement a fn using consolelog
function levelOrder (builtTree,fn) {
 let queue = [];
 queue.push(builtTree);

 while (queue.length!=0) {
    let tempNode = queue.shift(); //each iteration removes and returns the 1st element
    if (fn) {fn(tempNode,'levelOrder')}
    if (tempNode.left!=null) {
        queue.push(tempNode.left)
    }
    if (tempNode.right!=null) {// if nothing is added no node is entered, queue reaches length 0, left is added 1st
        queue.push(tempNode.right)
    }
 }
}

function inOrder(builtTree,current,fn){
    let arr=current||[];
    if (builtTree==null){return builtTree} else {
    inOrder(builtTree.left,arr,fn);
    if (fn) {fn(builtTree,'inOrder')}
    arr.push(builtTree.data)
    inOrder(builtTree.right,arr,fn)

    return arr;
}}
function preOrder(builtTree,current,fn)
{let arr=current || [];
    if (builtTree==null) {return null}
    if (fn){fn(builtTree,'preOrder')}
    arr.push(builtTree.data)
    preOrder(builtTree.left,arr,fn)
    preOrder(builtTree.right,arr,fn)
    
    return arr;
//pre.push(builtTree) not needed with return
}

function postOrder(builtTree,current, fn){
let arr=current || [];
if (builtTree==null) {return builtTree};

postOrder(builtTree.left, arr,fn)
postOrder(builtTree.right, arr,fn)
arr.push(builtTree.data)
if (fn){fn(builtTree,'postOrder')}

return arr;
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



function rebalance(builtTree) {
let unbalancedTreeAsSortedArray=sortArray(preOrder(builtTree))
builtTree=new buildTree(unbalancedTreeAsSortedArray)
//likely ill have to do all of what i did on preOrder for every traversal order, no problem.
return builtTree
}


function randomNArray(arraylgt) {
let arr=[];
for (let i=0;i<arraylgt; i++) {
arr.push(Math.floor(Math.random()*10))
}
return arr;
}

function driver () {
let arr=randomNArray(7);
let sortedArr= duplicateRemove(sortArray(arr))
let builtTree= buildTree(sortedArr)
console.log(isBalanced(builtTree)) //if returns other than false is balanced.
function fn(order,id) {console.log(order.data + `${id}`)}
preOrder(builtTree,undefined,fn)
inOrder(builtTree,undefined,fn)
postOrder(builtTree,undefined,fn)

insertFn(builtTree,1000)
insertFn(builtTree,1001)
insertFn(builtTree,1003)
insertFn(builtTree,1004)

console.log(isBalanced(builtTree))
builtTree = rebalance(builtTree)
console.log(isBalanced(builtTree))

levelOrder(builtTree,fn)
preOrder(builtTree,undefined,fn)
inOrder(builtTree,undefined,fn)
postOrder(builtTree,undefined,fn)
}
driver()
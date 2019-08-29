const Memory = require('./memory');
const memory = new Memory();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error('Index error');
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error('Index error');
    }
    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }
}
Array.SIZE_RATIO = 3;

function main(){
  Array.SIZE_RATIO = 3;

  let arr = new Array();

  arr.push('tauhida');
  


  console.log(arr.get(0));
}

// main();


//Questions from assignment:
// * length = 1, capacity = 3, pointer = 0
// * length = 6, capacity = 12, pointer = 3
// * When the length of the array is equal to or greater than the capacity it 
// will recalculate the capacity to the length plus 1 times the size ratio which in this case is (3 + 1) * 3 = 12.
// the data then shifts over three spaces and the point now points toward the new first index which is 3.
// * After adding the three pop method executions the only change is the length which goes from 6 to 3.
// This is because the length is decremented in the pop method. 
// * The result of trying to push a string into the array is NaN.
// I think this is because the memory is initialized with a Float64Array that only allows numbers. Not sure about this one though.
// * The resize function sets the pointer to the new 'zero' index and also will reset the capacity if 
//the size changes from the point that _resize is called

function URLify(str){

  for (let i = 0; i < str.length - 1; i ++){
    if (str.charAt(i) === ' '){
      str = str.replace(' ', '%20');
    }
  }

  console.log(str);
}

// URLify('thinkful.com / post');

function nURLify(str){

  
  const newStr = str.replace(/ /gi, '%20');

  
  return newStr;
}

// console.log(nURLify('thinkful.com / post'));

function arrFilter(arr, num){

  let newArr = [];

  for (let i = 0; i < arr.length; i++){
    if (arr[i] > num){
      newArr.push(arr[i]);
    }
  }

  return newArr;
}

// console.log(arrFilter([1, 4, 5, 6, 8, 19], 6));

function maxSum(arr){
  let max = 0;
  let current = 0;

  for (let i = 0; i < arr.length; i++){
    current = current + arr[i];

    if(current > max){
      max = current;
    }
  }

  return max;
}

// console.log(maxSum([4, 6, -3, 5, -2, 1]));

function joinSortedArrays(arr1, arr2){
  let newArr = [...arr1, ...arr2];

  newArr.sort((a, b) => a - b);

  // for (let i = 0; i < newArr.length; i++){
  //   if(newArr[i] > newArr[i + 1]){
  //     let greater = newArr[i]; 
  //     newArr[i] = newArr[i + 1]; 
  //     newArr[i + 1] = greater; 
  //   }
  // }
  return newArr;
}

// console.log(joinSortedArrays([1,3,6,8,11], [2,3,5,8,9,10]));

function filterChars(str, chars){

  for (let i = 0; i < str.length; i++){

    for (let j = 0;  j < chars.length; j++){
      if(str[i] === chars[j]){
        str = str.slice(0, i) + '' + str.slice(i + 1);
      }
    }
  }

  return str;
}

// console.log(filterChars('hello', 'el'));

function recursiveFilterChar(str, chars,filterIndex = 0){
  if(chars.length - 1 === filterIndex){
    return str;
  }


  let newString = str;

  for (let i = 0; i < str.length; i++){
    if(str[i] === chars[filterIndex]){
      console.log('in loop');
      newString += str.slice(i);
    }
  }

  filterIndex++;
  
  return recursiveFilterChar(newString, chars, filterIndex);
}

// console.log(recursiveFilterChar('hello', 'el'));

// const string = 'hello';

// console.log(string.slice(2, 3));


function products(arr){

  let newArr = [];

  for (let i = 0; i < arr.length; i++){
    let product = 1;
    for (let j = 0; j < arr.length; j++){
      if (i !== j){
        product *= arr[j];
      }
    }
    newArr.push(product);
  }

  return newArr;
}

// console.log(products([1, 3, 9, 4]));

function twodeearray(arr){

  let zeroIndexArr = [];

  for (let i = 0; i < arr.length; i++){
    let zeroRow = null;

    for (let j = 0; j < arr[i].length; j++){
      if(arr[i][j] === 0){
        zeroIndexArr.push(j);
        zeroRow = i;
      }

      if(zeroIndexArr[i] === j){
        arr[i][j] = 0;
      }

      if(arr[i][j] !== 1 && j !== 0){
        arr[i][j -1] = 0;
      }

      if(i === zeroRow){
        arr[i][j] = 0;
      }


    }
    console.log(zeroIndexArr);

  }

  return arr;

}

console.log(twodeearray([[1,0,1,1,0],
  [0,1,1,1,0],
  [1,1,1,1,1],
  [1,0,1,1,1],
  [1,1,1,1,1]]));


function strRotate(str1, str2){
  return (str2 + str2).indexOf(str1) != -1;
}



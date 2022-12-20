// brute force
// const twoSum = (arr, target)=>{
//     for(let i=0;i<arr.length;i++){
//         for(let j=0;j<arr.length;j++){
//             if(i == j) j++;
//             if(arr[i]+arr[j] == target){
//                 return (`${arr[i]}+${arr[j]} is ${target}`);
//             }
//         }
//     }
//     return "no two sums found";
// }
//[3,2,2,3]
// var removeElement = function(nums, val) {
//     let expectedNums = []
//     for(let i=0; i<nums.length; i++){
//         if(nums[i] != val){
//             expectedNums.push(nums[i])
//         }
//     }
//     return (expectedNums);
// }
// console.log(removeElement([0,1,2,2,3,0,4,2],2));

// var searchInsert = function(nums, target) {
//     let out = 0
//     for(let i=0; i<nums.length; i++){
//         if(nums[i] == target){
//             return i;
//         }
//         if(nums[i] < target){
//             out +=1;
//         }
//     }
//     return out;
// };

// console.log(searchInsert([1,3,5,6],5));


// var lengthOfLastWord = function(s) {
//     let strs = s.split(" ")
//     let newArr = []
//     for(let i=0; i<strs.length; i++){
//         if(strs[i] != ""){
//             newArr.push(strs[i]);
//         }
//     }
//     return newArr[newArr.length-1].length;
// };

// console.log(lengthOfLastWord("luffy is still joyboy"))

for(let i =0; i<10; i++){
    console.log(i)
}

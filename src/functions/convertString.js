export const convertStringToArray = (str) => {
    const cleanedStr = str.replace(/^'|'$/g, '');
    const array = cleanedStr.split(',')
    return array
}
export const convertStringToArrayObjects = (str) => {
    const convertArray = str.split(',')
    const convertToArrays = convertArray.map(item => item.split('-'))
    const convertToArrayObject = convertToArrays.map(item =>{
        return {
            left:item[0], right:item[1]
        }
    } )
    return convertToArrayObject
}
export const covertArrayToString = (arr) => {
    let str = ''
    for(let i = 0; i < arr.length; i++){
        if(i === arr.length - 1){
            str += arr[i]
            return str
        }
        str += arr[i] + ',' 
    }
    return str
}
export const convertArrayObjectsToString = (arr) => {
    const str = arr && arr.map((item) => item.left+'-'+item.right).join(',')
    return str
}
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

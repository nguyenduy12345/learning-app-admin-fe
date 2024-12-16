const convertStringToArray = (str) => {
    const cleanedStr = str.replace(/^'|'$/g, '');
    const array = cleanedStr.split(',')
    return array
}
export default convertStringToArray
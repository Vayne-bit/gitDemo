
/**
 * 判断一个变量是否为空
 * @param {*} str 
 * @returns 
 */
const isEmpty = str => {
  if (str === "" || 
    str === null || 
    str === undefined || 
    str.replace(/\s*/g,'') === '') return true;
  return false;
};
/**
 * 判断是否是数组
 * @param {*} arr 
 * @returns 
 */
const isArray = arr => {
  if (Object.prototype.toString.call(arr) !== '[object Array]') return false;
  return true;
}
/**
 * 判断是否是空数组
 * @param {*} arr 
 * @returns 
 */
const isEmptyArr = arr => {
  if (arr.length === 0) return true;
  return false;
};
const isTel = tel => {
  tel = tel.replace(/\s*/g, '');
  if (/^1\d{10}$/.test(tel)) return true;
  return false;
}
/**
 * 去除字符串所有空格
 * @param {*} str 
 * @returns 
 */
const trimAll = str => {
  if (!str) return str;
  return str.replace(/\s*/g, '');
};

module.exports = {
  isEmpty,
  isArray,
  isEmptyArr,
  isTel,
  trimAll
};
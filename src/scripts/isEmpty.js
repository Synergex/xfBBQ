/**
 * Returns if the object is empty or not
 * @param {Object} obj The object to check
 */
export default function isEmpty(obj) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

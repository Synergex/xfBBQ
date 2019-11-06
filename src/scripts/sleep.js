/**
 * Sleeps for a number of miliseconds. Can only be used in async functions.
 * @param {Number} ms - Miliseconds to sleep for
 */
export default function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

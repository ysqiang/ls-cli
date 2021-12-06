
//【ora】加载状态库
const ora = require('ora')

/**
 * 统一拦截并处理 promise 函数通过 await 所抛出的异常
 * @param {function} awaitFn Promise 函数
 * @param  {...any} args awaitFn 函数所需参数
 * @param {object} options 用于是否对调用的 awaitFn 函数给出加载状态信息 {showLoading: true, msg: 'loading'}
 * @returns {Array} [res, status] res 结果信息，status表示成功与否. 'success':成功， 'fail': 失败
 */
module.exports = async function tryCatchAwait(awaitFn, options={}, ...args) {

  let spinner = {};
  try {
    // 是否显示加载进度状态
    if (options.showLoading) {
      spinner = ora({
        text:options.msg,
        color: 'green'
      })
      spinner.start()
    }

    const result = await awaitFn(...args);

    // options.showLoading && spinner.succeed()
    options.showLoading && spinner.stop();
    return [result, 'success']
  } catch (err) {
    options.showLoading && spinner.fail(err)
    return [err, 'fail']
  }
}

// copy from vuepress-plugin-last-updated
// @see https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/plugin-last-updated/index.js
const spawn = require('cross-spawn')

function defaultTransformer(timestamp, lang) {
  return new Date(timestamp).toLocaleString(lang)
}

function getGitLastUpdatedTimeStamp(filePath) {
  let lastUpdated
  try {
    lastUpdated = parseInt(spawn.sync('git', ['log', '-1', '--format=%ct', filePath]).stdout.toString('utf-8')) * 1000
  } catch (e) {
    /* do not handle for now */
  }
  return lastUpdated
}

module.exports = ($page, options) => {
  const { transformer } = options
  if ($page._meta && $page._meta.filePath) {
    // add this line
    const timestamp = getGitLastUpdatedTimeStamp($page._meta.filePath)
    const $lang = $page._computed.$lang
    if (timestamp) {
      const lastUpdated = typeof transformer === 'function' ? transformer(timestamp, $lang) : defaultTransformer(timestamp, $lang)
      $page.lastUpdated = lastUpdated
    }
  }
}

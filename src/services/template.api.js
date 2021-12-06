const http = require('../http/index')

/**
 * 【模版说明】
 * 主要依赖于 gitee 仓库。也可依赖 github 仓库。
 * 模版用于设置创建项目的基本目录结构（可根据项目自定制目录结构）
 * 
 * 【gitee/github 仓库相关接口】
 * gitee 开发文档参见：https://gitee.com/api/v5/swagger
 * github 开发文档参见：https://docs.github.com/cn/rest/reference/repos
 */

// github/gitee 仓库私有用户名
const gitReposOwner =  (function(gitType) {
  let reposOwner = ''
  switch(gitType) {
    case 'gitee': // 码云
      reposOwner = 'YCodeProjects';
      break;
    case 'git': // github
      reposOwner = 'ysqiang';
    default:
      break;
  }
  return reposOwner;
})('git');

 /**
  * 获取公开仓库信息
  */
function getRepoList() {
  // gitee 仓库
  // return http.get(`https://gitee.com/api/v5/users/${gitReposOwner}/repos?type=all&sort=full_name&page=1&per_page=20`)
  
  // github 仓库
  return http.get(`https://api.github.com/users/${gitReposOwner}/repos`)
}

/**
 * 获取某一仓库下的所有分支
 * @param {string} repo 仓库名
 */
function  getAllBranchesByRepo(repo) {
  // return http.get(`https://gitee.com/api/v5/repos/${gitReposOwner}/${repo}/branches`)
  return http.get(`https://api.github.com/repos/${gitReposOwner}/${repo}/branches`)
}

/**
 * 获取某一仓库下的所有Tag
 * @param {string} repo 仓库名
 */
function  getAllTagsByRepo(repo) {
  // return http.get(`https://gitee.com/api/v5/repos/${gitReposOwner}/${repo}/tags`)
  return http.get(`https://api.github.com/repos/${gitReposOwner}/${repo}/tags`)
}

/**
 * 下载具体 release 版本的仓库, 形成项目目录
 * @param {function} 下载函数（download-git-repo 库）
 * @param {string} 下载文件存储目录
 * @param {string} repo 仓库名
 * @param {string} tag 仓库 tag 号
 */
function downloadGitRepo2TPL(fn, targetDir, repo, tag) {
  const requestUrl = `${gitReposOwner}/${repo}${tag ? '#' + tag : ''}`;
  return fn(requestUrl, targetDir)
}

module.exports = {
  getRepoList,
  getAllBranchesByRepo,
  getAllTagsByRepo,
  downloadGitRepo2TPL
}
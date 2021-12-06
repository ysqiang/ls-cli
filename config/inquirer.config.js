const langs = require('../utils/i18n').getI18n();

// 创建指令相关交互配置
const inquirerCreate = function(type, options) {
  let configOpt;
  switch(type) {
    case 'OVERWRITE':
      configOpt = [
        {
          name: options.name,
          type: 'list',
          message: langs.CreateCli.Overwrite.Text,
          choices: [
            {
              name: langs.CreateCli.Overwrite.Yes,
              value: true
            },
            {
              name: langs.CreateCli.Overwrite.No,
              value: false
            }
          ]
        }
      ]
      break;
    default:
      break;
  }

  return configOpt;
}

// 模版相关交互配置
const inquirerTPL = function(type, options={}) {
  let configOpt;
  switch(type) {
    case 'TPL_LIST':
      configOpt = {
        name: options.name,
        type: 'list',
        choices: options.dataSrc,
        message: langs.TPL.SelectTPL
      };
      break;
    case 'TPL_VER_LIST':
      configOpt = {
        name: options.name,
        type: 'list',
        choices: options.dataSrc,
        message: langs.TPL.SelectVersion
      };
      break;
    default:
      break;
  }

  return configOpt;
}

// 依赖安装相关交互配置
const inquirerDeps = function(type, options={}) {
  let configOpt;
  switch(type) {
    case 'INSTALL':
      configOpt = [
        {
          name: options.name,
          type: 'list',
          message: langs.Deps.Installed.Text,
          choices: [
            {
              name: langs.Deps.Installed.Yes,
              value: true
            },
            {
              name: langs.Deps.Installed.No,
              value: false
            }
          ]
        }
      ];
      break;
    default:
      break;
  }

  return configOpt;
}

module.exports = {
  inquirerCreate,
  inquirerTPL,
  inquirerDeps
}
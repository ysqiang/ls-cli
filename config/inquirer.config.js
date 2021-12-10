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
    case 'MANUAL':
      configOpt = [
        {
          name: options.name,
          type: 'list',
          message: langs.CreateCli.Manual.Text,
          choices: [
            {
              name: langs.CreateCli.Manual.Yes,
              value: true
            },
            {
              name: langs.CreateCli.Manual.No,
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

// 创建项目基本信息
const inquirerPrjCfg = function(type, options={}) {
  let configOpt;
  switch(type) {
    case 'NAME':
      configOpt = {
        name: options.name,
        type: 'input',
        default: options.default,
        message: langs.PrjCfg.Name.Prompt,
        validate(val){
            // 1. 必须以小写字母开头
            // 2. 由小写字母，数字，_，-组成
            // 3. 长度小于128
            if (!/^[a-z]+[a-z_\-0-9]*$/.test(val)){
                return langs.PrjCfg.Name.Validate
            } else {
                return true
            }
        }
      };
      break;
    case 'VERSION':
      configOpt = {
        name: options.name,
        type: 'input',
        default: options.default,
        message: langs.PrjCfg.Version.Prompt,
        validate(val){
            // 1. 必须以数字1-9开头
            if (!/^[1-9]\d*(\.\d+)*$/.test(val)){
              return langs.PrjCfg.Version.Validate
            } else {
                return true
            }
        }
      }
      break;
    case 'DESC':
      configOpt = {
        name: options.name,
        type: 'input',
        message: langs.PrjCfg.Desc.Prompt
      }
      break;
    case 'AUTHOR':
      configOpt = {
        name: options.name,
        type: 'input',
        message: langs.PrjCfg.Author.Prompt
      }
      break;
    case 'ENTRY':
      configOpt = {
        name: options.name,
        type: 'input',
        default: options.default,
        message: langs.PrjCfg.Entry.Prompt,
        validate(val){
          // 1. 必须以小写字母开头
          // 2. 由小写字母，数字，_，-组成
          // 3. 文件类型为 js 或 ts
          // 4. 长度小于32
          if (!/^[a-z]+[a-z_\-0-9]*\.(t|j)s$/.test(val)){
              return langs.PrjCfg.Entry.Validate
          } else {
              return true
          }
        }
      }
      break;
    case 'LICENSE':
      configOpt = {
        name: options.name,
        type: 'input',
        default: options.default,
        message: langs.PrjCfg.License.Prompt
      }
      break;
    default:
      break;
  }

  return configOpt;
}


module.exports = {
  inquirerCreate,
  inquirerTPL,
  inquirerDeps,
  inquirerPrjCfg
}
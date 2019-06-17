const fs = require('fs');
const path = require('path');

const homeController = async (ctx) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, '../assets/template'));
    const fileList = files.map(e => {
      return e.slice(0, e.indexOf('.'));
    });
    await ctx.render('index',{
      fileList
    });
  } catch (error) {
    console.log(error);
    console.log('读取模板文件失败');
  }
}


function deleteFolder(path) {
  let files = [];
  if( fs.existsSync(path) ) {
    files = fs.readdirSync(path);
    files.forEach(function(file,index){
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
      } else {
          fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
}

/**
 * type: 模板名称
 * tags: 创建文件名称
 * css: 创建的css名称
 */
const createTemplate = async (ctx) => {
  try {
    const {type, tags, css} = ctx.request.body;
    //清空生成文件夹
    deleteFolder(path.join(__dirname, '../assets/dist'));
    //读取模板文件
    let template = fs.readFileSync(path.join(__dirname, `../assets/template/${type}.txt`), 'utf8');
    tags.forEach(e => {
      //替换页面名称
      let text = template.replace(/demo/, e);
      //判断生成文件夹是否存在
      let stat = fs.existsSync(path.join(__dirname, '../assets/dist'));
      if (!stat) {
        fs.mkdirSync(path.join(__dirname, '../assets/dist'));
      }
      //创建页面文件夹
      fs.mkdirSync(path.join(__dirname, `../assets/dist/${e}`));
      const cssOption = ['css', 'css', 'scss'];
      //编写scss文件
      if (css === 2) {
        fs.writeFileSync(path.join(__dirname, `../assets/dist/${e}/index.${cssOption[css]}`), '');
        //引入scss文件
        let index = text.indexOf('scoped>');
        text = text.replace(/css/, "@import './index.scss';");
        text = text.slice(0, index) + 'lang="scss" ' + text.slice(index);
      } else {
        text = text.replace(/css/, '');
      }
      //输出内容到生成页面文件
      fs.writeFileSync(path.join(__dirname, `../assets/dist/${e}/index.vue`), text, 'utf8');
    });
    return ctx.body = {
      success: true,
      msg: '创建成功'
    }
  } catch (error) {
    console.log(error);
    return ctx.body = {
      success: false,
      msg: '创建失败'
    }
  }
}

module.exports = {
  homeController,
  createTemplate
}
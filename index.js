const fs = require('fs')
const path = require('path')

let handler = inputs => {
  // 筛选出后缀为.csv的文件且忽略大小写
  let fileNameArr = fs.readdirSync(inputs).filter(f => /^.csv$/i.test(path.extname(f)))
  let outFiles = {}
  for(fileItem of fileNameArr){
    let contentArr = []
        filePath = path.join(inputs, fileItem)
        handlerContent = fs.readFileSync(filePath).toString().split('\n')
    let index = 0
    for(item of handlerContent){
      // 去除每一行的末尾值中所带的空格
      let convers = ''
      convers = item.trim().split(',')
      if(index !== 0) { convers[0] = '\n' + convers[0]}  // 除第一行外，每行行首添加换行符
      contentArr.push(convers)
      index ++
    }
    outFiles[fileItem] = contentArr
  }
  return outFiles
}

module.exports = handler
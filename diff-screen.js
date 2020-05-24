/**
 * できること
 * before,afterディレクトリに保存されている画像の差分を比較します
 * （双方のディレクトリには同名の画像が保存されていることが前提になっています。）
 *
 * 想定する利用シーン
 * スタイルシートなど環境のアップデート前後でレイアウトの崩れを検出する
 *
 * 使い方
 * 1.beforeとafterに同名の画像を格納
 * 2.node diff-screen.js を実行
 * 3.差分のある画像はコンソールからお知らせ
 * 3.比較結果はresultディレクトリに保存
 *
 */

const PixelDiff = require('pixel-diff');
const fs = require('fs');
const path = './before';
const fileList = fs.readdirSync(path);
const fileCount = fileList.length

for(let i = 0; i < fileCount; i++){
  let imageBeforePath = './before/'+fileList[i]
  let imageAfterPath  = './after/'+fileList[i]
  let imageOutputPath = './result/diff-'+fileList[i]

  let diff = new PixelDiff({
    imageAPath: imageBeforePath,
    imageBPath: imageAfterPath,
    imageOutputPath: imageOutputPath
  });

  diff.run((error, result) => {
    if (error) {
      throw error;
    }else{
      if(result.differences !== 0){
        console.log(fileList[i]+'で差分が確認されました。')
      }
    }
  });

}
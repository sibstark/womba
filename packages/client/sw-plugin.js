import { promises as fs } from 'fs'
import * as path from 'path'
const SW_FILENAME = 'service-worker.js'
const SRC_FOLDER = './src';
const DIST_FOLDER = './dist';
const ASSETS_WEB_FOLDER = '/assets';

async function getFilesList(dir) {
  const list = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(list.map((item) => {
    const res = path.resolve(dir, item.name);
    return item.isDirectory() ? getFilesList(res) : res;
  }));
  return Array.prototype.concat(...files);
}


const _generateBundle = async (_, data, options = {}) => {
  const _src = options.src || SRC_FOLDER;
  const _dist = options.dist || DIST_FOLDER;
  const _assets = options.assets || ASSETS_WEB_FOLDER;
  const filePath = path.join(__dirname, `${_src}/${SW_FILENAME}`)
  const sw = await fs.readFile(filePath).then(data => {
    return '' + data
  })
  const chunkList = Object.keys(data).map(chunk => `/${chunk}`);
  chunkList.push('/');
  chunkList.push(_assets)
  const swWithChunks = sw.replace(
    'const URLS = []',
    `const URLS = ['${chunkList.join(`','`)}']`
  )
  fs.writeFile(`${_dist}/${SW_FILENAME}`, swWithChunks).then(() =>
    console.log('service worker writed')
  )
}

// const _closeBundle = async () => {
//   const fullPath = path.resolve(DIST_FOLDER);
//   const chunkList = (await getFilesList(DIST_FOLDER)).map((it) => it.replace(fullPath, ''));
//   const _src = options.src || SRC_FOLDER;
//   const _dist = options.dist || DIST_FOLDER;
//   const _assets = options.assets || ASSETS_WEB_FOLDER;
//   chunkList.push('/');
//   chunkList.push(_assets)
//   const swWithChunks = sw.replace(
//     'const URLS = []',
//     `const URLS = ['${chunkList.join(`','`)}']`
//   )
//   fs.writeFile(`${_dist}/${SW_FILENAME}`, swWithChunks).then(() =>
//     console.log('service worker writed')
//   )
// }

export function serviceWorker() {
  return {
    name: 'add-service-worker',
    generateBundle(options, data, isWrite) {
      if (!isWrite) return;
      _generateBundle(options, data);
    },
    // closeBundle() {
    //   _closeBundle(options = {});
    // }
  }
}
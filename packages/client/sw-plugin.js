import { promises as fs } from "fs";
import * as path from "path";
const SW_FILENAME = "service-worker.js";
const SRC_FOLDER = "./src";
const DIST_FOLDER = "./dist";
const ASSETS_WEB_FOLDER = "/assets";

const _generateBundle = async (_, data, options = {}) => {
    const _src = options.src || SRC_FOLDER;
    const _dist = options.dist || DIST_FOLDER;
    const _assets = options.assets || ASSETS_WEB_FOLDER;
    const filePath = path.join(__dirname, `${_src}/${SW_FILENAME}`);
    const sw = await fs.readFile(filePath).then(data => {
        return "" + data;
    });
    const chunkList = Object.keys(data).map(chunk => `/${chunk}`);

    chunkList.push("/");
    chunkList.push(_assets);
    const swWithChunks = sw.replace("const URLS = []", `const URLS = ['${chunkList.join(`','`)}']`);

    fs.writeFile(`${_dist}/${SW_FILENAME}`, swWithChunks).then(() =>
        console.log("\nservice worker written.");
    );
};

export function serviceWorker() {
    return {
        name: "add-service-worker",
        generateBundle(options, data, isWrite) {
            if (!isWrite) return;
            _generateBundle(options, data);
        }
    };
}

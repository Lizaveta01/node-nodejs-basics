import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import {fileURLToPath} from "url";
import {} from './files/c.js';

const random = Math.random();
const PORT = 3000;

let unknownObject;

if (random > 0.5) {
    unknownObject = await import('./files/a.json', {assert: {type: 'json'}});
} else {
    unknownObject = await import('./files/b.json', {assert: {type: 'json'}})
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${path.join(fileURLToPath(import.meta.url))}`);
console.log(`Path to current directory is ${path.join(fileURLToPath(import.meta.url), '..')}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

console.log(unknownObject.default);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export default {
    unknownObject,
    myServer,
};


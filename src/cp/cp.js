import { getPath } from '../utils/getPath.js';
import { spawn } from "child_process";

const { stdin, stdout } = process;

const spawnChildProcess = async (args) => {
    const src = getPath(import.meta.url, "script.js");
    const childProcess = spawn("node", [src, ...args]);
  
    stdin.on('data', (data) => {
      childProcess.stdin.write(data);
    })
  
    childProcess.stdout.on('data', (data) => {
      stdout.write(data);
    })
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['Hello,', 'nice', 'to', 'meet', 'you']);

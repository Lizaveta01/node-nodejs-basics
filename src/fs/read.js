const read = async () => {
    const src = getPath(import.meta.url, "fileToRead.txt");

    try {
        const content = await readFile(src, {encoding : "utf8"})
        console.log(content);
    } catch (e) {
        throw new Error('FS operation failed: ' + e.message);
    }
};

await read();
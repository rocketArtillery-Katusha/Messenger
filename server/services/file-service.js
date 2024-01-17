const path = require("path");

class fileService {
    addFile({ file, folderName }) {
        const fileName = Date.now().toString() + file.name;
        const dirname = path.dirname(__dirname);
        file.mv(path.join(dirname, folderName, fileName));

        return fileName;
    }
}

module.exports = new fileService();

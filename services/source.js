const
    glob            = require('glob'),
    path            = require('path'),
    fs              = require('fs'),
    settings        = require('../settings');

let sources = [];

let globPromise = function(rootPath) {
    return Promise.resolve({
        then: function (resolve, reject) {
            glob(path.join(rootPath, '*'), (err, files) => {
                if (err) return reject(err);
                resolve(files);
            });
        }
    });
};

let statPromise = function(rootPath) {
    return Promise.resolve({
        then: function(resolve, reject) {
            fs.stat(rootPath, (err, stats) => {
                if(err) return reject(err);
                resolve(stats);
            });
        }
    });
};

let traverse = co(function*(rootPath, title) {
    let items = (yield globPromise(rootPath)) || [];

    for(let i = 0 ; i < items.length ; i++) {
        let item = items[i];

        let extname = path.extname(item) && path.extname(item).substr(1);
        let stat    = yield statPromise(item);

        if( stat.isFile() && (settings.extensions||[]).indexOf(extname) !== -1 ) {
            // teamnote에 등록
            console.log(item, title);
        }

        else if( stat.isDirectory() ) {
            let basename = path.basename(item);

            yield traverse(item, title+'/'+basename);
        }
    }

});

let init = co(function*() {
    sources = [];

    yield traverse(settings.sourcesPath, '');
});

let renew = co(function*() {

});

module.exports = {
    init,
    renew
};
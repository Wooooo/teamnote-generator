global.Promise = require('bluebird');
global.co = Promise.coroutine;

const sourceService     = require('./services/source');

(co(function*() {
    yield sourceService.init();
}))();

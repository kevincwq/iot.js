var express = require('express');
var router = express.Router();
router.use(express.static('public'));
router.get('/echo', function (req, res) {
    res.send(JSON.stringify({ message: "Hello Word" }));
});
module.exports = router;

// test old module release and memory leak
// var array = [];
// for (var i = 0; i < 1000000; i++) {
//     array.push('mem_leak_when_require_cache_clean_test_item_' + i);
// }
// module.exports = array;
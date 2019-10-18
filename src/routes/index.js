const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.json({"Title": "Hello Word"});
});

module.exports = router;
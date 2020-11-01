const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth.middleware');
const { get, del, patch } = require('../controllers/userController');

router.get('/me', auth, get);

router.delete('/me', auth, del);

router.patch('/me', auth, patch);

module.exports = router;

const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth.middleware');
const controllers = require('../controllers/notesController');

router.post('/', auth, controllers.post);

router.get('/', auth, controllers.get);

router.get('/:id', auth, controllers.getById);

router.put('/:id', auth, controllers.put);

router.patch('/:id', auth, controllers.patch);

router.delete('/:id', auth, controllers.del);

module.exports = router;

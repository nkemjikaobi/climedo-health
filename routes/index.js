const express = require('express');
const router = express.Router();
const { create, fetch, getById, update, remove } = require('../controller/departments');

router.post('/', create);
router.get('/', fetch);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;

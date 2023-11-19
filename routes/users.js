var express = require('express');
var router = express.Router();
const Users = require('../controllers/Users');
const authorization = require('../middlewares/authorization');

router.use(authorization)

// TODO: Add validator middleware
router.post('/', Users.CreateUser);

router.get('/', Users.GetAllUsers);

router.get('/:id', Users.GetUser);

// TODO: Add validator middleware
router.put('/:id', Users.UpdateUser);

router.delete('/:id', Users.DeleteUser);

module.exports = router;

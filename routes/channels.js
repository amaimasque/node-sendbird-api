var express = require('express');
var router = express.Router();
const Channels = require('../controllers/Channels');
const authorization = require('../middlewares/authorization');

router.use(authorization)

// TODO: Add validator middleware
router.post('/', Channels.CreateChannel);

router.get('/', Channels.GetAllChannels);

router.put('/:id', Channels.UpdateChannel);

module.exports = router
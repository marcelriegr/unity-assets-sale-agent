const express = require('express');
const cr = require('../utils/cron');
const Controllers = require('../controllers');

const router = express.Router();


router.get('/', async (req, res, next) => {
  const statuses = await Controllers.Information.getAll();
  res.json({
    health: 'good',
    statuses
  });
});

router.get('/logs', async (req, res, next) => {
  const logs = await Controllers.Information.log.getAll();
  res.json(logs);
});

router.post('/ops', async (req, res, next) => {
  if (req.body.ops) {
    switch (req.body.ops) {
      case 'start-agent':
        cr.startJob();
        break;
      case 'stop-agent':
        cr.stopJob();
        break;
      case 'start-agent-once':
        cr.doOnce();
        break;
      default:
        return res.status(400).json({
          status: 'command unrecognized',
          availableCommands: [
            'start-agent',
            'stop-agent',
            'start-agent-once',
          ]
        });
    }
    return res.json({
      status: 'command acknowledged'
    });
  }
  return res.status(401).json({
    errorMessage: 'do something with your lyf man...'
  });
});

module.exports = router;

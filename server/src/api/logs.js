const { Router } = require('express');

const LogEntry = require('./../models/logEntry');
const router =  Router();

router.get('/', async (req, res, next) => {
  // console.log("res.json(entries)");
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  // console.log("req.body");
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});


module.exports = router;

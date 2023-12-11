const express = require('express');
const router = express.Router();

router.get('/grades', (req, res) => {
    res.send('This is the grade');
});

router.get('/grades/:id', (req, res) => {
    res.send('This is the grade');
});

router.put('/grades/:id', (req, res) => {
    const gradeId = req.params.id;

    res.send(`Grade ${gradeId} updated successfully`);
});

router.delete('/grades/:id', (req, res) => {
  const gradeId = req.params.blogId;
  //
  //

  res.send(`Grade ${gradeId} deleted successfully`);
});

module.exports = router;
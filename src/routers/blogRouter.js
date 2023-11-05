const express = require('express');
const router = express.Router();

router.get('/blogs', (req, res) => {
    res.send('This is the blogs');
});

// Admin create blog route
router.post('/admin/blogs', (req, res) => {
  const { title, content } = req.body;
  // Code to save the blog entry 
  //
  //

  res.send('Blog created successfully');
});

// Admin update blog route
router.put('/admin/blogs/:blogId', (req, res) => {
  const blogId = req.params.blogId;
  // Code to update the blog entry 
  //

  res.send(`Blog ${blogId} updated successfully`);
});

// Admin delete blog route
router.delete('/admin/blogs/:blogId', (req, res) => {
  const blogId = req.params.blogId;
  //
  //

  res.send(`Blog ${blogId} deleted successfully`);
});

module.exports = router;
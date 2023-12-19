const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const News = require('../models/News');
const Admin = require('../models/Admin'); 

// Fetch all news articles
router.get('/api/news', async (req, res) => {
  try {
    const newsArticles = await News.findAll();
    res.json(newsArticles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

// For admins

// Create a new news article
router.post('/api/admin/news', authenticateToken, async (req, res) => {
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { title, content, image } = req.body;

  try {
    const newsArticle = await News.create({
      admin_id: req.user.id,
      title,
      content,
      image,
    });

    res.json(newsArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news article' });
  }
});

// Get a specific news article
router.get('/api/news/:newsId', async (req, res) => {
  const { newsId } = req.params;
  
  try {
    const newsArticle = await News.findByPk(newsId);

    if (!newsArticle) {
      return res.status(404).json({ error: 'News article not found' });
    }

    res.json(newsArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news article' });
  }
});

// Update a news article
router.put('/api/news/:newsId', authenticateToken, async (req, res) => {
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { newsId } = req.params;
  const { title, content, image } = req.body;

  try {
    const newsArticle = await News.findByPk(newsId);

    if (!newsArticle) {
      return res.status(404).json({ error: 'News article not found' });
    }

    newsArticle.title = title;
    newsArticle.content = content;
    newsArticle.image = image;
    await newsArticle.save();

    res.json(newsArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news article' });
  }
});

// Delete a news article
router.delete('/api/news/:newsId', authenticateToken, async (req, res) => {
  if (req.model !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { newsId } = req.params;

  try {
    const newsArticle = await News.findByPk(newsId);

    if (!newsArticle) {
      return res.status(404).json({ error: 'News article not found' });
    }

    await newsArticle.destroy();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news article' });
  }
});

module.exports = router;
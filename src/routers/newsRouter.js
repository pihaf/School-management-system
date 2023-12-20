const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

const newsController = require('../controllers/newsController');

router.get('/api/news', newsController.getAllNewsArticles);
router.get('/api/news/:newsId', newsController.getNewsArticleById);

// For admins
router.post('/api/admin/news', authenticateToken, newsController.createNewsArticle);
router.put('/api/news/:newsId', authenticateToken, newsController.updateNewsArticle);
router.delete('/api/news/:newsId', authenticateToken, newsController.deleteNewsArticle);

module.exports = router;
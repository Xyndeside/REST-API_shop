const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: API для управления списком желаемого
 */

/**
 * @swagger
 * /wishlist:
 *   get:
 *     tags: [Wishlist]
 *     summary: Получить список желаемого пользователя
 *     responses:
 *       200:
 *         description: Список желаемого успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     description: ID товара
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /wishlist:
 *   delete:
 *     tags: [Wishlist]
 *     summary: Очистить список желаемого
 *     responses:
 *       200:
 *         description: Список желаемого успешно очищен
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /wishlist/{productId}:
 *   post:
 *     tags: [Wishlist]
 *     summary: Добавить товар в список желаемого
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар успешно добавлен в список желаемого
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /wishlist/{productId}:
 *   delete:
 *     tags: [Wishlist]
 *     summary: Удалить товар из списка желаемого
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар успешно удален из списка желаемого
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get('/', wishlistController.getWishlist);
router.delete('/', wishlistController.clearWishlist);
router.post('/:productId', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;
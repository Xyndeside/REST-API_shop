const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: API для управления корзиной
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     tags: [Cart]
 *     summary: Добавить товар в корзину
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID товара
 *                 example: "64f1a2b3c4d5e6f7g8h9i0j1"
 *               quantity:
 *                 type: integer
 *                 description: Количество товара
 *                 example: 2
 *     responses:
 *       200:
 *         description: Товар успешно добавлен в корзину
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     tags: [Cart]
 *     summary: Получить содержимое корзины
 *     responses:
 *       200:
 *         description: Успешный ответ с содержимым корзины
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
 *                   quantity:
 *                     type: integer
 *                     description: Количество товара
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /cart:
 *   put:
 *     tags: [Cart]
 *     summary: Обновить количество товара в корзине
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: ID товара
 *                 example: "64f1a2b3c4d5e6f7g8h9i0j1"
 *               quantity:
 *                 type: integer
 *                 description: Новое количество товара
 *                 example: 3
 *     responses:
 *       200:
 *         description: Количество товара успешно обновлено
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /cart:
 *   delete:
 *     tags: [Cart]
 *     summary: Удалить все товары из корзины
 *     responses:
 *       200:
 *         description: Корзина успешно очищена
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     tags: [Cart]
 *     summary: Удалить товар из корзины по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар успешно удален из корзины
 *       400:
 *         description: Неверный ID товара
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/', cartController.updateCartItem);
router.delete('/', cartController.deleteAllItems);
router.delete('/:id', cartController.deleteItemById);

module.exports = router;
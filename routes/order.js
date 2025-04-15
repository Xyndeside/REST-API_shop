const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const isAdmin = require('../middleware/isAdminMiddleware');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API для управления заказами
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Создать новый заказ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID товара
 *                     quantity:
 *                       type: integer
 *                       description: Количество товара
 *     responses:
 *       201:
 *         description: Заказ успешно создан
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Получить заказы текущего пользователя
 *     responses:
 *       200:
 *         description: Список заказов пользователя
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID заказа
 *                   status:
 *                     type: string
 *                     description: Статус заказа
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         productId:
 *                           type: string
 *                           description: ID товара
 *                         quantity:
 *                           type: integer
 *                           description: Количество товара
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /orders/from-cart:
 *   post:
 *     tags: [Orders]
 *     summary: Создать заказ из корзины
 *     responses:
 *       201:
 *         description: Заказ успешно создан из корзины
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /orders/all:
 *   get:
 *     tags: [Orders]
 *     summary: Получить все заказы (только для администратора)
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Фильтр по статусу заказа
 *     responses:
 *       200:
 *         description: Список всех заказов
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Удалить заказ по ID (только для администратора)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID заказа
 *     responses:
 *       200:
 *         description: Заказ успешно удален
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     tags: [Orders]
 *     summary: Изменить статус заказа (только для администратора)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID заказа
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 description: Новый статус заказа
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Статус заказа успешно обновлен
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.post('/', orderController.createOrder);
router.get('/', orderController.getMyOrders);
router.post('/from-cart', orderController.createOrderFromCart);
router.get('/all', isAdmin, orderController.getAllOrdersByParam);
router.delete('/:id', isAdmin, orderController.deleteOrderById);
router.put('/:id', isAdmin, orderController.changeOrderStatus);

module.exports = router;
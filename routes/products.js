const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API для управления товарами
 */

/**
 * @swagger
 * /products/search:
 *   get:
 *     tags: [Products]
 *     summary: Поиск товаров
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Поисковый запрос
 *     responses:
 *       200:
 *         description: Результаты поиска товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID товара
 *                   name:
 *                     type: string
 *                     description: Название товара
 *                   price:
 *                     type: number
 *                     description: Цена товара
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags: [Products]
 *     summary: Получить список всех товаров
 *     responses:
 *       200:
 *         description: Список всех товаров
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID товара
 *                   name:
 *                     type: string
 *                     description: Название товара
 *                   price:
 *                     type: number
 *                     description: Цена товара
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /products:
 *   post:
 *     tags: [Products]
 *     summary: Создать новый товар
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название товара
 *               price:
 *                 type: number
 *                 description: Цена товара
 *               description:
 *                 type: string
 *                 description: Описание товара
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Получить товар по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Информация о товаре
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID товара
 *                 name:
 *                   type: string
 *                   description: Название товара
 *                 price:
 *                   type: number
 *                   description: Цена товара
 *                 description:
 *                   type: string
 *                   description: Описание товара
 *       404:
 *         description: Товар не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Обновить товар по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название товара
 *               price:
 *                 type: number
 *                 description: Цена товара
 *               description:
 *                 type: string
 *                 description: Описание товара
 *     responses:
 *       200:
 *         description: Товар успешно обновлен
 *       404:
 *         description: Товар не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Удалить товар по ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID товара
 *     responses:
 *       200:
 *         description: Товар успешно удален
 *       404:
 *         description: Товар не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */

router.get('/search', productController.searchProducts);
router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProductById);
router.delete('/:id', productController.deleteProductById);

module.exports = router;

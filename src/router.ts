import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from 'express-validator'
import { handleInputErrors } from "./middleware";

const router = Router()

/** 
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object 
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor curvo
 *         price:
 *           type: number
 *           description: The product price
 *           example: 3000
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: 
 *      - Products
 *     description: Retrieve a list of products from the database
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     description: Return a product based on the provided unique ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid id
 *       404:
 *         description: Product not found
 */
router.get('/:id', 
  param('id').isNumeric().withMessage('El id no es valido'),
  handleInputErrors,
  getProductById
)

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Returns a new record in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo"
 *               price: 
 *                 type: number
 *                 example: 399
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid input data
 */
router.post("/", 
    //valdiacion
    body('name', 'El nombre es obligatorio').isString().notEmpty(),
    body('price')
              .isNumeric().withMessage('El precio debe ser un número')
              .notEmpty().withMessage('El precio es obligatorio')
              .custom((value) => value > 0).withMessage('El precio debe ser mayor a 0'),
  handleInputErrors,
  createProduct
)

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Monitor Curvo"
 *               price: 
 *                 type: number
 *                 example: 399
 *               availability:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid ID 
*/
router.put('/:id', 
  param('id').isNumeric().withMessage('El id no es valido'),
  body('name', 'El nombre es obligatorio').isString().notEmpty(),
  body('price')
            .isNumeric().withMessage('El precio debe ser un número')
            .notEmpty().withMessage('El precio es obligatorio')
            .custom((value) => value > 0).withMessage('El precio debe ser mayor a 0'),
  body('availability').isBoolean().withMessage('La disponibilidad debe ser un booleano'),
  handleInputErrors,
  updateProduct 
)

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Updates a product availability
 *     tags:
 *       - Products
 *     description: Returns the updated availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - invalid ID
 *       404:
 *         description: Product not found
 * 
*/
router.patch('/:id', 
  param('id').isNumeric().withMessage('El id no es valido'),
  handleInputErrors,
  updateAvailability
)

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deletes a product by a given ID
 *     tags:
 *       - Products
 *     description: Returns a confirmation message
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               value: 'Product deleted'
 *       400:
 *         description: Bad request - invalid ID
 *       404:
 *         description: Product not found
 */

router.delete('/:id',
  param('id').isNumeric().withMessage('El id no es valido'),
  handleInputErrors,
  deleteProduct
)

export default router
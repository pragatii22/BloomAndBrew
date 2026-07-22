const router = require('express').Router();
const upload = require('../middleware/upload');
const verifyToken = require('../middleware/authMiddleware');
const adminOnly = require('../middleware/roleMiddleware');

const {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controller/productController');

router.post('/add', verifyToken, adminOnly, upload.single('image'), addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', verifyToken, adminOnly, upload.single('image'), updateProduct);
router.delete('/:id', verifyToken, adminOnly, deleteProduct);
module.exports = router;

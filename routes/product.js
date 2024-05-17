const router = require("express").Router();
const service = require("../service/productService");
router.post("/addProduct", service.addProduct);
router.get("/getProduct", service.getAllProduct);
router.delete("/delete/:productId", service.deleteProduct);
router.put("/update/:productId", service.updateProduct);
module.exports = router;

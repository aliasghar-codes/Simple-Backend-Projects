import express from "express"
import { addProduct, getAllProducts, findProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js"

const router = express.Router();

router.post("/addproduct", addProduct);
router.get("/getproducts", getAllProducts);
router.get("/:id", findProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
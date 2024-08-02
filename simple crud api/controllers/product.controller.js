import productModel from "../models/product.model.js"

const addProduct = async (req, res) => {
    const { name, price, quantity, description, image } = req.body;

    try {

        if (!name || !price || !quantity || !description) {
            return res.status(409).json({ message: "Please fill full form" });
        }

        const product = await productModel.findOne({ name });

        if (product) {
            return res.status(409).json({ message: "Product with that name already exists" })
        }

        const newProduct = await productModel.create({ name, price, quantity, description, image })

        res.status(200).json({ message: "Product created successfully", newProduct })

    }
    catch (error) {

        console.log("Error occured: ", error.message)

    }

}

const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel.find({});

        if (products.length === 0) {
            return res.status(409).json({ message: "No products found" });
        }

        res.status(200).json({ message: "Success", products });
    }
    catch (error) {
        res.status(500).json({ message: `Error occured:  ${error.message}` })
    }
}

const findProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productModel.findOne({ _id: id })

        if (product) {
            return res.status(200).json({ message: "Success", product })
        }

        res.status(400).json({ message: "Product not found" })

    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const product = await productModel.findById(id);

        if (!product) {
            return res.status(400).json({ message: "Product not found" });
        }

        await productModel.findByIdAndUpdate(id, body)

        const updatedProduct = await productModel.findById(id);

        res.status(200).json({ message: "Success", updatedProduct });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if(!product){
        return res.status(400).json({ message: "Product not found."})
    }

    await productModel.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully."});
}

export {

    addProduct,
    getAllProducts,
    findProduct,
    updateProduct,
    deleteProduct

}
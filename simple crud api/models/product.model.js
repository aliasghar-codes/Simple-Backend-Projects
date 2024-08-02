import mongoose from "mongoose"

const productSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: [true, "Name is required to create product"]
    },
    quantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, "Please provide product description"]
    },
    image: {
        type: String,
        required: false
    }
}, { timestamps: true })

export default mongoose.model("Product", productSchema)
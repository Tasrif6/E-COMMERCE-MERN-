import productModel from "../models/productModel.js";
import fs from "fs";



export const createProductController = async (req,res) => {
    try {
        const {name, slug, description, price, category, quantity, shipping } = req.fields;
        const {photo} = req.files;
        switch (true) {
            case !name:
                return res.status(500).send({error: 'Name is required'});
            case !description:
                return res.status(500).send({error: 'Description is required'});
            case !price:
                return res.status(500).send({error: 'Price is required'});
            case !quantity:
                return res.status(500).send({error: 'Quantity is required'});
            case photo && photo.size > 1000000:
                return res.status(500).send({error: 'Photo is required and should be less than 1mb'});
        };
        const products = new productModel({...req.fields, slug:slugify(name)});
        if (photo) {
            products.photo.data = readFileSync(photo.path);
            products.photo.contentType = photo.path;
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in creating product"
        });
    };
};

export const productPhotoController = async (req,res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo").populate("category");
        if (product.photo.data) {
            res.set("content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        };
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting product photo",
            error
        });
    };
};

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1});
        res.status(200).send({
            success:true,
            countTotal: products.length,
            message: 'All Products',
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in getting products',
            error: error.message,
        });
    };
};

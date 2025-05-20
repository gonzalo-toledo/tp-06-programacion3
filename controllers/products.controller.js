const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../db/products.json');

const readProducts = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

const writeProducts = (products) => {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

}

const getAllProducts = (req, res) => {
    let products = readProducts();

    res.json({data: products, status: 200, message: "productos obtenidos exitosamente"})
}

const getProductById = (req, res) => {
    let products = readProducts();
    const product = products.find(item => item.id === parseInt(req.params.id));
    if (!product) return res.json ({status: 404, message:"producto no encontrado"});

    res.json({data: product, status: 200, message: "producto obtenido exitosamente"})
}

const createProduct = (req, res) => {
    let products = readProducts();
    const newProduct = req.body;
    newProduct.id = products.length + 1;
    products.push(newProduct)
    writeProducts(products)

    res.json({data: newProduct, status: 201, message: "productos creado exitosamente"})
}

const updateProduct = (req, res) => {
    let products = readProducts();
    const product = products.find(item => item.id === parseInt(req.params.id));
    if (!product) return res.json ({status: 404, message:"producto no encontrado"});
    const {title, price} = req.body;
    product.title = title || product.title;
    product.price = price || product.price;
    writeProducts(products)

    res.json({data: product, status: 200, message: "producto actualizado exitosamente"})
}

const deleteProduct = (req, res) => {
    let products = readProducts();
    const product = products.find(item => item.id === parseInt(req.params.id));
    if (!product) return res.json ({status: 404, message:"producto no encontrado"});
    products = products.filter(item => item.id !== parseInt(req.params.id)); 
    writeProducts(products)

    res.json({data: product, status: 200, message: "producto eliminado exitosamente"})
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}

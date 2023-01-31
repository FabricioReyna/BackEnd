class ProductManager {
    constructor() {
        this.products = [];
        this.id = 0;
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        // Validar que todos los campos sean obligatorios
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo "code"
        let existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.log("Ya existe un producto con ese código");
            return;
        }

        // Crear un nuevo producto con un id autoincrementable
        this.id++;
        let newProduct = {
            id: this.id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        let product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Not found");
            return;
        }
        return product;
    }
}



const productManager = new ProductManager();
(async () => {
  
     productManager.addProduct("Producto 1", "Descripción del producto 1", 100, "https://via.placeholder.com/150", "123456", 10);
     productManager.addProduct("Producto 2", "Descripción del producto 2", 200, "https://via.placeholder.com/150", "123457", 20);
     productManager.addProduct("Producto 3", "Descripción del producto 3", 300, "https://via.placeholder.com/150", "123458", 30);
     productManager.addProduct("Producto 4", "Descripción del producto 4", 400, "https://via.placeholder.com/150", "123459", 40);
     productManager.addProduct("Producto 5", "Descripción del producto 5", 500, "https://via.placeholder.com/150", "123460", 50);

})();

console.log(productManager.getProducts());
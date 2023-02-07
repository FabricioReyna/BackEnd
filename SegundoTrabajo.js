const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }

  isEmpty(toCheck) {
    if (toCheck != "") {
      return true;
    } else {
      throw new Error(`One or more info is empty`);
    }
  }

  async addProduct({ title, description, price, thumbnail, code, stock }) {
    if (
      this.isEmpty(title) &&
      this.isEmpty(description) &&
      this.isEmpty(price) &&
      !isNaN(price) &&
      this.isEmpty(thumbnail) &&
      this.isEmpty(code) &&
      this.isEmpty(stock) &&
      !isNaN(stock)
    ) {
      let elements = await fs.promises.readFile(this.path, "utf-8");
      elements = JSON.parse(elements);

      if (elements.find((e) => e.code === code) === undefined) {
        elements.push(
          new Products(
            +elements.length,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
          )
        );
        await fs.promises.writeFile(this.path, JSON.stringify(elements));
      } else {
        console.log("Code repeated");
      }
    } else {
      console.log("One or more elementes are empty");
    }
  }

  async updateProduct(id, dataToUpdate) {
    let elements = await fs.promises.readFile(this.path, "utf-8");
    elements = JSON.parse(elements);
    let newData = elements.filter((item) => item.id !== id);
    newData = [...newData, { id, ...dataToUpdate }];
    await fs.promises.writeFile(this.path, JSON.stringify(newData));
  }

  async deleteProduct(id) {
    let elements = await fs.promises.readFile(this.path, "utf-8");
    elements = JSON.parse(elements);
    let newData = elements.filter((item) => item.id !== id);
    await fs.promises.writeFile(this.path, JSON.stringify(newData));
  }

  async getProducts() {
    let elements = await fs.promises.readFile(this.path, "utf-8");
    console.log("Obtener todos los productos", JSON.parse(elements));
    return;
  }

  async getProductById(id) {
    let elements = await fs.promises.readFile(this.path, "utf-8");
    elements = JSON.parse(elements);

    let isId = elements.find((e) => e.id === id);
    if (isId) {
      console.log("Producto buscado por id: ", isId);
      return isId;
    } else {
      throw new Error("Id not Found");
    }
  }
}

class Products {
  id;
  title;
  description;
  price;
  thumbnail;
  code;
  stock;
  constructor(id, title, description, price, thumbnail, code, stock) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

async function main() {
  const productManager = new ProductManager("./data.json");

  await productManager.addProduct({
    title: "Car",
    description: "V8",
    price: 50000,
    thumbnail: "carv8.jpg",
    code: 45798,
    stock: 3,
  });
  await productManager.addProduct({
    title: "Car2",
    description: "V6",
    price: 40000,
    thumbnail: "carv6.jpg",
    code: 45791,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car3",
    description: "L4",
    price: 32000,
    thumbnail: "carL4.jpg",
    code: 45795,
    stock: 5,
  });
  await productManager.addProduct({
    title: "Car4",
    description: "L4",
    price: 32000,
    thumbnail: "carL4.jpg",
    code: 45795,
    stock: 5,
  });
  await productManager.getProducts();
  await productManager.getProductById(1);
  await productManager.updateProduct(1, {
    title: "CarUPDATED4",
    description: "L4",
    price: 32000,
    thumbnail: "carL4.jpg",
    code: 45795,
    stock: 5,
  });
  //await productManager.deleteProduct(3);
}

main();

const jwt = require("jsonwebtoken");
const { Category, Product } = require("../../db");

const { getCategoriesNameDb, getProductsIdDb } = require("../utils/getDataDb");

const modifyProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, price, stock, type, image, category } = req.body;

    jwt.verify(req.token, "secretKey", async (err, data) => {
      if (err) {
        res.json({
          msg: "acceso denegado",
        });
      } else {
        if (id) {
          let productForId = await getProductsIdDb(id);

          if (!productForId) {
            res.status(404).json({
              msg: "Producto no existente",
            });
          } else {
            if (category) {
              let categoryDb = await getCategoriesNameDb(category);
              if (!categoryDb) {
                let categoryCreated = await Category.create({ name: category });

                await Product.update(
                  {
                    name: name || name,
                    description: description || description,
                    price: price || price,
                    stock: stock || stock,
                    type: type || type,
                    image: image || image,
                    categoryId: categoryCreated.id,
                  },
                  { where: { id } }
                );

                res.json({
                  msg: "Producto actualizado, y categoria creada correctamente",
                });
              } else {
                await Product.update(
                  {
                    name: name || name,
                    description: description || description,
                    price: price || price,
                    stock: stock || stock,
                    type: type || type,
                    image: image || image,
                    categoryId: categoryDb.id,
                  },
                  { where: { id } }
                );

                res.json({
                  msg: "Producto actualizado correctamente",
                });
              }
            } else {
              await Product.update(
                {
                  name: name || name,
                  description: description || description,
                  price: price || price,
                  stock: stock || stock,
                  type: type || type,
                  image: image || image,
                },
                { where: { id } }
              );

              res.json({
                msg: "Producto actualizado correctamente",
              });
            }
          }
        } else {
          res.status(404).json({
            msg: "Debe ingresar un id de producto para ser actualizado",
          });
        }
      }
    });
  } catch (err) {
    console.log("error al modificar producto", err);
  }
};

module.exports = { modifyProduct };

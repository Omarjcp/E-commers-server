// filtra array de productos ingresado en el parametro y busca si
// existe el nombre pasado por parametro

let filterForName = (arrayToFilter, name) => {
  let arrayFiltered = arrayToFilter.filter((product) => {
    if (product.name.toLowerCase().includes(name.toLowerCase())) return product;
  });
  return arrayFiltered;
};

module.exports = {
  filterForName,
};

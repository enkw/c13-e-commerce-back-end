// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: '', // ???????????????
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: '', // ADD FOREIGN KEY ONCE WE FIGURE OUT WHERE THE ASSOCIATION NEEDS TO BE
  onDelete: 'CASCADE',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, { through: 'ProductTag'});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, { through: 'ProductTag'});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

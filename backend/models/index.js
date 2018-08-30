const {
  Sequelize,
  Op,
} = require('sequelize')

const db = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  operatorsAliases: false,
  logging: false,
})

const Company = db.import('./companies.js')
const Product = db.import('./products.js')
const Shipment = db.import('./shipments.js')
const Shipment_Products = db.import('./shipment_products.js')

Company.hasOne(Product)
Company.hasOne(Shipment)
Shipment_Products.belongsTo(Shipment)
Shipment_Products.belongsTo(Product)

db.authenticate()
  .then(async() => {
    console.log(`\nConnected to "${process.env.POSTGRES_URI}".`)
    // const sp = await Shipment_Products.findAll()
    // const p = await Product.findAll()
    // const c = await Company.findAll()
    // const s = await Shipment.findAll()
    // console.log(sp.length)
    // console.log(p.length)
    // console.log(c.length)
    // console.log(s.length)
  })
  .catch((error) => {
    console.log(`\nUnable to connect to database: ${error}`)
    process.exit(1)
  })

module.exports = {
  // db,
  Op,
  Company,
  Product,
  Shipment,
  Shipment_Products,
}

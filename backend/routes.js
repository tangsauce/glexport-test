const express = require('express')
const router = express.Router()
const _ = require('lodash')

const {
  // db,
  Op,
  Company,
  Product,
  Shipment,
  Shipment_Products,
} =  require('./models/')

router.use('/shipments', async (req, res) => {
  try {
    const { company_id } = req.query
    if (!company_id) {
      res.status(422).json({ errors: ['company_id is required'] })
    }
    const shipment_products = await Shipment_Products.findAll(makeQuery(req))
    const records = wrangle(shipment_products)
    res.json({ records })
  } catch (err) {
    throw("\nError in shipments " + err)
  }
})

// query builder for Sequelize call
function makeQuery(req) {
  const {
    company_id,
    sort, direction,
    international_transportation_mode,
    page, per = 4, } = req.query
  const offset = page ? parseInt(per) * (parseInt(page) - 1) : 0
  const order = [
    sort ? [Shipment, sort, direction] : [Shipment, 'id', 'asc']
  ]
  const productWhere = { company_id }
  const shipmentWhere = international_transportation_mode 
    ? { company_id, international_transportation_mode }
    : { company_id }
  return {
    offset,
    order,
    limit: per,
    include: [
      { model: Shipment, where: shipmentWhere },
      { model: Product,  where: productWhere },
    ],
  }
}

// Formats data the way the tests expect
function wrangle(shipment_products) {
  const records = []
  _.forEach(shipment_products, x => {
    const id = x.shipment.id
    const prod = {
      quantity: x.quantity,
      ..._.pick(x.product, ['description', 'sku', 'id']),
    }
    // log(n) operation _.indexOf is used rather than constant time lookup
    // with a hashmap because the hashmap will not preserve the order
    // of the Shipments which are sorted by time
    const idx = _.indexOf(_.map(records, x => x.id), id)
    if (idx == -1) {
      prod.active_shipment_count = 1
      records.push({
        id,
        name: x.shipment.name,
        products: [ prod ],
      })
    } else {
      prod.active_shipment_count = records[idx].products.length + 1
      records[idx].products.push(prod)
    }
  })
  return records
}

module.exports = router

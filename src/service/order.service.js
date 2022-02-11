const order = require('../model/order.model')
class orderService {
    async createOrder(params){
        return await order.create(params)
    }
}

module.exports = new orderService()
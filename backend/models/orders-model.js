const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema({
    OrderType: { type: String, required: false },
    OrderAmount: { type: Number, required: false },
    CustomerName: { type: String, required: false },
    DeliveryCity: { type: String, required: false },
    PickupCity: { type: String, required: false },

    fragility: { type: String, required: false },
    weight: { type: Number, required: false },

    OrderDetails: { type: String, required: false },

    OrderDate: { type: String, required: true },
    RiderAssignedDate: { type: String, required: false },
    RiderDeliveredDate: { type: String, required: false },
    RiderReturnDate :{ type: String, required: false },

    CodType: { type: String, required: false },
    RemarksText: { type: String, required: false },

    CustomerContactNo: { type: Number, required: false },
    DeliveryAddress: { type: String, required: false },
    PickupAddress: { type: String, required: false },
    status: { type: String, required: false },
    Dimensions: { type: String, required: false },
    creatorName: { type: String, required: false },
    ridersId: { type: String, required: false },

    ridersIdForPickup: { type: String, required: false },
    ridersIdForDelivery: { type: String, required: false },
    ridersIdForReturn: { type: String, required: false },

    trackingId: { type: String, required: false },
    returnAttempt: { type: String, required: false },

    accountsStatus: { type: String, required: false },
    
    cancelReasons: { type: String, required: false },
    creator: { type: mongoose.Types.ObjectId, required: false, ref: 'UserModel' }, // ref: 'UserModel'
})

module.exports = mongoose.model('OrdersModel', ordersSchema)
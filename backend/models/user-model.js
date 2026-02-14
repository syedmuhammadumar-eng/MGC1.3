const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    CompanyName: { type: String, required: true },
    PhoneNo: { type: Number, required: true },
    PickupAddress: { type: String, required: false },
    // cnicCopyImage: "",
    Cnic: { type: Number, required: false },
    personOfContact: { type: String, required: false },
    Email: { type: String, required: true },
    BankName: { type: String, required: false },
    AccNo: { type: Number, required: false },
    BranchCode: { type: String, required: false },
    IBAN: { type: Number, required: false },
    AccTitle: { type: String, required: false },
    BranchName: { type: String, required: false },
    SwiftCode: { type: Number, required: false },
    password: { type: String, required: true},
    orders:[{ type: mongoose.Types.ObjectId, ref: 'OrdersModel' }], // to add relation b/w user and place and ref is to connect with other collection and array to allow array
    status:{ type: String, required: false},
    storeLink: { type: String, required: false },
})

module.exports = mongoose.model('UserModel', userSchema)
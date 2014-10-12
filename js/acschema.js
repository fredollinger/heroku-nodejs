
var userSchema = new mongoose.Schema({
    address: { type: String },
    plate_number: { type: String },
    number: { type: String },
    price: { type: Number, min: 0 },
    date: { type: Number, min: 0 },
    request: { type: String } // "buy" or "sell"
}); // END userSchema

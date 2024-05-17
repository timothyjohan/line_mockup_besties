const { default: mongoose } = require("mongoose");

const PinnedSchema = new mongoose.Schema({
    id:{
        type: Number,
        required:true
    },
    context:{
        type: String,
        required:true
    },
    from:{
        type: Number,
        required:true
    },
    to:{
        type: Number,
        required:true
    },
})

module.exports = mongoose.model('pinneds', PinnedSchema)
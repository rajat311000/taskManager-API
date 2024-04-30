const mongoose = require('mongoose')

const taskSchema = mongoose.Schema(
    {
       id: String,
       description :String,
       
    },
    {
        timestamps: true
    }
)


const task = mongoose.model('Product', taskSchema);

module.exports = task;
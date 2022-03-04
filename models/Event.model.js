const { Schema, model } = require("mongoose");

const EventSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

EventSchema.method('toJSON', function(){
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("Event", EventSchema);

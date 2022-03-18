const tokenSchema = new Schema({

    userId:{

        type: Schema.type.objectId,
        require:true,
        ref:"user",
        unique:true,
    },
    token:{type: String, required:true},
    createdAt:{ typel: Date, default: Date.now(), expires: 3600} //1hOUR


});

module.exports = mongoose.model("token", tokenSchema);
const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    location: { type: String },
    contactNumber: { type: String },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    places: {
      type: [
        {
          type: { type: String, required: true },
          number: { type: Number, required: true }, // e.g. Table 1, Dom 1
          floor: {
            type: String,
            enum: [
              "Ground Floor",
              "First Floor",
              "Second Floor",
              "Third Floor",
              "Fourth Floor",
              "Fifth Floor",
            ],
            required: true,
          },
          capacity: { type: Number, default: 4 }, // how many people it fits
          status: {
            type: String,
            enum: ["available", "occupied", "reserved"],
            default: "available",
          },
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);

const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: ObjectId, required: true, ref: "User" }
});

module.exports = mongoose.model('Campaign', CampaignSchema);

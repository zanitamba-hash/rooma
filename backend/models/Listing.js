const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    city: { type: String, required: true },
    university: { type: String, required: true }, // Université proche
    type: { 
        type: String, 
        enum: ['Chambre', 'Studio', 'Colocation', 'Appartement'], 
        required: true 
    },
    images: [{ type: String }], // URLs des images
    amenities: [{ type: String }], // Wifi, Meublé, etc.
    
    // Champs spécifiques Colocation
    isColocation: { type: Boolean, default: false },
    colocVibe: { type: String, enum: ['Studieuse', 'Festive', 'Chill', 'None'], default: 'None' },
    colocGender: { type: String, enum: ['Mixed', 'Girls', 'Boys', 'None'], default: 'None' },
    currentRoommates: [{
        name: String,
        age: Number,
        occupation: String
    }],
    spotsLeft: { type: Number, default: 1 },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isVerified: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', listingSchema);
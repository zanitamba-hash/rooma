const Listing = require('../models/Listing');

// @desc    Get all listings
// @route   GET /api/listings
exports.getListings = async (req, res) => {
    try {
        const { city, type, minPrice, maxPrice, university } = req.query;
        
        // Build Query
        let query = {};
        
        if (city) query.city = { $regex: city, $options: 'i' };
        if (university) query.university = { $regex: university, $options: 'i' };
        if (type) query.type = type;
        
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        const listings = await Listing.find(query).populate('owner', 'name isVerified');
        res.json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('owner', 'name isVerified avatar');
        if (listing) {
            res.json(listing);
        } else {
            res.status(404).json({ message: 'Annonce non trouvée' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a listing
// @route   POST /api/listings
// @access  Private (Owner only)
exports.createListing = async (req, res) => {
    try {
        const { title, description, price, city, university, type, amenities, isColocation, colocVibe, colocGender, spotsLeft } = req.body;

        const listing = new Listing({
            title,
            description,
            price,
            city,
            university,
            type,
            amenities,
            isColocation,
            colocVibe,
            colocGender,
            spotsLeft,
            images: req.body.images || ["https://picsum.photos/800/600"], // Default mock image if none provided
            owner: req.user._id // Assumes authMiddleware adds user to req
        });

        const createdListing = await listing.save();
        res.status(201).json(createdListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
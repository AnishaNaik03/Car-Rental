
// const express = require("express");
// const router = express.Router();
// const bookingController = require("../controllers/bookingControllers");

// router.post("/bookings", bookingController.createBooking);
// router.get("/bookings", bookingController.getBookings);

// module.exports = router;
const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingControllers");

// Create booking
router.post("/", bookingController.createBooking);

// Get all bookings
router.get("/", bookingController.getBookings);

module.exports = router;

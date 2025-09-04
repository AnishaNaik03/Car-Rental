const { Booking } = require("../models");

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
     const existingBooking = await Booking.findOne({
      where: {
        vehicleId,
        startDate,  // you can also add an Op.between check for overlapping
        endDate,
      },
    });

    if (existingBooking) {
      return res.status(400).json({ error: "This vehicle is already booked for the selected dates." });
    }
    const booking = await Booking.create({
      firstName,
      lastName,
      vehicleId,
      startDate,
      endDate,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "This vehicle is already booked for the selected dates." });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
};

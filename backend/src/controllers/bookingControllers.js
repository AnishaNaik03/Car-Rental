// const { Booking } = require("../models"); // Sequelize model (or whatever ORM you use)

// // Create new booking
// exports.createBooking = async (req, res) => {
//   try {
//     const { customerName, vehicleId, startDate, endDate } = req.body;
//     console.log("Booking request body:", req.body);

//     const booking = await Booking.create({
//       customerName,
//       vehicleId,
//       startDate,
//       endDate,
//     });

//     res.status(201).json(booking);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to create booking" });
//   }
// };

// // Get all bookings
// exports.getBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.findAll();
//     res.json(bookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch bookings" });
//   }
// };
const { Booking } = require("../models"); // Sequelize model

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
    console.log("Booking request body:", req.body);

    const customerName = `${firstName.trim()} ${lastName.trim()}`;

    const booking = await Booking.create({
      customerName,
      vehicleId,
      startDate,
      endDate,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create booking" });
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


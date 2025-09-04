const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
  origin: "http://localhost:5173",   // allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/types', require('./src/routes/types'));
app.use('/api/vehicles', require('./src/routes/vehicles'));
app.use('/api/bookings', require('./src/routes/api'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

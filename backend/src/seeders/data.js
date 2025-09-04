'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Insert vehicle types
    await queryInterface.bulkInsert('VehicleTypes', [
      { name: 'Hatchback', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'SUV', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Sedan', wheels: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cruiser', wheels: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // Insert vehicles (models) — assume IDs are 1..4 in the VehicleTypes table
    await queryInterface.bulkInsert('Vehicles', [
      // Hatchback (vehicleTypeId: 1)
      { vehicleTypeId: 1, name: 'Suzuki Swift', createdAt: new Date(), updatedAt: new Date() },
      { vehicleTypeId: 1, name: 'Maruti Alto', createdAt: new Date(), updatedAt: new Date() },

      // SUV (vehicleTypeId: 2)
      { vehicleTypeId: 2, name: 'Hyundai Creta', createdAt: new Date(), updatedAt: new Date() },
      { vehicleTypeId: 2, name: 'Kia Seltos', createdAt: new Date(), updatedAt: new Date() },

      // Sedan (vehicleTypeId: 3)
      { vehicleTypeId: 3, name: 'Honda City', createdAt: new Date(), updatedAt: new Date() },
      { vehicleTypeId: 3, name: 'Maruti Dzire', createdAt: new Date(), updatedAt: new Date() },

      // Cruiser (bike) (vehicleTypeId: 4)
      { vehicleTypeId: 4, name: 'Royal Enfield Classic 350', createdAt: new Date(), updatedAt: new Date() },
      { vehicleTypeId: 4, name: 'Jawa Classic', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};

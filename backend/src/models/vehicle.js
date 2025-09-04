'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    name: { type: DataTypes.STRING, allowNull: false }
  }, {});
  Vehicle.associate = function(models) {
    Vehicle.belongsTo(models.VehicleType, { foreignKey: 'vehicleTypeId' });
    Vehicle.hasMany(models.Booking, { foreignKey: 'vehicleId', onDelete: 'CASCADE' });
  };
  return Vehicle;
};

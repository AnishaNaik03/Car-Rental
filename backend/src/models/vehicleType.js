'use strict';
module.exports = (sequelize, DataTypes) => {
  const VehicleType = sequelize.define('VehicleType', {
    name: { type: DataTypes.STRING, allowNull: false },
    wheels: { type: DataTypes.INTEGER, allowNull: false } // 2 or 4
  }, {});
  VehicleType.associate = function(models) {
    VehicleType.hasMany(models.Vehicle, { foreignKey: 'vehicleTypeId', onDelete: 'CASCADE' });
  };
  return VehicleType;
};

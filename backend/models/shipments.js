/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shipments', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    international_transportation_mode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    international_departure_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'shipments',
    underscored: true,
  });
};

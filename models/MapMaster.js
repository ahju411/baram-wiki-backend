import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('MapMaster', {
  id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  name: {
    type: DataTypes.CHAR(50),
    unique: true,
  },
  level: DataTypes.CHAR(50),
  information: DataTypes.STRING(3000),
  images: DataTypes.STRING(3000),
}, {
  tableName: 'MAP_MASTER',
    timestamps: false,
  });
}



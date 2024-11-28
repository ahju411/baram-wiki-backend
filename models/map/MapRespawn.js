import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('MapRespawn', {
  map_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  mob_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
}, {
  tableName: 'MAP_RESPAWN',
    timestamps: false,
  });
}



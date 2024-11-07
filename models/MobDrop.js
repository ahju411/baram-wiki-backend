import { DataTypes } from 'sequelize';
    
export default (sequelize) => {
  return sequelize.define('MobDrop', {
  mob_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  item_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  range: DataTypes.DECIMAL(20, 2),
  vals: DataTypes.DECIMAL(20, 2),
}, {
  tableName: 'MOB_DROP',
    timestamps: false,
  });
}



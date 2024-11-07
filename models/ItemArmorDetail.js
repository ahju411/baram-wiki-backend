import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('ItemArmorDetail', {
  item_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  hp: DataTypes.INTEGER,
  mp: DataTypes.INTEGER,
  str: DataTypes.INTEGER,
  dex: DataTypes.INTEGER,
  int: DataTypes.INTEGER,
  hit: DataTypes.INTEGER,
  atk: DataTypes.INTEGER,
  vit: DataTypes.INTEGER,
  regen: DataTypes.INTEGER,
  mdefense: DataTypes.INTEGER,
  vals: DataTypes.STRING(1000),
}, {
  tableName: 'ITEM_ARMOR_DETAIL',
    timestamps: false,
  });
}


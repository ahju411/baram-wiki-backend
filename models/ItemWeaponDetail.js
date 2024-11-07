import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('ItemWeaponDetail', {
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
  e_str: DataTypes.INTEGER,
  vals: DataTypes.CHAR(50),
}, {
  tableName: 'ITEM_WEAPON_DETAIL',
  timestamps: false,
    comment: 'e_ : 착용에 필요한 필수 스텟',
  });
}



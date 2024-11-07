import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('ItemArmor', {
    item_id: {
      type: DataTypes.CHAR(50),
      primaryKey: true,
    },
    name: {
      type: DataTypes.CHAR(50),
      unique: true,
    },
    level: DataTypes.CHAR(50),
    sex: DataTypes.CHAR,
    job: {
    type: DataTypes.CHAR,
    comment: 's:공통 | w:전사 | n:도적 | p:주술사 | t:도사',
  },
  armor_ac: DataTypes.CHAR(50),
  strength: DataTypes.STRING(300),
  broken: DataTypes.CHAR,
  throw: DataTypes.CHAR,
  repair: DataTypes.CHAR,
    drop_place: DataTypes.STRING(300),
  }, {
    tableName: 'ITEM_ARMOR',
    timestamps: false,
  });
}

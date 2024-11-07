import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('MobMaster', {
  id: {
    type: DataTypes.CHAR(10),
    primaryKey: true,
  },
  name: {
    type: DataTypes.CHAR(50),
    unique: true,
  },
  level: DataTypes.BIGINT,
  hp: DataTypes.BIGINT,
  mp: DataTypes.BIGINT,
  exp: DataTypes.STRING(1000),
  defense: DataTypes.BIGINT,
  mdefense: DataTypes.BIGINT,
  mtype: DataTypes.CHAR,
  respawn: DataTypes.CHAR(50),
  information: DataTypes.STRING(3000),
  images: DataTypes.CHAR(50),
}, {
  tableName: 'MOB_MASTER',
    timestamps: false,
  });
}



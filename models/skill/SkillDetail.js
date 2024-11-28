import { DataTypes } from 'sequelize';
    
export default (sequelize) => {
  return sequelize.define('SkillDetail', {
    skill_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  item_id: {
    type: DataTypes.CHAR(50),
    primaryKey: true,
  },
  val: DataTypes.BIGINT,
  utype: DataTypes.CHAR,
  job: DataTypes.CHAR,
}, {
  tableName: 'SKILL_DETAIL',
    timestamps: false,
  });
}



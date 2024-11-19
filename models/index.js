import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import ItemMaster from './ItemMaster.js';
import MobMaster from './MobMaster.js';
import MobDrop from './MobDrop.js';
import MapMaster from './MapMaster.js';
import MapRespawn from './MapRespawn.js';
import SkillMaster from './SkillMaster.js';
import SkillDetail from './SkillDetail.js';
import Exp from './Exp.js';
import ItemViewLog from './ItemViewLog.js';

dotenv.config();

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'mysql',
		logging: false, // 디버깅 시 true로 변경 가능
		dialectOptions: {
			connectTimeout: 10000,
		},
	}
);

// 모델 정의
const models = {
	ItemMaster: ItemMaster(sequelize),
	MobMaster: MobMaster(sequelize),
	MobDrop: MobDrop(sequelize),
	MapMaster: MapMaster(sequelize),
	MapRespawn: MapRespawn(sequelize),
	SkillMaster: SkillMaster(sequelize),
	SkillDetail: SkillDetail(sequelize),
	Exp: Exp(sequelize),
	ItemViewLog: ItemViewLog(sequelize),
};

models.Sequelize = Sequelize;
models.Op = Sequelize.Op;

// 모델 관계 설정

// MobMaster와 MobDrop 간의 관계
models.MobMaster.hasMany(models.MobDrop, {
	foreignKey: 'mob_id',
	sourceKey: 'id',
});
models.MobDrop.belongsTo(models.MobMaster, {
	foreignKey: 'mob_id',
	targetKey: 'id',
});

// ItemMaster와 MobDrop 간의 관계
models.ItemMaster.hasMany(models.MobDrop, {
	foreignKey: 'item_id',
	sourceKey: 'id',
});
models.MobDrop.belongsTo(models.ItemMaster, {
	foreignKey: 'item_id',
	targetKey: 'id',
});

// MapMaster와 MapRespawn 간의 관계
models.MapMaster.hasMany(models.MapRespawn, { foreignKey: 'map_id' });
models.MapRespawn.belongsTo(models.MapMaster, { foreignKey: 'map_id' });

// MapRespawn과 MobMaster 간의 관계
models.MapRespawn.belongsTo(models.MobMaster, { foreignKey: 'mob_id' });
models.MobMaster.hasMany(models.MapRespawn, { foreignKey: 'mob_id' });

// SkillMaster와 SkillDetail 간의 관계
models.SkillMaster.hasMany(models.SkillDetail, {
	foreignKey: 'skill_id',
	sourceKey: 'id',
});
models.SkillDetail.belongsTo(models.SkillMaster, {
	foreignKey: 'skill_id',
	targetKey: 'id',
});

// SkillDetail과 ItemMaster 간의 관계
models.SkillDetail.belongsTo(models.ItemMaster, {
	foreignKey: 'item_id',
	targetKey: 'id',
});
models.ItemMaster.hasMany(models.SkillDetail, {
	foreignKey: 'item_id',
	sourceKey: 'id',
});

// ItemViewLog와 ItemMaster 간의 관계
models.ItemViewLog.belongsTo(models.ItemMaster, {
	foreignKey: 'item_id',
	targetKey: 'id',
});
models.ItemMaster.hasMany(models.ItemViewLog, {
	foreignKey: 'item_id',
	sourceKey: 'id',
});

export { sequelize, models };

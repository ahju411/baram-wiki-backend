import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import ItemMaster from './item/ItemMaster.js';
import ItemViewLog from './item/ItemViewLog.js';
import ItemComp from './item/ItemComp.js';
import MobMaster from './mob/MobMaster.js';
import MobDrop from './mob/MobDrop.js';
import MapMaster from './map/MapMaster.js';
import MapRespawn from './map/MapRespawn.js';
import MapMasterNew from './map/MapMasterNew.js';
import MapPort from './map/MapPort.js';
import MapNpc from './map/MapNpc.js';
import SkillMaster from './skill/SkillMaster.js';
import SkillDetail from './skill/SkillDetail.js';
import Exp from './Exp.js';
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
			timezone: '+09:00',
		},
		timezone: '+09:00',
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
	ItemComp: ItemComp(sequelize),
	MapMasterNew: MapMasterNew(sequelize),
	MapPort: MapPort(sequelize),
	MapNpc: MapNpc(sequelize),
};

models.sequelize = sequelize;
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
// ItemMaster와 ItemComp 간의 관계
models.ItemMaster.hasMany(models.ItemComp, {
	foreignKey: 'comp_id',
	sourceKey: 'id',
	as: 'Ingredients',
});
models.ItemComp.belongsTo(models.ItemMaster, {
	foreignKey: 'comp_id',
	targetKey: 'id',
	as: 'ResultItem',
});

// 2. 아이템이 재료인 경우 (item_id 기준)
models.ItemMaster.hasMany(models.ItemComp, {
	foreignKey: 'item_id',
	sourceKey: 'id',
	as: 'UsedInRecipes',
});
models.ItemComp.belongsTo(models.ItemMaster, {
	foreignKey: 'item_id',
	targetKey: 'id',
	as: 'IngredientItem',
});

// MapMaster와 MapRespawn 간의 관계
models.MapMaster.hasMany(models.MapRespawn, { foreignKey: 'map_id' });
models.MapRespawn.belongsTo(models.MapMaster, { foreignKey: 'map_id' });

// MapRespawn과 MobMaster 간의 관계
models.MapRespawn.belongsTo(models.MobMaster, { foreignKey: 'mob_id' });
models.MobMaster.hasMany(models.MapRespawn, { foreignKey: 'mob_id' });

// MapMasterNew와 MapPort 간의 관계
models.MapMasterNew.hasMany(models.MapPort, {
	foreignKey: 'f_map_id',
	as: 'ForwardPorts',
});
models.MapMasterNew.hasMany(models.MapPort, {
	foreignKey: 'b_map_id',
	as: 'BackwardPorts',
});
models.MapPort.belongsTo(models.MapMasterNew, {
	foreignKey: 'f_map_id',
	as: 'ForwardMap',
});
models.MapPort.belongsTo(models.MapMasterNew, {
	foreignKey: 'b_map_id',
	as: 'BackwardMap',
});

// MapMasterNew와 MapNpc 간의 관계
models.MapMasterNew.hasMany(models.MapNpc, {
	foreignKey: 'map_id',
	as: 'Npcs',
});
models.MapNpc.belongsTo(models.MapMasterNew, {
	foreignKey: 'map_id',
	as: 'Map',
});

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

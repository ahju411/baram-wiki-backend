// controllers/monsterController.js

import { models } from '../models/index.js';
import { Sequelize } from 'sequelize';

/**
 * 특정 몬스터 ID에 대한 상세 정보를 가져오는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const getMonsterById = async (req, res) => {
	const { id } = req.params;

	try {
		// 먼저 몬스터 기본 정보 조회
		const monster = await models.MobMaster.findByPk(id, {
			attributes: [
				'id',
				'name',
				'level',
				'hp',
				'mp',
				'exp',
				'defense',
				'mdefense',
				'mtype',
				'mindamage',
				'maxdamage',
				'information',
				'images',
				'respawn',
			],
		});

		if (!monster) {
			return res.status(404).json({ message: '몬스터를 찾을 수 없습니다.' });
		}

		// 드롭 아이템 정보를 별도로 조회 (그룹화 제거)
		const drops = await models.MobDrop.findAll({
			where: { mob_id: id },
			include: [
				{
					model: models.ItemMaster,
					required: false,
				},
			],
			attributes: ['item_id', 'range', 'vals'],
			order: [
				['item_id', 'ASC'],
				['range', 'DESC'],
			],
		});

		// 맵 정보 조회 추가
		const mapInfo = await models.MapMaster.findByPk(monster.respawn, {
			attributes: ['name', 'images'],
		});

		// 응답 데이터 구성
		const responseData = {
			id: monster.id,
			name: monster.name,
			level: monster.level,
			hp: monster.hp,
			mp: monster.mp,
			exp: monster.exp,
			defense: monster.defense,
			mdefense: monster.mdefense,
			mtype: monster.mtype,
			mindamage: monster.mindamage,
			maxdamage: monster.maxdamage,
			information: monster.information,
			images: monster.images,
			respawn: monster.respawn,
			map_name: mapInfo ? mapInfo.name : null,
			map_images: mapInfo ? mapInfo.images : null,
			drops: drops.map((drop) => ({
				item_id: drop.item_id,
				range: drop.range,
				vals: drop.vals,
				item: drop.ItemMaster,
			})),
		};

		return res.status(200).json(responseData);
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

// controllers/itemController.js

import { models } from '../models/index.js';

/**
 * 특정 아이템 ID에 대한 상세 정보를 가져오는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const getItemById = async (req, res) => {
	const { id } = req.params;

	try {
		// 기본 아이템 정보 조회
		const [itemResult] = await models.sequelize.query(
			`
			SELECT 
				im.*
			FROM ITEM_MASTER im
			WHERE im.id = :id
		`,
			{
				replacements: { id },
				type: models.sequelize.QueryTypes.SELECT,
			}
		);

		if (!itemResult) {
			return res.status(404).json({ message: '아이템을 찾을 수 없습니다.' });
		}

		// 재료 정보 조회
		const ingredients = await models.sequelize.query(
			`
			SELECT 
				im2.id,
				im2.name,
				im2.images,
				ic1.vals as quantity
			FROM ITEM_COMP ic1
			JOIN ITEM_MASTER im2 ON ic1.item_id = im2.id
			WHERE ic1.comp_id = :id
		`,
			{
				replacements: { id },
				type: models.sequelize.QueryTypes.SELECT,
			}
		);

		// 결과물 정보 조회
		const usedInRecipes = await models.sequelize.query(
			`
			SELECT 
				im3.id,
				im3.name,
				im3.images,
				ic2.vals as quantity
			FROM ITEM_COMP ic2
			JOIN ITEM_MASTER im3 ON ic2.comp_id = im3.id
			WHERE ic2.item_id = :id
		`,
			{
				replacements: { id },
				type: models.sequelize.QueryTypes.SELECT,
			}
		);

		// 몬스터 드롭 정보 조회
		const monsterDrops = await models.sequelize.query(
			`
			SELECT 
				mm.id,
				mm.name,
				mm.images
			FROM MOB_DROP md
			JOIN MOB_MASTER mm ON md.mob_id = mm.id
			WHERE md.item_id = :id
		`,
			{
				replacements: { id },
				type: models.sequelize.QueryTypes.SELECT,
			}
		);

		const result = {
			...itemResult,
			ingredients,
			usedInRecipes,
			monsterDrops,
		};

		return res.status(200).json(result);
	} catch (error) {
		console.error('아이템 조회 오류:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

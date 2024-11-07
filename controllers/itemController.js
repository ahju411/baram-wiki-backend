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
		const item = await models.ItemMaster.findOne({
			where: { id },
			include: [
				{
					model: models.MobDrop,
					attributes: ['mob_id'],
					include: [
						{
							model: models.MobMaster,
							attributes: ['id', 'name', 'images'],
						},
					],
				},
			],
			attributes: {
				exclude: [],
			},
		});

		if (!item) {
			return res.status(404).json({ message: '아이템을 찾을 수 없습니다.' });
		}

		const modifiedItem = {
			...item.get({ plain: true }),
			monsterDrops: item.MobDrops.map((drop) => drop.MobMaster),
		};

		return res.status(200).json(modifiedItem);
	} catch (error) {
		console.error('아이템 조회 오류:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

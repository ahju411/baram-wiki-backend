// controllers/itemController.js

import { models, sequelize } from '../models/index.js';
import { Op } from 'sequelize';

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

		// 아이템 조회 시 로그 기록
		await models.ItemViewLog.create({
			item_id: id,
		});

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

// 실시간 인기 아이템 조회
export const getPopularItems = async (req, res) => {
	try {
		const popularItems = await models.ItemViewLog.findAll({
			attributes: ['item_id', [sequelize.fn('COUNT', '*'), 'view_count']],
			include: [
				{
					model: models.ItemMaster,
					attributes: ['name', 'images'],
					required: true,
				},
			],
			where: {
				created_at: {
					[Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000 * 3), // 최근 3일
				},
			},
			group: ['ItemViewLog.item_id', 'ItemMaster.id'],
			order: [[sequelize.fn('COUNT', '*'), 'DESC']],
			limit: 5,
		});

		const formattedItems = popularItems.map((item) => ({
			item_id: item.item_id,
			name: item.ItemMaster.name,
			images: item.ItemMaster.images,
			view_count: parseInt(item.dataValues.view_count),
		}));

		return res.status(200).json(formattedItems);
	} catch (error) {
		console.error('인기 아이템 조회 오류:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

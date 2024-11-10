import { models } from '../models/index.js';

export const getAllItems = async (req, res) => {
	const { item, sex, job, lmin, lmax } = req.query;

	// lmin, lmax 값을 숫자로 변환 (혹시 문자열로 들어올 수 있기 때문에)
	const minLevel = lmin ? parseInt(lmin, 10) : undefined;
	const maxLevel = lmax ? parseInt(lmax, 10) : undefined;

	try {
		const items = await models.ItemMaster.findAll({
			where: {
				type: item,
				reqjob: job,
				reqgender: sex,
				...((minLevel !== undefined || maxLevel !== undefined) && {
					reqlevel: {
						[models.Sequelize.Op.and]: [
							minLevel !== undefined
								? { [models.Sequelize.Op.gte]: minLevel }
								: undefined,
							maxLevel !== undefined
								? { [models.Sequelize.Op.lte]: maxLevel }
								: undefined,
						].filter(Boolean), // undefined 값 제거
					},
				}),
			},
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
				exclude: [], // 필요한 경우 제외할 필드 지정
			},
			order: [['reqlevel', 'ASC']],
		});

		if (!items || items.length === 0) {
			return res.status(404).json({ message: '아이템을 찾을 수 없습니다.' });
		}

		return res.status(200).json(items);
	} catch (error) {
		console.error('타입 조회 오류:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

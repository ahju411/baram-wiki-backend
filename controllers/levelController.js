import { models } from '../models/index.js';

export const getlevelData = async (req, res) => {
	try {
		const items = await models.Exp.findAll({
			order: [['level', 'ASC']],
		});

		const rtnData = {
			w: [],
			n: [],
			p: [],
			t: [],
		};

		items.forEach((item) => {
			switch (item['job']) {
				case 'w':
					rtnData.w.push(item);
					break;
				case 'n':
					rtnData.n.push(item);
					break;
				case 'p':
					rtnData.p.push(item);
					break;
				case 't':
					rtnData.t.push(item);
					break;
			}
		});

		if (!items || items.length === 0) {
			return res
				.status(404)
				.json({ message: '레벨데이터 조회 중 오류가 발생 했습니다.' });
		}

		console.log('rtn', rtnData);
		return res.status(200).json(rtnData);
	} catch (error) {
		console.error('타입 조회 오류:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

export const calculateExpRequired = async (req, res) => {
	try {
		const { job, mobName } = req.query;

		// 몬스터 정보 조회
		const monster = await models.MobMaster.findOne({
			where: { name: mobName },
		});

		if (!monster) {
			return res.status(404).json({ message: '몬스터를 찾을 수 없습니다.' });
		}

		// 직업별 레벨 경험치 정보 조회
		const expTable = await models.Exp.findAll({
			where: { job },
			order: [['level', 'ASC']],
		});

		if (!expTable || expTable.length === 0) {
			return res
				.status(404)
				.json({ message: '경험치 정보를 찾을 수 없습니다.' });
		}

		// 몬스터 경험치 파싱 (exp 필드가 STRING 타입이므로)
		const mobExp = parseInt(monster.exp);

		// 각 레벨별 필요 몬스터 수 계산
		const calculationResults = expTable.map((levelData) => {
			const monstersNeeded = Math.ceil(levelData.exp / mobExp);
			return {
				level: levelData.level,
				requiredExp: levelData.exp,
				monstersNeeded: monstersNeeded,
			};
		});

		return res.status(200).json({
			monsterName: monster.name,
			monsterLevel: monster.level,
			monsterExp: monster.exp,
			monsterImage: monster.images,
			job: job,
			calculations: calculationResults,
		});
	} catch (error) {
		console.error('경험치 계산 오류:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

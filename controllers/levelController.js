import { models } from '../models/index.js';

const monsterGroups = {
    '56': ['자호', '친자호', '구자호', '사마귀', '거미', '사마귀랑', '거미랑', '서현거미', '전갈', '가재', '전갈장', '가재장', '서현가재'],
    '70': ['유령', '초급유령', '중급유령', '고급유령', '자령', '주령', '지령', '해골', '칼든해골', '날쌘해골', '쾌도해골', '자해골', '주해골', '지해골'],
    '90': ['처녀귀신', '달걀귀신', '불귀신', '몽달귀신', '독충', '빗자루귀신'],
    '99': ['녹살쾡이', '표황살쾡이', '외눈황천구', '외눈자천구', '흑혈후', '녹혈후', '흑선문후', '녹선문후', '흡혈강시', '아기강시', '흑발강시'],
    '1차승급': ['선비평민', '선비검객'],
    '3차승급': ['흉노평민', '흉노전사']
};

export const getKingLevelData = async (req, res) => {
    try {
        // Exp 데이터 조회
        const items = await models.Exp.findAll({
            where: { level: { [models.Sequelize.Op.gt]: 55 } },
            order: [['level', 'ASC']]
        });

        // 모든 몬스터 그룹 이름을 하나의 배열로 통합
        const allMonsterNames = Object.values(monsterGroups).flat();

        // MobMaster에서 해당 이름에 해당하는 몬스터 조회
        const monsters = await models.MobMaster.findAll({
            where: {
                name: allMonsterNames
            },
            order: [['exp', 'DESC']]
        });

        // 몬스터 데이터를 레벨 그룹별로 정리
        const formattedMonsters = {};
        Object.keys(monsterGroups).forEach(level => {
            formattedMonsters[level] = {};
            monsterGroups[level].forEach(monsterName => {
                const monster = monsters.find(m => m.name === monsterName);
                if (monster) {
                    formattedMonsters[level][monsterName] = {
                        mob_id: monster.id,
                        exp: monster.exp,
                        images: monster.images
                    };
                } else {
                    formattedMonsters[level][monsterName] = {
                        mob_id: null,
                        exp: null,
                        images: null
                    }; // 데이터가 없을 경우 null로 설정
                }
            });
        });

        const rtnData = {
            levels: {
                w: [],
                n: [],
                p: [],
                t: []
            },
            monsters: formattedMonsters
        };

        // 레벨 데이터를 job 기준으로 분류
        items.forEach(item => {
            switch (item.job) {
                case 'w':
                    rtnData.levels.w.push(item);
                    break;
                case 'n':
                    rtnData.levels.n.push(item);
                    break;
                case 'p':
                    rtnData.levels.p.push(item);
                    break;
                case 't':
                    rtnData.levels.t.push(item);
                    break;
            }
        });

        if (!items.length) {
            return res.status(404).json({ message: '레벨 데이터 조회 중 오류가 발생했습니다.' });
        }

        return res.status(200).json(rtnData);
    } catch (error) {
        console.error('타입 조회 오류:', error);
        return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};


export const getlevelData = async (req, res) => {
    try {
        const items = await models.Exp.findAll({
            order:[['level', 'ASC']]
        });


        const rtnData = {
            w: [],
            n: [],
            p: [],
            t: []
        }

        items.forEach(item => {
            switch (item['job']) {
                case 'w':
                    rtnData.w.push(item)
                    break;
                case 'n':
                    rtnData.n.push(item)
                    break;
                case 'p':
                    rtnData.p.push(item)
                    break;
                case 't':
                    rtnData.t.push(item)
                    break;
            }
        })

        if (!items || items.length === 0) {
            return res.status(404).json({ message: '레벨데이터 조회 중 오류가 발생 했습니다.' });
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

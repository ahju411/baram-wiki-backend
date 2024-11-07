// controllers/monsterController.js

import { models } from '../models/index.js';

/**
 * 특정 몬스터 ID에 대한 상세 정보를 가져오는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const getMonsterById = async (req, res) => {
  const { id } = req.params;


  try {
    // MobMaster 모델에서 특정 ID로 몬스터 조회
    const monster = await models.MobMaster.findByPk(id, {
      include: [
        {
          model: models.MobDrop,
          include: [
            {
              model: models.ItemMaster,
            },
          ],
          attributes: ['item_id', 'range', 'vals'],
        },
        // 필요한 다른 관계가 있다면 추가로 include 할 수 있습니다.
      ],
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
        'respawn',
        'information',
        'images',
      ],
    });

    if (!monster) {
      return res.status(404).json({ message: '몬스터를 찾을 수 없습니다.' });
    }

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
      respawn: monster.respawn,
      information: monster.information,
      images: monster.images,
      drops: monster.MobDrops.map((drop) => ({
        item_id: drop.item_id,
        range: drop.range,
        vals: drop.vals,
        item: drop.ItemMaster
          ? {
              id: drop.ItemMaster.id,
              bid: drop.ItemMaster.bid,
              code: drop.ItemMaster.code,
              name: drop.ItemMaster.name,
              type: drop.ItemMaster.type,
              iconId: drop.ItemMaster.iconId,
              iconUrl: drop.ItemMaster.iconUrl,
              avatarId: drop.ItemMaster.avatarId,
              dye: drop.ItemMaster.dye,
              maxquan: drop.ItemMaster.maxquan,
              maxdura: drop.ItemMaster.maxdura,
              price: drop.ItemMaster.price,
              reqmight: drop.ItemMaster.reqmight,
              reqwill: drop.ItemMaster.reqwill,
              reqgrace: drop.ItemMaster.reqgrace,
              reqgender: drop.ItemMaster.reqgender,
              reqlevel: drop.ItemMaster.reqlevel,
              reqjob: drop.ItemMaster.reqjob,
              ondead: drop.ItemMaster.ondead,
              trade: drop.ItemMaster.trade,
              repair: drop.ItemMaster.repair,
              repairprice: drop.ItemMaster.repairprice,
              storageprice: drop.ItemMaster.storageprice,
              namingprice: drop.ItemMaster.namingprice,
              desc: drop.ItemMaster.desc,
              smin: drop.ItemMaster.smin,
              smax: drop.ItemMaster.smax,
              lmin: drop.ItemMaster.lmin,
              lmax: drop.ItemMaster.lmax,
              ac: drop.ItemMaster.ac,
              MHP: drop.ItemMaster.MHP,
              MMP: drop.ItemMaster.MMP,
              hit: drop.ItemMaster.hit,
              dam: drop.ItemMaster.dam,
              M: drop.ItemMaster.M,
              W: drop.ItemMaster.W,
              G: drop.ItemMaster.G,
              hr: drop.ItemMaster.hr,
              md: drop.ItemMaster.md,
              swingsound: drop.ItemMaster.swingsound
            }
          : null,
      })),
    };

    return res.status(200).json(responseData);
  } catch (error) {
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

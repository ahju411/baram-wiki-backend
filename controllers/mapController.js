// controllers/mapController.js

import { models } from '../models/index.js';

/**
 * 특정 맵 ID에 대한 상세 정보를 가져오는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const getMapById = async (req, res) => {
  const { id } = req.params;

  try {
    // MapMaster 모델에서 특정 ID로 맵 조회
    const map = await models.MapMaster.findOne({
      where: { id },
      include: [
        {
          model: models.MapRespawn,
          include: [
            {
              model: models.MobMaster,
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
            },
          ],
          attributes: ['mob_id'],
        },
        // 필요한 다른 관계가 있다면 추가로 include 할 수 있습니다.
      ],
      attributes: [
        'id',
        'name',
        'level',
        'information',
        'images',
      ],
    });

    if (!map) {
      return res.status(404).json({ message: '맵을 찾을 수 없습니다.' });
    }

    // 응답 데이터 구성
    const responseData = {
      id: map.id,
      name: map.name,
      level: map.level,
      information: map.information,
      images: map.images,
      spawnedMonsters: map.MapRespawns.map((respawn) => ({
        mob_id: respawn.mob_id,
        monster: respawn.MobMaster
          ? {
              id: respawn.MobMaster.id,
              name: respawn.MobMaster.name,
              level: respawn.MobMaster.level,
              hp: respawn.MobMaster.hp,
              mp: respawn.MobMaster.mp,
              exp: respawn.MobMaster.exp,
              defense: respawn.MobMaster.defense,
              mdefense: respawn.MobMaster.mdefense,
              mtype: respawn.MobMaster.mtype,
              respawn: respawn.MobMaster.respawn,
              information: respawn.MobMaster.information,
              images: respawn.MobMaster.images,
            }
          : null,
      })),
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching map:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

// controllers/skillController.js

import { models } from '../models/index.js';

/**
 * 특정 직업에 대한 스킬 목록을 가져오는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const getSkillsByJob = async (req, res) => {
  const { job } = req.params; // URL 파라미터로 job을 받습니다.

  try {
    // SkillMaster에서 특정 직업에 해당하는 스킬들을 조회
    const skills = await models.SkillMaster.findAll({
      where: { job },
      order: [['level', 'ASC']],
      include: [
        {
          model: models.SkillDetail,
          required: false,
          include: [
            {
              model: models.ItemMaster,
            },
          ],
          attributes: ['item_id', 'val', 'utype', 'job'],
        },
      ],
      attributes: [
        'id',
        'name',
        'level',
        'job',
        'advence',
        'images',
        'information',
      ],
    });

    if (!skills || skills.length === 0) {
      return res.status(404).json({ message: '해당 직업의 스킬을 찾을 수 없습니다.' });
    }

    // 응답 데이터 구성
    const responseData = skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      job: skill.job,
      advence: skill.advence,
      images: skill.images,
      information: skill.information,
      details: skill.SkillDetails.length > 0 ? skill.SkillDetails.map((detail) => ({
        item_id: detail.item_id,
        val: detail.val,
        utype: detail.utype,
        job: detail.job,
        item: detail.ItemMaster
          ? {
              id: detail.ItemMaster.id,
              name: detail.ItemMaster.name,
              itype: detail.ItemMaster.itype,
              price: detail.ItemMaster.price,
              images: detail.ItemMaster.images,
            }
          : null,
      })) : null,
    }));

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching skills by job:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

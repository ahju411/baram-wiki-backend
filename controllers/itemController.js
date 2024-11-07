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
      attributes: {
        exclude: [] // 필요에 따라 제외할 필드를 지정
      },
    });

    if (!item) {
      return res.status(404).json({ message: '아이템을 찾을 수 없습니다.' });
    }

    return res.status(200).json(item);
  } catch (error) {
    console.error('아이템 조회 오류:', error);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

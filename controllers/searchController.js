// controllers/searchController.js

import { models } from '../models/index.js';
import { Sequelize } from 'sequelize';
import { isChoMatch } from '../utils/searchKorean.js';

/**
 * 검색 기능을 제공하는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const searchAll = async (req, res) => {
  const keyword = decodeURIComponent(req.query.keyword);

  if (!keyword) {
    return res.status(400).json({ message: '검색어를 입력해 주세요.' });
  }

  try {
    // 각 모델에 대해 데이터 가져오기
    const [items, mobs, maps] = await Promise.all([
      models.ItemMaster.findAll({
        where: {
          name: { [Sequelize.Op.like]: `%${keyword}%` },
        },
        attributes: ['id', 'name', 'iconUrl'],
      }),
      models.MobMaster.findAll({
        where: {
          name: { [Sequelize.Op.like]: `%${keyword}%` },
        },
        attributes: ['id', 'name', 'images'],
      }),
      models.MapMaster.findAll({
        where: {
          name: { [Sequelize.Op.like]: `%${keyword}%` },
        },
        attributes: ['id', 'name', 'images'],
      }),
    ]);

    // 초성 검색 필터링
    const filteredItems = items
      .filter((item) => isChoMatch(keyword, item.name))
      .map((item) => ({
        id: item.id,
        name: item.name,
        image: item.iconUrl,
        type: 'item',
      }));

    const filteredMobs = mobs
      .filter((mob) => isChoMatch(keyword, mob.name))
      .map((mob) => ({
        id: mob.id,
        name: mob.name,
        image: mob.images,
        type: 'monster',
      }));

    const filteredMaps = maps
      .filter((map) => isChoMatch(keyword, map.name))
      .map((map) => ({
        id: map.id,
        name: map.name,
        image: map.images,
        type: 'map',
      }));

    // 통합된 응답 데이터 구성
    const responseData = {
      results: [...filteredItems, ...filteredMobs, ...filteredMaps],
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error('Error during search:', error);
    return res.status(500).json({ message: '검색 중 문제가 발생했습니다.' });
  }
};

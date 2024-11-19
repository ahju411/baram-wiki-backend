// controllers/searchController.js

import { models } from '../models/index.js';
import { createFuzzyMatcher } from '../utils/searchKorean.js';
import NodeCache from 'node-cache';

// 캐시 인스턴스 생성 (TTL: 24시간)
const cache = new NodeCache({ stdTTL: 86400 });

/**
 * 검색 기능을 제공하는 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const searchAll = async (req, res) => {
	const keyword = decodeURIComponent(req.query.keyword);

	// 첫 글자가 한글 완성형인지 체크
	const isCompleteHangul = (char) => {
		const code = char.charCodeAt(0);
		return code >= 0xac00 && code <= 0xd7a3; // 완성형 한글 범위: 가(0xAC00) ~ 힣(0xD7A3)
	};

	// 키워드가 비어있거나 첫 글자가 완성형 한글이 아닌 경우 빈 결과 반환
	if (!keyword || !isCompleteHangul(keyword[0])) {
		return res.status(200).json({ results: [] });
	}

	try {
		// 캐시된 데이터 확인
		let allData = cache.get('allMasterData');

		if (!allData) {
			// 캐시가 없을 경우에만 DB 조회
			const [items, mobs, maps] = await Promise.all([
				models.ItemMaster.findAll({
					attributes: ['id', 'name', 'images'],
				}),
				models.MobMaster.findAll({
					attributes: ['id', 'name', 'images'],
				}),
				models.MapMaster.findAll({
					attributes: ['id', 'name', 'images'],
				}),
			]);

			allData = {
				items,
				mobs,
				maps,
			};

			// 데이터 캐싱
			cache.set('allMasterData', allData);
		}

		// 메모리에서 필터링 수행
		const pattern = createFuzzyMatcher(keyword);

		const filteredItems = allData.items
			.filter((item) => pattern.test(item.name))
			.map((item) => ({
				id: item.id,
				name: item.name,
				image: item.images,
				type: 'item',
			}))
			.slice(0, 10);

		const filteredMobs = allData.mobs
			.filter((mob) => pattern.test(mob.name))
			.map((mob) => ({
				id: mob.id,
				name: mob.name,
				image: mob.images,
				type: 'monster',
			}))
			.slice(0, 10);

		const filteredMaps = allData.maps
			.filter((map) => pattern.test(map.name))
			.map((map) => ({
				id: map.id,
				name: map.name,
				image: map.images,
				type: 'map',
			}))
			.slice(0, 10);

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

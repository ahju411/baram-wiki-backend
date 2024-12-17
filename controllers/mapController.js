// controllers/mapController.js

import { models } from '../models/index.js';
import { buildGraph } from '../utils/graphBuilder.js';
import { bfs } from '../utils/bfs.js';

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
				// 필요한 계가 있다면 추가로 include 할 수 있습니다.
			],
			attributes: ['id', 'name', 'level', 'information', 'images'],
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

/**
 * 레벨별 사냥터 기능을 구현하기 위한 컨트롤러
 * @param {Object} req - Express 요청 객체
 * @param {Object} res - Express 응답 객체
 */
export const getMapsGroupByLevel = async (req, res) => {
	const { range } = req.query;
	try {
		// range 파라미터 검증
		if (
			!range ||
			!['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].includes(
				range
			)
		) {
			return res.status(400).json({ message: '유효하지 않은 range 값입니다.' });
		}

		const maps = await models.MapMaster.findAll({
			where: {
				type: range, // range 값으로 type 필터링
			},
			include: [
				{
					model: models.MapRespawn,
					include: [
						{
							model: models.MobMaster,
							include: [
								{
									model: models.MobDrop,
									include: [
										{
											model: models.ItemMaster,
											attributes: ['id', 'name', 'desc', 'images', 'price'],
										},
									],
								},
							],
							attributes: [
								'id',
								'name',
								'level',
								'exp',
								'information',
								'images',
							],
						},
					],
				},
			],
			order: [['level', 'ASC']], // 레벨 순으로 정렬
			attributes: [
				'id',
				'name',
				'level',
				'information',
				'xcoord',
				'ycoord',
				'images',
				'type',
			],
		});

		const responseData = maps.map((map) => {
			const monsters =
				map.MapRespawns?.map((respawn) => {
					if (!respawn.MobMaster) return null;

					const dropItems =
						respawn.MobMaster.MobDrops?.map((drop) => ({
							item: drop.ItemMaster
								? {
										id: drop.ItemMaster.id,
										name: drop.ItemMaster.name,
										desc: drop.ItemMaster.desc,
										images: drop.ItemMaster.images,
										price: drop.ItemMaster.price,
								  }
								: null,
						})).filter((item) => item !== null) || [];

					return {
						monster: {
							id: respawn.MobMaster.id,
							name: respawn.MobMaster.name,
							level: respawn.MobMaster.level,
							exp: respawn.MobMaster.exp,
							information: respawn.MobMaster.information,
							images: respawn.MobMaster.images,
							dropItems: dropItems,
						},
					};
				}).filter((monster) => monster !== null) || [];

			return {
				id: map.id,
				name: map.name,
				level: map.level,
				information: map.information,
				images: map.images,
				xcoord: map.xcoord,
				ycoord: map.ycoord,
				monsters: monsters,
			};
		});

		// 레벨 문자열에서 첫 번째 숫자 추출하는 함수
		const getFirstNumber = (levelStr) => {
			if (!levelStr) return Infinity; // null 처리
			const match = levelStr.match(/\d+/);
			return match ? parseInt(match[0]) : Infinity;
		};

		// 특수 케이스 체크 (숫자 ~ 숫자 형태가 아닌 경우)
		const isSpecialCase = (levelStr) => {
			if (!levelStr) return true;
			return !levelStr.match(/^\d+\s*~\s*\d+$/);
		};

		// 맵 데이터 정렬
		const sortedMaps = responseData
			.filter((map) => map.level !== null) // null 제외
			.sort((a, b) => {
				// 특수 케이스는 마지막으로
				if (isSpecialCase(a.level) && !isSpecialCase(b.level)) return 1;
				if (!isSpecialCase(a.level) && isSpecialCase(b.level)) return -1;
				if (isSpecialCase(a.level) && isSpecialCase(b.level)) return 0;

				// 일반적인 경우 첫 번째 숫자로 정렬
				return getFirstNumber(a.level) - getFirstNumber(b.level);
			});

		return res.status(200).json(sortedMaps);
	} catch (error) {
		console.error('Error fetching maps by level:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

/**
 * 전체 메인 맵 목록을 가져오는 컨트롤러
 */
export const getAllMainMaps = async (req, res) => {
	try {
		const mainMaps = await models.MapMasterNew.findAll({
			where: {
				main: 'y',
			},
		});

		if (!mainMaps || mainMaps.length === 0) {
			return res
				.status(404)
				.json({ message: '메인 맵 정보를 찾을 수 없습니다.' });
		}

		return res.status(200).json(mainMaps);
	} catch (error) {
		console.error('Error fetching main maps:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

/**
 * 특정 메인 맵의 상세 정보를 가져오는 컨트롤러
 */
export const getMainMapDetail = async (req, res) => {
	const { id } = req.params;

	try {
		const mapDetail = await models.MapMasterNew.findOne({
			where: {
				id,
			},
			include: [
				{
					model: models.MapPort,
					as: 'ForwardPorts',
					required: false,
				},
				{
					model: models.MapNpc,
					as: 'Npcs',
					required: false,
				},
			],
		});

		if (!mapDetail) {
			return res
				.status(404)
				.json({ message: '해당 메인 맵을 찾을 수 없습니다.' });
		}

		return res.status(200).json(mapDetail);
	} catch (error) {
		console.error('Error fetching main map detail:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

/**
 * 맵 검색 컨트롤러
 */
export const searchMaps = async (req, res) => {
	const { keyword } = req.query;

	try {
		if (!keyword) {
			return res.status(400).json({ message: '검색어를 입력해주세요.' });
		}

		const maps = await models.MapMasterNew.findAll({
			where: {
				name: {
					[models.Sequelize.Op.like]: `%${keyword}%`,
				},
			},
			attributes: ['name'],
			limit: 10,
		});

		// 검색 결과가 없을 경우
		if (maps.length === 0) {
			return res.status(200).json([]);
		}

		// name만 추출하고 글자 수 기준으로 정렬
		const mapNames = maps
			.map((map) => map.name)
			.sort((a, b) => a.length - b.length);

		return res.status(200).json(mapNames);
	} catch (error) {
		console.error('Error searching maps:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

/**
 * 경로 찾기 기능 수정
 */
export const findPath = async (req, res) => {
	const { start_name, end_name } = req.query;

	try {
		if (!start_name || !end_name) {
			return res.status(400).json({
				message: 'start_name과 end_name 파라미터를 제공해주세요.',
			});
		}

		// 맵 정보와 포트 정보를 함께 가져옴
		const mapPorts = await models.MapPort.findAll({
			include: [
				{
					model: models.MapMasterNew,
					as: 'ForwardMap',
					attributes: ['id', 'name'],
				},
				{
					model: models.MapMasterNew,
					as: 'BackwardMap',
					attributes: ['id', 'name'],
				},
			],
		});

		// 맵 이름으로 ID를 찾기 위한 매핑 생성
		const nameToIdMap = new Map();
		mapPorts.forEach((port) => {
			if (port.ForwardMap) {
				nameToIdMap.set(port.f_name, port.ForwardMap.id);
			}
			if (port.BackwardMap) {
				nameToIdMap.set(port.b_name, port.BackwardMap.id);
			}
		});

		const graph = buildGraph(mapPorts);

		if (!graph[start_name]) {
			return res.status(404).json({
				message: `시작점 '${start_name}'을(를) 찾을 수 없습니다.`,
			});
		}
		if (!graph[end_name]) {
			return res.status(404).json({
				message: `도착점 '${end_name}'을(를) 찾을 수 없습니다.`,
			});
		}

		const paths = bfs(graph, start_name, end_name);

		if (paths && paths.length > 0) {
			const formattedPaths = paths.map((path, index) => ({
				route_number: index + 1,
				path: path.map((name) => ({
					name: name,
					id: nameToIdMap.get(name) || null,
				})),
				steps: path.length - 1,
			}));

			return res.status(200).json({
				total_routes: paths.length,
				paths: formattedPaths,
			});
		} else {
			return res.status(404).json({ message: '경로를 찾을 수 없습니다.' });
		}
	} catch (error) {
		console.error('Error finding path:', error);
		return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
	}
};

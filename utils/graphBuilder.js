export const buildGraph = (mapPorts) => {
	const graph = {};

	mapPorts.forEach((port) => {
		const fromNode = port.f_name;
		const toNode = port.b_name;

		if (!graph[fromNode]) {
			graph[fromNode] = new Set();
		}
		if (!graph[toNode]) {
			graph[toNode] = new Set();
		}

		graph[fromNode].add(toNode);
	});

	// Set을 Array로 변환
	return Object.fromEntries(
		Object.entries(graph).map(([key, value]) => [key, Array.from(value)])
	);
};

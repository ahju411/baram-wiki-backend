export const bfs = (graph, start, goal) => {
	const queue = [[start]];
	const visited = new Set();
	const allPaths = [];

	while (queue.length > 0 && allPaths.length < 5) {
		// 최대 5개 경로까지만 찾음
		const currentPath = queue.shift();
		const currentNode = currentPath[currentPath.length - 1];

		if (currentNode === goal) {
			allPaths.push(currentPath);
			continue;
		}

		for (const neighbor of graph[currentNode] || []) {
			if (!currentPath.includes(neighbor)) {
				// 순환 방지
				const newPath = [...currentPath, neighbor];
				queue.push(newPath);
			}
		}
	}

	// 경로 길이순으로 정렬
	return allPaths.sort((a, b) => a.length - b.length);
};

export const bfs = (graph, start, goal) => {
    const queue = [start];
    const visited = new Set();
    const predecessors = {};
  
    visited.add(start);
  
    while (queue.length > 0) {
      const currentNode = queue.shift();
  
      if (currentNode === goal) {
        // Goal found, reconstruct the path
        const path = [];
        let node = goal;
        while (node) {
          path.unshift(node);
          node = predecessors[node];
        }
        return path;
      }
  
      for (const neighbor of graph[currentNode] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          predecessors[neighbor] = currentNode;
          queue.push(neighbor);
        }
      }
    }
  
    // No path found
    return null;
  };
  
export const buildGraph = (mapPorts) => {
    const graph = {};
  
    mapPorts.forEach((port) => {
      const fromNode = `${port.f_name}_${port.f_map_id}`;
      const toNode = `${port.b_name}_${port.b_map_id}`;
  
      if (!graph[fromNode]) {
        graph[fromNode] = [];
      }
  
      graph[fromNode].push(toNode);
  
      if (!graph[toNode]) {
        graph[toNode] = [];
      }
    });
  
    return graph;
  };
  
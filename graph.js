class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    // Remove all edges
    for (const neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
    // Remove the vertex from the graph
    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    const dfs = (vertex) => {
      if (!vertex) return null;
      visited.add(vertex);
      result.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      });
    };

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };

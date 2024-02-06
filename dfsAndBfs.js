class Graph {
    constructor(isDirected = false) {
        this.adjacencyList = new Map(); // Utilisation d'une carte pour stocker les listes d'adjacence
        this.isDirected = isDirected;
    }
    
    // Ajout d'un sommet au graphe
    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        } else {
            console.error("Le sommet existe déjà dans le graphe.");
        }
    }
    
    // Ajout d'une arête au graphe
    addEdge(from, to) {
        if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
            console.error("Les sommets ne sont pas présents dans le graphe.");
            return;
        }
        this.adjacencyList.get(from).push(to); // ajout de l'arrête
        if (!this.isDirected) {
            this.adjacencyList.get(to).push(from); // Si le graphe n'est pas orienté, ajoutez l'arête dans l'autre sens également
        }
    }
    
    dfs(startVertex) {
        const visited = new Set();
        const stack = [startVertex];
        let path = "";
    
        while (stack.length > 0) {
            const current = stack.pop();
    
            if (!visited.has(current)) {
                visited.add(current);
                path += current + " -> ";
    
                const neighbors = this.adjacencyList.get(current);
                if (neighbors.length === 0) {
                   console.log(current + ": pas d'enfant");
                }
                for (let i = neighbors.length - 1; i >= 0; i--) {
                    const neighbor = neighbors[i];
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                    }
                }
            }
        }
    
        path = path.slice(0, -4);
        console.log("Chemin DFS : " + path);
    }

    
    bfs(startVertex) {
        const visited = new Set();
        const queue = [startVertex];
        let path = "";

        while (queue.length > 0) {
            const current = queue.shift();
            visited.add(current);
            path += current + " -> ";

            for (const neighbor of this.adjacencyList.get(current)) {
                if (!visited.has(neighbor) && !queue.includes(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }

        path = path.slice(0, -4);
        console.log("Chemin BFS : " + path);
    }
    
    printGraph() {
        console.log("Graphe : ");
        for (const [vertex, neighbors] of this.adjacencyList) {
            console.log(vertex + " -> " + neighbors.join(", "));
        }
    }
}

class Vertex {
    constructor(id) {
        this.id = id;
    }
}

let graph = new Graph(true);
for (let i = 1; i < 8; i++) {
    graph.addVertex(i);
}
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(2, 5);
graph.addEdge(3, 6);
graph.addEdge(3, 7);

graph.printGraph();
graph.dfs(1);
graph.bfs(1);

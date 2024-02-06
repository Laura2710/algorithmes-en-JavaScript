class Graph {
    constructor() {
        this.vertices = new Map();
    }
    addVertex(name) {
        if (!this.vertices.has(name)) {
            this.vertices.set(name, new Vertex(name));
        }
    }
    addEdge(from, to) {
        this.addVertex(from);
        this.addVertex(to);
        this.vertices.get(from).addNeighbor(this.vertices.get(to));
        this.vertices.get(to).addNeighbor(this.vertices.get(from)); // Si vous souhaitez un graphe non orienté
    }
    getVertex(name) {
        return this.vertices.get(name);
    }

    // Méthode pour effectuer un parcours DFS (preorder)
    dfsPreOrder(startVertex) {
        const visited = new Set();
        let stack = [];
        let chemin = [];
        
        stack.push(startVertex); // empiler le nœud de départ 
    
        // Tant que la pile n'est pas vide 
        while (stack.length > 0) {
            let current = stack.pop(); // nœud à explorer
            visited.add(current);
            chemin.push(current.name);
    
            // Ajoutez les voisins non visités à la pile dans l'ordre inverse
            for (let i = current.neighbors.length - 1; i >= 0; i--) {
                const neighbor = current.neighbors[i];
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
        console.log(chemin.join(','));
    }


    print() {
        for (const vertex of this.vertices.values()) {
            vertex.print();
        }
    }
}

class Vertex {
    constructor(name) {
        this.name = name;
        this.neighbors = [];
    }
    addNeighbor(neighbor) {
        if (neighbor instanceof Vertex) {
            this.neighbors.push(neighbor);
        } else {
            throw new Error("Le paramètre doit être un objet Vertex");
        }
    }
    print() {
        let neighborNames = this.neighbors.map(neighbor => neighbor.name).join(', ');
        console.log(this.name + ' --> ' + neighborNames);
    }
}

let graph = new Graph();

graph.addEdge('1', '2');
graph.addEdge('1', '3');
graph.addEdge('2', '4');
graph.addEdge('2', '5');
graph.addEdge('3', '6');
graph.addEdge('3', '7');

const startVertex = graph.getVertex('1');

// Parcours DFS depuis le nœud '1'
console.log("DFS:");
graph.dfs(startVertex);



class Graph {
    constructor() {
        this.vertices = new Map();
    }

    addVertex(name) {
        if (!this.vertices.has(name)) {
            this.vertices.set(name, new Vertex(name));
        }
    }

    addEdge(from, to, isLeft) {
        this.addVertex(from);
        this.addVertex(to);

        const fromVertex = this.vertices.get(from);
        const toVertex = this.vertices.get(to);

        if (isLeft) {
            fromVertex._addLeftNeighbor(toVertex);
        } else {
            fromVertex._addRightNeighbor(toVertex);
        }
    }

    getVertex(name) {
        return this.vertices.get(name);
    }

    dfs(root, order) {
        const visited = new Set();
        const chemin = [];

        const inorderTraversal = (node) => {
            if (!visited.has(node.name)) {
                visited.add(node.name);

                for (const neighbor of node._leftNeighbors) {
                    inorderTraversal(neighbor);
                }

                if (order === 'inorder') {
                    chemin.push(node.name);
                }

                for (const neighbor of node._rightNeighbors) {
                    inorderTraversal(neighbor);
                }
            }
        };

        const dfsTraversal = (node) => {
            if (!visited.has(node.name)) {
                visited.add(node.name);

                if (order === 'preorder') {
                    chemin.push(node.name);
                }

                for (const neighbor of node._getNeighbors()) {
                    dfsTraversal(neighbor);
                }

                if (order === 'postorder') {
                    chemin.push(node.name);
                }
            }
        };

        if (order === 'inorder') {
            inorderTraversal(root);
        } else {
            dfsTraversal(root);
        }

        console.log(chemin.join(', '));
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
        this._leftNeighbors = [];
        this._rightNeighbors = [];
    }

    _addLeftNeighbor(neighbor) {
        if (neighbor instanceof Vertex) {
            this._leftNeighbors.push(neighbor);
        } else {
            throw new Error("Le paramètre doit être un objet Vertex");
        }
    }

    _addRightNeighbor(neighbor) {
        if (neighbor instanceof Vertex) {
            this._rightNeighbors.push(neighbor);
        } else {
            throw new Error("Le paramètre doit être un objet Vertex");
        }
    }

    _getNeighbors() {
        return [...this._leftNeighbors, ...this._rightNeighbors];
    }

    print() {
        const leftNeighborNames = this._leftNeighbors.map(neighbor => neighbor.name).join(', ');
        const rightNeighborNames = this._rightNeighbors.map(neighbor => neighbor.name).join(', ');
        console.log(this.name + ' --> Left: ' + leftNeighborNames + ' | Right: ' + rightNeighborNames);
    }
}

let graph = new Graph();

graph.addEdge('1', '2', true); // '2' est à gauche de '1'
graph.addEdge('1', '3', false); // '3' est à droite de '1'
graph.addEdge('2', '4', true); // '4' est à gauche de '2'
graph.addEdge('2', '5', false); // '5' est à droite de '2'
graph.addEdge('3', '6', true); // '6' est à gauche de '3'
graph.addEdge('3', '7', false); // '7' est à droite de '3'

const startVertex = graph.getVertex('1');

console.log("DFS Preorder:");
graph.dfs(startVertex, 'preorder');

console.log("DFS Postorder:");
graph.dfs(startVertex, 'postorder');

console.log("DFS Inorder:");
graph.dfs(startVertex, 'inorder');

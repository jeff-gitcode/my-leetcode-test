/**
 * Definition for undirected graph node
 * Used for graph-related problems like Clone Graph (LeetCode #133)
 * 
 * This class represents a node in an undirected graph where:
 * - Each node has a value (typically an integer)
 * - Each node has a list of neighbors (other nodes it's connected to)
 * 
 * Common Operations:
 * - Creating a new node with a specific value
 * - Adding/removing neighbors
 * - Traversing the graph using this node structure (DFS/BFS)
 * 
 * Example Usage:
 * const node1 = new GraphNode(1);
 * const node2 = new GraphNode(2);
 * const node3 = new GraphNode(3);
 * node1.neighbors = [node2, node3];
 * node2.neighbors = [node1, node3];
 * node3.neighbors = [node1, node2];
 * // Creates a fully connected graph with 3 nodes
 */

export class GraphNode {
    val: number;           // Value stored in the node
    neighbors: GraphNode[]; // List of connected nodes

    /**
     * Constructor for GraphNode
     * @param val - Value for this node (defaults to 0)
     * @param neighbors - List of neighboring nodes (defaults to empty array)
     */
    constructor(val?: number, neighbors?: GraphNode[]) {
        this.val = (val === undefined ? 0 : val);            // Initialize node value, default to 0
        this.neighbors = (neighbors === undefined ? [] : neighbors); // Initialize neighbors, default to empty array
    }
}

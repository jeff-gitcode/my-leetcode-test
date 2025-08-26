/**
 * Definition for undirected graph node
 * Used for graph-related problems like Clone Graph (LeetCode #133)
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

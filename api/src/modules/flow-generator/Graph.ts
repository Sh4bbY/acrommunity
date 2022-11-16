import {Pose, Transition} from '~/models';
import {Node} from './Node';

export class Graph {
  private node: { [id: number]: Node } = {};

  constructor(poses: Pose[], transitions: Transition[]) {
    poses.forEach(pose => this.node[pose.id] = new Node(pose));
    transitions.forEach(transition => {
      this.node[transition.sourcePoseId].addTargetTransition(transition, this.node);
      this.node[transition.targetPoseId].addSourceTransition(transition, this.node);
    });
  }

  private startPoseId: number;
  private endPoseId: number;
  private numberOfSteps: number;

  findPath(startPoseId, endPoseId, numberOfSteps) {
    this.startPoseId = startPoseId;
    this.endPoseId = endPoseId;
    this.numberOfSteps = numberOfSteps;

    this.setDistances();
    return this.getPath();
  }

  private setDistances() {
    const queue = [{id: this.startPoseId, distance: 0}];

    while (queue.length > 0) {
      const currentNode = this.node[queue[0].id];
      const distance = queue[0].distance;
      const neighbors = currentNode.targets;

      neighbors.forEach(neighbor => {
        neighbor.addAccessor(currentNode, distance + 1);
        if (!queue.find(item => item.id === neighbor.id) && !neighbor.isProcessed) {
          queue.push({id: neighbor.id, distance: distance + 1});
        }
      });

      currentNode.isProcessed = true;
      queue.splice(0, 1);
    }
  }


  getPath() {
    let currentNode = this.node[this.endPoseId];
    const result = [currentNode];

    while (result.length < this.numberOfSteps || result[0].id !== this.startPoseId) {
      currentNode = currentNode.getAccessor(result, this.numberOfSteps);
      result.unshift(currentNode);
    }
    return result.map(node => node.data);
  }
}

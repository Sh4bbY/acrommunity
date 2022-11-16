import {Pose, Transition} from '~/models';
import {Randomizer} from '~/utils';

export class Node {
  public isProcessed = false;
  public data: Pose;
  public targets: Node[] = [];
  public sources: Node[] = [];
  public accessors: { node: Node, distance: number }[] = [];

  constructor(pose: Pose) {
    this.data = pose;
  }

  public addTargetTransition(transition: Transition, node: { [id: number]: Node }) {
    this.targets.push(node[transition.targetPoseId]);
  }

  public addSourceTransition(transition: Transition, node: { [id: number]: Node }) {
    this.targets.push(node[transition.sourcePoseId]);
  }

  public addAccessor(node, distance) {
    if (!this.accessors.find(accessor => accessor.node.id === node.id && accessor.distance === distance)) {
      this.accessors.push({node, distance});
    }
  }

  public getAccessor(visitedNodes: Node[], numberOfSteps) {
    const preferredDistance = numberOfSteps - visitedNodes.length;

    // remove already visited accessors
    let accessors = this.accessors.filter(accessor => !visitedNodes.find(node => node.id === accessor.node.id));
    const preferredDistanceAccessors = this.accessors.filter(accessor => accessor.distance === preferredDistance);
    const unvisitedPreferredDistanceAccessors = accessors.filter(accessor => accessor.distance === preferredDistance);

    if (unvisitedPreferredDistanceAccessors.length === 0 && preferredDistanceAccessors.length > 0) {
      accessors = accessors.concat(preferredDistanceAccessors);
    }
    if (accessors.length === 0) {
      accessors = this.accessors.slice();
    }

    const longestDistanceAccessor = accessors.slice().sort(Node.sortBy('distance', true))[0];
    const visitedCount = preferredDistance > longestDistanceAccessor.distance ? Node.buildVisitedCount(visitedNodes) : {};

    // sort by preferred distance
    accessors = accessors.slice()
      .sort(Randomizer.randomSort)
      .sort((a, b) => {
        if (preferredDistance > longestDistanceAccessor.distance) {
          // if preferred distance is greater than all accessors, sort by least often visited
          return Node.getVisitedCount(visitedCount, a.node) < Node.getVisitedCount(visitedCount, b.node) ? -1 : 1;
        } else {
          // if preferred distance is smaller or equal to any all of the accessors, sort by distance
          return Math.abs(a.distance - preferredDistance) < Math.abs(b.distance - preferredDistance) ? -1 : 1;
        }
      });

    // console.log('===================');
    // console.log('Final accessors for', this.id, this.data.name);
    // console.log('preferred distance', preferredDistance);
    // console.log(accessors.map(accessor => [accessor.distance, accessor.node.data.name, this.getVisitedCount(visitedCount, accessor.node)]));

    return accessors[0].node;
  }

  private static buildVisitedCount(visitedNodes: Node[]) {
    const visitedCount = {};
    visitedNodes.forEach(node => {
      if (visitedCount[node.id]) {
        visitedCount[node.id]++;
      } else {
        visitedCount[node.id] = 1;
      }
    });
    return visitedCount;
  }

  private static getVisitedCount(visitedCount: { [id: number]: number }, node: Node) {
    return visitedCount[node.id] || 0;
  }

  private static sortBy(field: string, desc = false) {
    const trueCase = desc ? 1 : -1;
    const falseCase = desc ? -1 : 1;
    return (a, b) => a[field] < b[field] ? trueCase : falseCase;
  }

  get id() {
    return this.data.id;
  }
}

export * from './table';
export * from './event.table';
export * from './user.table';
export * from './pose.table';
export * from './transition.table';
export * from './comment.table';
export * from './tag.table';
export * from './skill.table';
export * from './list.table';
export * from './image.table';
export * from './video.table';
export * from './list.table';
export * from './feedback.table';
export * from './jam.table';
export * from './alias.table';
export * from './flows.table';
export * from './attachment.table';

import {aliasTable} from './alias.table';
import {attachmentTable} from './attachment.table';
import {commentTable} from './comment.table';
import {eventTable} from './event.table';
import {feedbackTable} from './feedback.table';
import {flowsTable} from './flows.table';
import {imageTable} from './image.table';
import {jamTable} from './jam.table';
import {listTable} from './list.table';
import {PT_Attachable, PT_Listable, PT_Markable, PT_Taggable} from './pivot';
import {poseTable} from './pose.table';
import {skillTable} from './skill.table';
import {Table} from './table';
import {tagTable} from './tag.table';
import {transitionTable} from './transition.table';
import {userTable} from './user.table';
import {videoTable} from './video.table';

export const tables: Table[] = [
  aliasTable,
  flowsTable,
  userTable,
  eventTable,
  jamTable,
  poseTable,
  transitionTable,
  commentTable,
  tagTable,
  PT_Taggable,
  PT_Attachable,
  attachmentTable,
  skillTable,
  listTable,
  PT_Listable,
  PT_Markable,
  imageTable,
  videoTable,
  feedbackTable,
];

export const constraints = tables.reduce((arr, table) => [...arr, ...table.constraints], []);

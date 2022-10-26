export * from './table';
export * from './event.table';
export * from './user.table';
export * from './pose.table';
export * from './transition.table';
export * from './comment.table';
export * from './tag.table';
export * from './skill.table';
export * from './list.table';

import {aliasTable} from './alias.table';
import {attachmentTable} from './attachment.table';
import {commentTable} from './comment.table';
import {eventTable} from './event.table';
import {flowsTable} from './flows.table';
import {jamTable} from './jam.table';
import {listTable} from './list.table';
import {PT_Attachable, PT_Listable, PT_Markable, PT_Taggable} from './pivot';
import {poseTable} from './pose.table';
import {skillTable} from './skill.table';
import {Table} from './table';
import {tagTable} from './tag.table';
import {transitionTable} from './transition.table';
import {userTable} from './user.table';

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
];

export const constraints = tables.reduce((arr, table) => [...arr, ...table.constraints], []);

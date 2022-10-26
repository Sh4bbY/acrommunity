export interface IComment {
  id: number;
  authorId: number;
  commentableId: number;
  commentableType: string;
  text: string;
  createdAt: Date;
}

const constraints = {
  text: {minLength: 3, maxLength: 30},
};

export const commentValidation = {
  constraints,
  schema: {},
};

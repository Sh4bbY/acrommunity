export interface IAlias {
  id: number;
  aliasableId: number;
  aliasableType: string;
  name: string;
}

const constraints = {
  name: {minLength: 3, maxLength: 50},
};

export const aliasValidation = {
  constraints,
  schema: {},
};

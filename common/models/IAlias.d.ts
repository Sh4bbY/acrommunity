export interface IAlias {
    id: number;
    aliasableId: number;
    aliasableType: string;
    name: string;
}
export declare const aliasValidation: {
    constraints: {
        name: {
            minLength: number;
            maxLength: number;
        };
    };
    schema: {};
};

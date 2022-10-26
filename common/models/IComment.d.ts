export interface IComment {
    id: number;
    authorId: number;
    commentableId: number;
    commentableType: string;
    text: string;
    createdAt: Date;
}
export declare const commentValidation: {
    constraints: {
        text: {
            minLength: number;
            maxLength: number;
        };
    };
    schema: {};
};

import Joi from 'joi';
import { JamStatus, RecursionType } from '../enums';
export interface IJam {
    id: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    contact: string;
    address: string;
    locationInfo: string;
    recursionType: RecursionType;
    latlng: {
        coordinates: number[];
    };
    creatorId: string;
    creator?: string;
    status: JamStatus;
    updatedAt: string;
    createdAt: string;
}
export declare const jamValidation: {
    constraints: {
        title: {
            minLength: number;
            maxLength: number;
        };
        description: {
            maxLength: number;
        };
    };
    schema: {
        create: Joi.Schema<any>;
    };
};

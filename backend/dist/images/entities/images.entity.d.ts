import { BaseEntity } from "typeorm";
export declare class Image extends BaseEntity {
    id: number;
    filename: string;
    createdAt: Date;
}

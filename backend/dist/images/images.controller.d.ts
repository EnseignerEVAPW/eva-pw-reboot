/// <reference types="multer" />
import { ImagesService } from './images.service';
import { Response } from 'express';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadFile(file: Express.Multer.File): Promise<any>;
    getAllImages(): Promise<any>;
    getImage(res: Response, imgname: string): void;
}

import { Repository } from 'typeorm';
import { Image } from './entities/images.entity';
import { ImagesDto } from './dto/images-dto/images-dto';
export declare class ImagesService {
    private imageRepository;
    constructor(imageRepository: Repository<Image>);
    findAll(): Promise<Image[]>;
    create(filename: ImagesDto): Promise<Image>;
    remove(id: number): Promise<void>;
}

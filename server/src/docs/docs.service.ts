import { Model } from 'mongoose';
import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doc, DocDocument } from './schemas/doc.schema';
// import { Doc, DocSchema }

@Injectable()
export class DocsService {
    constructor(@InjectModel(Doc.name) private docModel: Model<DocDocument>) {}

    async create(createDocDto) {
        const doc = new this.docModel(createDocDto);
        return doc.save();
    }

    async findAll(): Promise<Doc[]> {
        return this.docModel.find().exec();
    }

    async findOne(condition:any) {
        const doc =  await this.docModel.find(condition).exec();
        if (!doc) {
            throw new NotFoundException('Doc not found'); 
        }
        return doc;
    }
    

}

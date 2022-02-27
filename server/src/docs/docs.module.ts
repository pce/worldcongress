import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from './schemas/doc.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Doc.name, schema: DocSchema}
        ])
    ]
})
export class DocsModule {}

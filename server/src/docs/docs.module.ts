import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Doc, DocSchema } from './schemas/doc.schema';
import { DocsService } from './docs.service';
import { DocsController } from './docs.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Doc.name, schema: DocSchema}
        ])
    ],
    providers: [DocsService],
    controllers: [DocsController]
})
export class DocsModule {}

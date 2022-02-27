import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as SchemaTypes, Types } from 'mongoose';

export type DocDocument = Doc & Document;

@Schema()
export class Doc {
  @Prop({ auto: true, type: SchemaTypes.Types.ObjectId })
  // @ApiProperty({ type: String })
  _id: SchemaTypes.Types.ObjectId;

  @Prop({ required: true })
  // @ApiProperty()
  title: string;

  @Prop({ required: true })
  // @ApiProperty()
  text: string;

  @Prop({ default: Date.now })
  // @ApiProperty()
  createdAt: Date;

  @Prop({ default: false })
  // @ApiProperty()
  isDeleted?: boolean;
}

export const DocSchema = SchemaFactory.createForClass(Doc);

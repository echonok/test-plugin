import { model, Model, Schema } from 'mongoose';
import { IContentModel } from '../interfaces/content';

const ContentSchema: Schema = new Schema(
  {
    isEnabled: Boolean,
    priority: Number,
    path: String,
    langs: [{}],
    deletedAt: {
      default: null,
      type: Number,
    },
  },
  {
    versionKey: false,
  },
);

export const ContentModel = model<IContentModel>('content', ContentSchema);

export default ContentModel;

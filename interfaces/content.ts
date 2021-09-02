import { Document } from 'mongoose';

export interface IContentModel extends Document {
  isEnabled: boolean;
  priority: number;
  uri: string;
  title: string;
  location: string;
  description: string;
  conditions: [string];
  blocks: [{ title: string; descriptions: [string] }];
}

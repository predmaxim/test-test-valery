import mongoose from 'mongoose';
import {PostType} from '../libs/types';

export const PostSchema = new mongoose.Schema<PostType>({
    title: String,
    content: String
  }
);

export default mongoose.models.Post || mongoose.model<PostType>('Post', PostSchema);

import {Request, Response} from 'express';
import Post from '../models/PostModel';
import {PostSortDirectionType, PostSortType, PostType} from '../libs/types';
import dbConnect from '../dbConnect';
import {DIRECTION, POST_LIMIT, SORT_BY} from '../libs/constants';

type QueryProps = {
  page: number
  limit: number
  sortBy: PostSortType
  direction: PostSortDirectionType,
  search: PostType['title']
}

export const getPosts = async (req: Request, res: Response) => {
  try {
    dbConnect();
    const {
      page = 1,
      limit = POST_LIMIT,
      sortBy = SORT_BY.title,
      direction = DIRECTION.asc,
      search
    } = req.query as unknown as QueryProps;

    const posts = await Post.find<PostType>({title: new RegExp(search)})
      .limit(Number(limit))
      .skip((page - 1) * limit)
      .sort(`${direction === 'desc' ? '-' : ''}${sortBy}`);

    const total = await Post.countDocuments();
    const numberOfDocumentsFound = await Post
      .find<PostType>({title: new RegExp(search)})
      .countDocuments();

    if (!posts.length) {
      return res.status(404).json({message: 'There are no posts'});
    }

    res.status(200).json({posts, total: search ? numberOfDocumentsFound : total});
  } catch (error) {
    res.json({message: 'Something went wrong', error});
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    dbConnect();
    const post = await Post.findById<PostType>(req.params.id);
    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const createPost = async (req: Request, res: Response) => {
  console.log('req.body:', req.body);
  try {
    dbConnect();
    const post: PostType = req.body;

    if (!Object.keys(post).length) {
      return res.status(400).json({message: 'No post data'});
    }

    if (!post.title) {
      return res.status(400).json({message: 'Post title cannot be empty'});
    }

    if (!post.content) {
      return res.status(400).json({message: 'Post content cannot be empty'});
    }

    const newPost = await Post.create(post);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    dbConnect();
    const removedPost = await Post.findByIdAndDelete<PostType>(req.params.id);

    if (removedPost) {
      res.status(200).json(removedPost);
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    dbConnect();
    const post = await Post.findByIdAndUpdate<PostType>(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({message: 'Post not found'});
    }

    return res.status(200).json(post);

  } catch (error) {
    res.status(500).json({message: 'Something went wrong', error});
  }
};

import {create} from 'zustand';
import {PostQueryProps, PostType} from '../libs/types';
import {API_URL, DIRECTION_DEFAULT, PAGE_DEFAULT, POST_LIMIT, SORT_BY_DEFAULT} from '../libs/constants';
import {immer} from 'zustand/middleware/immer';

export type PostStoreType = {
  posts: PostType[],
  search?: PostType['title']
  total: number,
  error: unknown,
  loading: boolean
}

type PostStoreActionsType = {
  getPost: (id: PostType['_id']) => Promise<PostType | undefined>,
  getPosts: ({page, limit, sortBy, direction, search}: PostQueryProps) => void,
  addPost: (post: Partial<PostType>) => void,
  updatePost: (post: PostType) => void,
  deletePost: (id: PostType['_id']) => void
  setSearch: (query: PostType['title']) => void
}

export const usePostStore = create<PostStoreType & PostStoreActionsType>()(
  immer((set, get) => ({
    posts: [],
    search: '',
    total: 0,
    error: null,
    loading: false,
    getPost: async (id) => {
      try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
          cache: 'force-cache'
        });
        const post: PostType = await response.json();
        return post;
      } catch (error) {
        console.log(error);
      }
    },
    getPosts: async (
      {
        page = PAGE_DEFAULT,
        limit = POST_LIMIT,
        sortBy = SORT_BY_DEFAULT,
        direction = DIRECTION_DEFAULT,
        search = '6'
      }
    ) => {
      set({loading: true});
      try {
        const query = new URLSearchParams({
          page: (page).toString(),
          limit: limit.toString(),
          sortBy,
          direction,
          search
        }).toString();
        const response = await fetch(`${API_URL}/posts?${query}`, {
          cache: 'force-cache'
        });
        const {posts, total} = await response.json();
        set({posts, total});
        set({error: null});
      } catch (error) {
        set({error});
      } finally {
        set({loading: false});
      }
    },
    addPost: async (post) => {
      set({loading: true});
      try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        const newPost: PostType = await response.json();
        get().posts.unshift(newPost);
        set({error: null});
      } catch (error) {
        set({error});
      } finally {
        set({loading: false});
      }
    },
    updatePost: async (updatedPost) => {
      set({loading: true});
      try {
        await fetch(`${API_URL}/posts/${updatedPost._id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedPost),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        const posts = get().posts.map((post) => post._id === updatedPost._id ? updatedPost : post);
        set({posts});
        set({error: null});
      } catch (error) {
        set({error});
      } finally {
        set({loading: false});
      }
    },
    deletePost: async (id) => {
      set({loading: true});
      try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE'
          }
        );
        const deletedPost: PostType = await response.json();
        const posts = get().posts.filter((post) => post._id !== deletedPost._id);
        set({posts});
        set({error: null});
      } catch (error) {
        set({error});
      } finally {
        set({loading: false});
      }
    },
    setSearch: (query) => {
      set({search: query});
    }
  })));

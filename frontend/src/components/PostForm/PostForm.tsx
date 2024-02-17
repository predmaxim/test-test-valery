import styles from './PostForm.module.scss';
import {PostType} from '@/libs/types';
import {ChangeEvent, FormEvent, useState} from 'react';
import {formFieldValidation} from '@/libs/formValidation';

type PostFormProps = {
  post?: PostType,
  onSubmit: (post: PostType) => void,
  id: string
}

export const PostForm = ({post, onSubmit, id}: PostFormProps) => {
  const [formData, setFormData] = useState<
    {
      content?: { value: PostType['content'], status: boolean, message?: string },
      title?: { value: PostType['title'], status: boolean, message?: string }
    }
  >({
    content: {value: post?.content || '', status: !!post?.content},
    title: {value: post?.title || '', status: !!post?.title}
  });

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      title: {
        value: e.target.value,
        ...formFieldValidation(e.target.value, {isEmpty: true, max: 12})
      }
    });
  };

  const onChangeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      content: {
        value: e.target.value,
        ...formFieldValidation(e.target.value, {isEmpty: true, max: 50})
      }
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData?.content?.status && formData.title?.status) {
      if (post) {
        onSubmit({...post, title: formData.title.value, content: formData.content.value});
      } else {
        onSubmit({title: formData.title.value, content: formData.content.value} as PostType);
      }
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className={styles.PostForm}
      id={id}
    >
      <input
        type="text"
        placeholder="Title"
        className={`input`}
        value={formData.title?.value}
        name="title"
        onChange={onChangeTitle}
        autoFocus
        required
      />
      {formData?.title?.message && <p className={`${styles.validateError} error`}>{formData?.title?.message}</p>}
      <textarea
        placeholder="Post Content"
        className={`input`}
        value={formData.content?.value}
        name="content"
        onChange={onChangeContent}
        required
      />
      {formData?.content?.message && <p className={`${styles.validateError} error`}>{formData?.content?.message}</p>}
    </form>
  );
};

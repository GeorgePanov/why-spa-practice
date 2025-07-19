import React, { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

export const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPosts, setLoadingPost] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    setLoadingPost(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoadingPost(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingPost(false);
      });
  }, []);

  useEffect(() => {
    if (selectedPostId !== null) {
      setLoadingComments(true);
      fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${selectedPostId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setComments(data);
          setLoadingComments(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingComments(false);
        });
    }
  }, [selectedPostId]);

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <div style={{ width: '40vw' }}>
        <h2>Посты</h2>
        {loadingPosts ? (
          <p>Загрузка...</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPostId(post.id)}
              style={{
                cursor: 'pointer',
                padding: '0.5rem',
                marginBottom: '1rem',
                border:
                  selectedPostId === post.id
                    ? '2px solid #007bff'
                    : '1px solid #ccc',
                borderRadius: '5px',
              }}
            >
              <strong>{post.title}</strong>
              <p>{post.body.slice(0, 80)}...</p>
            </div>
          ))
        )}
      </div>

      <div style={{ width: '40vw' }}>
        <h2>Комментарии</h2>
        {selectedPostId === null ? (
          <p>Выберите пост</p>
        ) : loadingComments ? (
          <p>Загрузка...</p>
        ) : comments.length === 0 ? (
          <p>Комментариев нет</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                marginBottom: '1rem',
                padding: '0.5rem',
                border: '0.5px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <strong>{comment.name}</strong> <em>({comment.email})</em>
              <p>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

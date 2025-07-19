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

export const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);

  // Получение списка постов при загрузке
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, []);

  // Получение комментариев, когда выбран пост
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
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>
        Одностраничные приложения: <br />
        зачем они нужны и в чём их преимущества
      </h1>
      <h2>Блог: JSONPlaceholder</h2>
      <div style={{ display: 'flex', gap: '2rem', width: '100%' }}>
        {/* Список постов */}
        <div style={{ width: '40vw' }}>
          <h2>Посты</h2>
          {posts.map((post) => (
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
          ))}
        </div>

        {/* Комментарии к выбранному посту */}
        <div style={{ width: '40vw' }}>
          <h2>Комментарии</h2>
          {selectedPostId === null ? (
            <p>Выберите пост, чтобы увидеть комментарии</p>
          ) : loadingComments ? (
            <p>Загрузка комментариев...</p>
          ) : comments.length === 0 ? (
            <p>Комментариев нет</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                style={{
                  marginBottom: '1rem',
                  padding: '0.5rem',
                  border: '1px solid #ddd',
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
    </div>
  );
};

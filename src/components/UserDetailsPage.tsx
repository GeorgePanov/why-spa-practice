import React, { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
};

type Props = {
  userId: number;
};

export const UserDetailsPage: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((res) => res.json())
      .then(setUser)
      .catch(console.error);

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then((res) => res.json())
      .then(setPosts)
      .catch(console.error);
  }, [userId]);

  if (!user) return <p>Загрузка пользователя...</p>;

  return (
    <div>
      <h2>Пользователь: {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Телефон: {user.phone}</p>
      <p>
        Веб-сайт: <a>{user.website}</a>
      </p>

      <h3>Посты пользователя</h3>
      {posts.length === 0 ? (
        <p>Постов нет</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem',
              border: '0.5px solid #ddd',
              borderRadius: '4px',
            }}
          >
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

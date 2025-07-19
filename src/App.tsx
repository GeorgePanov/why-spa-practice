import React, { useState } from 'react';
import { PostsPage } from './components/PostsPage';
import { UsersPage } from './components/UsersPage';
import { UserDetailsPage } from './components/UserDetailsPage';

export const App: React.FC = () => {
  const [activeView, setActiveView] = useState<
    'posts' | 'users' | 'userDetails' | null
  >(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleUserSelect = (id: number) => {
    setSelectedUserId(id);
    setActiveView('userDetails');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>
        Одностраничные приложения: <br />
        зачем они нужны и в чём их преимущества
      </h1>
      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => setActiveView('posts')}>Посты</button>{' '}
        <button onClick={() => setActiveView('users')}>Пользователи</button>
      </div>

      {activeView === 'posts' && <PostsPage />}
      {activeView === 'users' && <UsersPage onUserSelect={handleUserSelect} />}
      {activeView === 'userDetails' && selectedUserId !== null && (
        <UserDetailsPage userId={selectedUserId} />
      )}
    </div>
  );
};

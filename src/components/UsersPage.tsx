import React, { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
};

type Props = {
  onUserSelect: (id: number) => void;
};

export const UsersPage: React.FC<Props> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoadingUsers(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingUsers(false);
      });
  }, []);

  return (
    <div>
      <h2>Пользователи</h2>
      {loadingUsers ? (
        <p>Загрузка...</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              borderRadius: '4px',
            }}
          >
            <strong>{user.name}</strong> — {user.email} ({user.company.name})
          </div>
        ))
      )}
    </div>
  );
};

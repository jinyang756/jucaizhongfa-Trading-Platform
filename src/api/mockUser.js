const mockUser = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'user' && password === 'password') {
          resolve({ token: 'mock-token', user: { id: '1', username: 'user', role: 'user' } });
        } else if (username === 'admin' && password === 'password') {
          resolve({ token: 'mock-admin-token', user: { id: '2', username: 'admin', role: 'admin' } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },

  register: (username, password) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ message: 'Registration successful', user: { id: '3', username: username, role: 'user' } });
      }, 500);
    });
  },

  getUserProfile: (token) => {
    return new Promise(resolve => {
      setTimeout(() => {
        if (token === 'mock-token') {
          resolve({ id: '1', username: 'user', email: 'user@example.com', balance: 10000 });
        } else if (token === 'mock-admin-token') {
          resolve({ id: '2', username: 'admin', email: 'admin@example.com', balance: 50000 });
        } else {
          resolve(null);
        }
      }, 300);
    });
  },
};

export default mockUser;
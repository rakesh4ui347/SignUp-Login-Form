const mockUsers = [];

export const authService = {
  login: async ({ email, password }) => {
    const user = mockUsers.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      return Promise.resolve({ success: true, user });
    }
    return Promise.reject({
      success: false,
      message: ' Invalid email or password',
    });
  },

  signup: async ({ name, email, password }) => {
    const userExists = mockUsers.some((user) => user.email === email);
    if (userExists) {
      return Promise.reject({ success: false, message: 'User already exists' });
    }

    const newUser = { name, email, password };
    mockUsers.push(newUser);
    return Promise.resolve({ success: true, user: newUser });
  },
};

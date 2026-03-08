// Test data for login or similar tests (add more if needed)
export const userData = {
  users: [
    {
      username: process.env.VALID_USERNAME,
      password: process.env.VALID_PASSWORD,
    },
    {
      username: 'invalid_username',
      password: 'invalid_password',
    }
  ],
};

export const users = userData.users;
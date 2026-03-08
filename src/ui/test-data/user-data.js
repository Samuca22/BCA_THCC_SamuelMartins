// Load .env in worker (auth setup imports this first, so UI_BASE_URL is set for LoginPage)
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Test data for login or similar tests (add more if needed)
export const userData = {
  users: [
    {
      username: 'Admin',
      password: 'admin123',
    },
    {
      username: 'invalid_username',
      password: 'invalid_password',
    }
  ],
};

export const users = userData.users;
import 'dotenv/config';

export const config = {
  db: {
    host: process.env.DB_HOST as string,
    port: Number(process.env.DB_PORT),
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    pass: process.env.DB_PASS as string
  }
};

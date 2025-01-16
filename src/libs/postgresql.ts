import pg from 'pg';
const { Pool, Client } = pg;

export default async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'papita',
    password: 'admin',
    database: 'recipe_app'
  });

  await client.connect();
  return client;
}

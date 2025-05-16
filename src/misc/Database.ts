import { ClickHouseClient, createClient } from '@clickhouse/client';
import { config } from '@/config';

export class db {
  private static client: ClickHouseClient | null = null;

  static async query<T>(query: string, params?: Record<string, unknown>): Promise<T[]> {
    try {
      const client = this.getClient();
      const result = await client.query({
        query: query,
        query_params: params,
        format: 'JSONEachRow'
      });

      return await result.json<T>();
    } catch (error) {
      console.error('ClickHouse Query Error:', error);
      return [];
    }
  }

  static async queryOne<T>(
    query: string,
    params?: Record<string, unknown>,
    addLimit: boolean = true
  ): Promise<T | null> {
    const modifiedQuery = addLimit ? `${query} LIMIT 1` : query;
    const result = await this.query<T>(modifiedQuery, params);
    return result[0] || null;
  }

  static async entryExists(
    query: string,
    params?: Record<string, unknown>,
    addLimit: boolean = true
  ): Promise<boolean> {
    const modifiedQuery = addLimit ? `${query} LIMIT 1` : query;
    const result = await this.query(modifiedQuery, params);
    return result.length > 0;
  }

  static async insert(
    table: string,
    columns: string[],
    values: readonly (string | number | boolean)[]
  ): Promise<boolean> {
    try {
      const client = this.getClient();
      await client.insert({
        table: table,
        format: 'JSONEachRow',
        values: [
          {
            ...columns.reduce(
              (acc, col, index) => {
                acc[col] = values[index];
                return acc;
              },
              {} as Record<string, string | number | boolean | null>
            )
          }
        ]
      });
      return true;
    } catch (error) {
      console.error('ClickHouse Insert Error:', error);
      return false;
    }
  }

  private static getClient(): ClickHouseClient {
    if (!this.client) {
      this.client = createClient({
        url: `${config.db.host}:${config.db.port}`,
        username: config.db.user,
        password: '',
        database: config.db.name
      });
    }
    return this.client;
  }
}

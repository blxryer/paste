import { ClickHouseClient, createClient } from '@clickhouse/client';
import { config } from '@/config';

type QueryParams = readonly (string | number | boolean)[];
type QueryResult = Record<string, string | number | boolean | null>;

export class db {
  private static client: ClickHouseClient | null = null;

  static async query(queryStr: string, params: QueryParams = []): Promise<QueryResult[]> {
    try {
      const client = this.getClient();
      const result = await client.query({
        query: queryStr,
        format: 'JSON',
        query_params: Object.fromEntries(params.map((param, index) => [`param${index}`, param]))
      });

      const jsonResult = await result.json();
      return jsonResult.data as QueryResult[];
    } catch (e) {
      console.error('ClickHouse Query Error:', e);
      return [];
    }
  }

  static async queryOne(
    queryStr: string,
    params: QueryParams = [],
    addLimit = true
  ): Promise<QueryResult | false> {
    const modifiedQuery = addLimit ? `${queryStr} LIMIT 1` : queryStr;
    const result = await this.query(modifiedQuery, params);
    return result?.[0] || false;
  }

  static async entryExists(
    queryStr: string,
    params: QueryParams = [],
    addLimit = true
  ): Promise<boolean> {
    const modifiedQuery = addLimit ? `${queryStr} LIMIT 1` : queryStr;
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
    } catch (e) {
      console.error('ClickHouse Insert Error:', e);
      return false;
    }
  }

  private static getClient(): ClickHouseClient {
    if (!this.client) {
      this.client = createClient({
        url: `${config.db.host}:${config.db.port}`,
        username: config.db.user,
        password: config.db.pass,
        database: config.db.name
      });
    }
    return this.client;
  }
}

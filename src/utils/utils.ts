import { db } from '@/misc/Database';

export class Utils {
  private static readonly charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  public static async createId(): Promise<string | null> {
    let hasId = true;
    let pasteId: string | null = null;

    while (hasId) {
      const randomValues = new Uint32Array(10);

      crypto.getRandomValues(randomValues);

      pasteId = Array.from(randomValues)
        .map((x) => this.charset[x % this.charset.length])
        .join('');

      hasId = await db.entryExists('SELECT 1 FROM pastes WHERE id = {id:String}', { id: pasteId });
    }

    return pasteId;
  }

  public static splitArray<T>(array: T[], chunkSize: number = 50): T[][] {
    const length = array.length;
    const chunks: T[][] = [];

    for (let i = 0; i < length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }

    return chunks;
  }
}

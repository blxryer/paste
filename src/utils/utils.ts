import { db } from '@/misc/Database';

export class Utils {
  private static readonly charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  public static async createId(): Promise<string> {
    let hasId = true;
    let pasteId: string = '';

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

  public static async getPasteById(pasteId: string): Promise<{ content: string } | null> {
    return await db.queryOne<{ content: string }>(`SELECT content FROM pastes WHERE id = {id:String}`, { id: pasteId });
  }
}
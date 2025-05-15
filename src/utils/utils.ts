export class Utils {
  private static readonly charset = 'abcdefghijklmnopqrstuvwxyz0123456789';

  public static createId(): string {
    const randomValues = new Uint32Array(10);

    crypto.getRandomValues(randomValues);

    return Array.from(randomValues)
      .map((x) => this.charset[x % this.charset.length])
      .join('');
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

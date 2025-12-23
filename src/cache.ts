export interface CacheEntry {
  data: any; // The actual response data
  headers: Record<string, string>; // HTTP headers from the response
  statusCode: number; // HTTP status (200, 404, etc.)
  timestamp: number; // When we cached it (Unix timestamp)
  expiresAt: number; // When it should expire (Unix timestamp)
}

export class CacheManager {
  private cache: Map<string, CacheEntry> = new Map();
  private defaultTTL: number = 300;

  constructor(defaultTTL: number = 300) {
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(
    key: string,
    data: any,
    headers: Record<string, string>,
    statusCode: number,
    ttl?: number
  ) {
    const expiresAt = Date.now() + (ttl || this.defaultTTL) * 100;
    const entry: CacheEntry = {
      data,
      headers,
      statusCode,
      timestamp: Date.now(),
      expiresAt,
    };
    this.cache.set(key, entry);
    return entry;
  }
  get(key: string) {
    const entry = this.cache.get(key);

    if (!entry) {
      return null;
    }
    if (entry.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return entry;
  }
  delete(key: string) {
    this.cache.delete(key);
    return true;
  }
  clear() {
    this.cache.clear();
    return true;
  }
}

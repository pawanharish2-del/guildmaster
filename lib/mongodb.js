import mongoose from 'mongoose';

// ═══════════════════════════════════════════════════════════════════════════
// Resilient Mongoose connection utility for the Next.js serverless runtime.
//
// In development, Next.js hot-reload re-imports modules on nearly every request.
// Without caching, each reload would open a brand-new pool of sockets to Atlas
// and quickly exhaust the connection limit ("too many connections"). We cache a
// single connection promise on the Node `global` object so it survives module
// re-evaluation and is shared across all serverless invocations in a warm
// container.
// ═══════════════════════════════════════════════════════════════════════════

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || undefined;

if (!MONGODB_URI) {
  throw new Error(
    'Missing MONGODB_URI. Add it to your .env.local (see .env.example).'
  );
}

/**
 * Global cache. `global.mongoose` persists across hot-reloads in dev and across
 * invocations within a warm serverless container in production.
 * @type {{ conn: import('mongoose').Mongoose | null, promise: Promise<import('mongoose').Mongoose> | null }}
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  // Fast path: an established, healthy connection already exists.
  if (cached.conn) {
    return cached.conn;
  }

  // No in-flight promise yet — start a single connection attempt and cache it so
  // concurrent callers await the same promise instead of dialing new pools.
  if (!cached.promise) {
    const opts = {
      // Fail fast instead of hanging serverless functions when Atlas is
      // unreachable or credentials are wrong.
      bufferCommands: false,
      // Connection pooling — bounded so a burst of concurrent invocations cannot
      // blow past the Atlas cluster's connection cap.
      maxPoolSize: 10,
      minPoolSize: 0,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
      ...(MONGODB_DB ? { dbName: MONGODB_DB } : {}),
    };

    mongoose.set('strictQuery', true);

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => mongooseInstance)
      .catch((err) => {
        // Reset so the next request can retry rather than being stuck awaiting a
        // permanently-rejected promise.
        cached.promise = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}

export default dbConnect;

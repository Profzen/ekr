import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI ?? "";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalForMongoose = global as typeof globalThis & {
  mongoose: MongooseCache;
};

const cached = globalForMongoose.mongoose || { conn: null, promise: null };

globalForMongoose.mongoose = cached;

export default async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }
  const safeUri = MONGODB_URI.replace(/:\/\/.*?:.*?@/, "://***:***@");
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("[Mongo] Connecting...", safeUri);
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 20000,
        connectTimeoutMS: 20000,
        socketTimeoutMS: 20000,
        retryWrites: true,
      })
      .then((conn) => {
        console.log("[Mongo] Connected");
        return conn;
      })
      .catch((error) => {
        console.error("[Mongo] Connection error:", {
          name: error?.name,
          message: error?.message,
          code: error?.code,
        });
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

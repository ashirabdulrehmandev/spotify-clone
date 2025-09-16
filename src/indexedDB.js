import { openDB } from 'idb';

const DB_NAME = 'MusicDB';
const STORE_NAME = 'songs';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
}
export async function addSongToDB({ file, title, author, cover }) {
  let coverBlob = null;
  if (cover instanceof Blob) {
    coverBlob = cover;
  }
  const db = await initDB();
  const arrayBuffer = await file.arrayBuffer();
  const song = {
    title: title,
    author: author || 'Unknown Artist',
    fileData: arrayBuffer,
    cover: coverBlob || '',
    lastModified: file.lastModified,
  };
  const id = await db.add(STORE_NAME, song);
  return { ...song, id };
}

export async function getAllSongsFromDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}
export async function deleteSongFromDB(id) {
    const db = await initDB();
    await db.delete('songs', id);
  }
  
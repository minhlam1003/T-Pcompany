import { useState, useEffect } from 'react';
import { EntryType } from './types';

const STORAGE_KEY = 'hoso_data';

export function useStore() {
  const [data, setData] = useState<EntryType[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        console.error("Local storage parse error", e);
      }
    }
  }, []);

  const save = (entries: EntryType[]) => {
    setData(entries);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  };

  const addEntry = (entry: EntryType) => {
    const newData = [...data, entry];
    save(newData);
  };

  const updateEntry = (updated: EntryType) => {
    const newData = data.map(curr => curr.id === updated.id ? updated : curr);
    save(newData);
  };

  const deleteEntry = (id: string) => {
    save(data.filter(curr => curr.id !== id));
  };

  return { data, addEntry, updateEntry, deleteEntry };
}

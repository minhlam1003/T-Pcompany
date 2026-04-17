/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useStore } from './useStore';
import { EntryList } from './components/EntryList';
import { EntryForm } from './components/EntryForm';
import { EntryType } from './types';

export default function App() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [lastSavedData, setLastSavedData] = useState<EntryType | null>(null);
  const [formKey, setFormKey] = useState<number>(0);
  
  const { data, addEntry, updateEntry, deleteEntry, deleteEntries } = useStore();

  const handleAddNew = () => {
    setEditingId(null);
    setFormKey(Date.now());
    setView('form');
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setFormKey(Date.now());
    setView('form');
  };

  const handleSave = (entry: EntryType, action: 'close' | 'clear' = 'close') => {
    if (editingId) {
      updateEntry(entry);
    } else {
      addEntry(entry);
    }
    
    if (action === 'close') {
      setLastSavedData(entry);
      setView('list');
    } else if (action === 'clear') {
      setLastSavedData(null);
      setEditingId(null);
      setFormKey(Date.now());
    }
  };

  const handleCancel = () => {
    setView('list');
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col font-sans text-[#111827]">
      <header className="bg-white border-b border-[#E5E7EB] shrink-0 h-[72px] flex items-center justify-between px-[32px]">
        <h1 className="text-[20px] font-semibold m-0 text-[#111827]">Hệ Thống Quản Lý Dữ Liệu</h1>
      </header>
      
      <main className="flex-1 w-full p-[24px] grid gap-[24px]">
        {view === 'list' ? (
          <EntryList
            data={data}
            onAddNew={handleAddNew}
            onEdit={handleEdit}
            onDelete={deleteEntry}
            onDeleteMultiple={deleteEntries}
          />
        ) : (
          <EntryForm
            key={formKey}
            initialData={editingId ? data.find(d => d.id === editingId) : (lastSavedData ? { ...lastSavedData, id: crypto.randomUUID() } : undefined)}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </main>
    </div>
  );
}

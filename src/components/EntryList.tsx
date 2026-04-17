import React, { useMemo, useState } from 'react';
import { Plus, Download, Edit, Trash2, X } from 'lucide-react';
import { EntryType, FIELD_LABELS } from '../types';
import { exportToExcel } from '../utils/exportExcel';

interface Props {
  data: EntryType[];
  onAddNew: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteMultiple: (ids: string[]) => void;
}

function DeleteConfirmModal({ onConfirm, onCancel, count = 1 }: { onConfirm: () => void, onCancel: () => void, count?: number }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-[12px] shadow-xl w-full max-w-sm overflow-hidden flex flex-col p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Xác nhận xóa</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          {count > 1 
            ? `Bạn có chắc chắn muốn xóa ${count} hồ sơ đã chọn? Hành động này không thể hoàn tác.` 
            : `Bạn có chắc chắn muốn xóa hồ sơ này? Hành động này không thể hoàn tác.`}
        </p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Xóa hồ sơ
          </button>
        </div>
      </div>
    </div>
  );
}

export function EntryList({ data, onAddNew, onEdit, onDelete, onDeleteMultiple }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      (item.dinhDanh || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.nhanDe || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.luutru_MaHoSo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.taolap_Ten || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Tìm kiếm: Định danh, Nhan đề, Mã hồ sơ, Cơ quan..." 
            className="border border-[#D1D5DB] rounded-[6px] pl-[10px] pr-[10px] py-[10px] w-full text-[14px] outline-none focus:border-[#2563EB] focus:ring-[2px] focus:ring-[rgba(37,99,235,0.1)] bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap justify-end gap-3 w-full sm:w-auto">
          {selectedIds.length > 0 && (
            <button 
              onClick={() => setIsBatchDeleting(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-[8px] bg-red-50 border border-red-200 text-red-600 px-[18px] py-[10px] rounded-[6px] text-[14px] font-medium transition-colors cursor-pointer hover:bg-red-100"
            >
              <Trash2 size={16} />
              <span className="whitespace-nowrap">Xóa {selectedIds.length} mục</span>
            </button>
          )}
          <button 
            onClick={() => exportToExcel(filteredData, 'Danh_Sach_Ho_So')}
            className="flex-1 sm:flex-none flex items-center justify-center gap-[8px] bg-white border border-[#D1D5DB] text-[#374151] px-[18px] py-[10px] rounded-[6px] text-[14px] font-medium transition-colors cursor-pointer hover:bg-gray-50"
          >
            <Download size={16} />
            <span className="whitespace-nowrap">Xuất Excel (.xlsx)</span>
          </button>
          <button 
            onClick={onAddNew}
            className="flex-1 sm:flex-none flex items-center justify-center gap-[8px] bg-[#2563EB] text-white px-[18px] py-[10px] rounded-[6px] text-[14px] font-medium transition-colors cursor-pointer hover:bg-blue-700"
          >
            <Plus size={16} />
            <span className="whitespace-nowrap">Thêm Mục Mới</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[12px] overflow-hidden border border-[#E5E7EB] flex flex-col">
        <div className="overflow-x-auto w-full max-w-[calc(100vw-48px)]">
          <table className="min-w-max border-collapse text-left w-full relative">
            <thead>
              <tr>
                <th className="sticky left-0 z-20 px-[24px] py-[14px] text-[12px] font-semibold text-[#6B7280] uppercase tracking-[0.05em] w-[80px] border-b border-[#E5E7EB] bg-[#F9FAFB] shadow-[1px_0_0_0_#E5E7EB]">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB] cursor-pointer"
                      checked={filteredData.length > 0 && selectedIds.length === filteredData.length}
                      onChange={(e) => toggleAll(e.target.checked)}
                    />
                    <span>STT</span>
                  </div>
                </th>
                {Object.entries(FIELD_LABELS).map(([key, label]) => {
                  if (key === 'id') return null;
                  return (
                    <th key={key} className="px-[24px] py-[14px] whitespace-nowrap text-[12px] font-semibold text-[#6B7280] uppercase tracking-[0.05em] border-b border-[#E5E7EB] bg-[#F9FAFB]">
                      {label}
                    </th>
                  );
                })}
                <th className="sticky right-0 z-20 px-[24px] py-[14px] text-center text-[12px] font-semibold text-[#6B7280] uppercase tracking-[0.05em] border-b border-[#E5E7EB] bg-[#F9FAFB] shadow-[-1px_0_0_0_#E5E7EB]">Thao tác</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#F3F4F6]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={Object.keys(FIELD_LABELS).length + 1} className="px-[24px] py-[14px] text-[14px] text-center text-[#6B7280]">
                    Không tìm thấy dữ liệu phù hợp.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="sticky left-0 z-10 bg-white group-hover:bg-gray-50 px-[24px] py-[14px] whitespace-nowrap text-[14px] border-b border-[#F3F4F6] text-[#111827] shadow-[1px_0_0_0_#E5E7EB]">
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-[#2563EB] rounded border-gray-300 focus:ring-[#2563EB] cursor-pointer"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => toggleSelection(item.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <span className="w-4 text-center">{idx + 1}</span>
                      </div>
                    </td>
                    {Object.keys(FIELD_LABELS).map((key) => {
                      if (key === 'id') return null;
                      const val = (item as any)[key];
                      return (
                        <td key={key} className="px-[24px] py-[14px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] text-[14px] border-b border-[#F3F4F6] text-[#111827]" title={val}>
                          {val || '-'}
                        </td>
                      );
                    })}
                    <td className="sticky right-0 z-10 bg-white group-hover:bg-gray-50 px-[24px] py-[14px] whitespace-nowrap text-center text-[14px] border-b border-[#F3F4F6] shadow-[-1px_0_0_0_#E5E7EB]">
                      <div className="flex items-center justify-center gap-4">
                        <button onClick={() => onEdit(item.id)} className="text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer" title="Chỉnh sửa">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => setItemToDelete(item.id)} className="text-red-500 hover:text-red-700 transition-colors cursor-pointer" title="Xóa">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {itemToDelete && (
        <DeleteConfirmModal 
          onConfirm={() => {
            onDelete(itemToDelete);
            setItemToDelete(null);
            setSelectedIds(prev => prev.filter(id => id !== itemToDelete));
          }}
          onCancel={() => setItemToDelete(null)}
        />
      )}
      
      {isBatchDeleting && (
        <DeleteConfirmModal 
          count={selectedIds.length}
          onConfirm={() => {
            onDeleteMultiple(selectedIds);
            setSelectedIds([]);
            setIsBatchDeleting(false);
          }}
          onCancel={() => setIsBatchDeleting(false)}
        />
      )}
    </div>
  );
}

import * as XLSX from 'xlsx';
import { EntryType, FIELD_LABELS } from '../types';

export function exportToExcel(data: EntryType[], fileName: string) {
  const exportData = data.map(item => {
    const formattedItem: any = {};
    for (const key of Object.keys(item) as (keyof EntryType)[]) {
      if (FIELD_LABELS[key] && key !== 'id') {
        formattedItem[FIELD_LABELS[key]] = item[key];
      }
    }
    return formattedItem;
  });

  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Dữ liệu");
  XLSX.writeFile(wb, `${fileName}.xlsx`);
}

import type { WorkBook } from 'xlsx';

export interface ExportColumn<T> {
  key: keyof T | string;
  header: string;
  transform?: (value: any, row: T) => any;
}

// 动态引入 xlsx，避免在未安装时导致构建失败
export async function exportToExcel<T = any>(
  rows: T[],
  columns: ExportColumn<T>[],
  options?: { filename?: string; sheetName?: string }
) {
  const filename = options?.filename || '导出.xlsx';
  const sheetName = options?.sheetName || 'Sheet1';

  if (!rows || rows.length === 0) {
    console.warn('exportToExcel: 无可导出数据');
    return;
  }

  try {
    const XLSX = await import('xlsx');

    const data = rows.map((row: any) => {
      const obj: Record<string, any> = {};
      for (const col of columns) {
        const val = typeof col.key === 'string' ? row[col.key] : row[col.key as keyof T];
        obj[col.header] = col.transform ? col.transform(val, row) : val;
      }
      return obj;
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb: WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
  } catch (e) {
    console.error('导出失败，请确认已安装 xlsx 依赖', e);
  }
}


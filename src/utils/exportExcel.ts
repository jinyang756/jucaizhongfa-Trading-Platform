import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export interface ExportColumn<T> {
  key: keyof T | string;
  header: string;
  transform?: (value: unknown, row: T) => unknown;
}

export async function exportToExcel<T = Record<string, unknown>>(
  rows: T[],
  columns: ExportColumn<T>[],
  options?: { filename?: string; sheetName?: string },
) {
  const filename = options?.filename || '导出.xlsx';
  const sheetName = options?.sheetName || 'Sheet1';

  if (!rows || rows.length === 0) {
    console.warn('exportToExcel: 无可导出数据');
    return;
  }

  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    // 设置表头
    worksheet.columns = columns.map((col) => ({
      header: col.header,
      key: col.key as string,
      width: 20, // 默认列宽
    }));

    // 填充数据
    rows.forEach((row) => {
      const rowData: Record<string, unknown> = {};
      columns.forEach((col) => {
        const key = col.key as keyof T;
        const value = row[key];
        rowData[col.key as string] = col.transform ? col.transform(value, row) : value;
      });
      worksheet.addRow(rowData);
    });

    // 生成 buffer 并使用 file-saver 保存
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), filename);
  } catch (e) {
    console.error('导出失败', e);
  }
}

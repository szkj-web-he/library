import * as XLSX from "xlsx";

export const sheetToData = (file: File) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (res) => {
            const data_arr: unknown[] = [];
            const data = res.target?.result as ArrayBuffer;
            const workbook = XLSX.read(data);
            const worksheetKeys = workbook.SheetNames;
            worksheetKeys.forEach((item) => {
                data_arr.push(XLSX.utils.sheet_to_json(workbook.Sheets[item]));
            });
            resolve(data_arr);
        };
        reader.onerror = (err) => {
            reject(err);
        };
        reader.readAsArrayBuffer(file);
    });
};

export const dataToSheet = (data: unknown[], fileName: string, option?: XLSX.WritingOptions) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, fileName, option);
};

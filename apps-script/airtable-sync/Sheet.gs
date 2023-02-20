class Sheet {
  constructor(sheet) {
    this.sheet = sheet;
  }

  clear() {
    this.sheet.clear();
  }

  setHeader(header) {
    const headerRow = this.sheet.getRange(1, 1, 1, header.length);
    headerRow.setValues([header]).setFontWeight('bold').setWrap(true);
    this.sheet.setFrozenRows(1);
  }

  setRows(rows) {
    this.sheet.getRange(2, 1, rows.length, rows[0].length).setNumberFormat('@STRING@').setValues(rows);
  }
}
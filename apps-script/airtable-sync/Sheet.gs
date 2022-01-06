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
	for (let i = 0; i < rows.length; i++) {
	  for (let j = 0; j < rows[i].length; j++) {
		this.sheet.getRange(i + 2, j + 1).setNumberFormat('@STRING@').setValue(rows[i][j]);
	  }
	}
  }
}
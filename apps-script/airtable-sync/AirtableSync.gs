class AirtableSync {
  constructor(sheetNAME, baseID, tableID, selectedFields, attachmentFields) {
    this.sheetNAME = sheetNAME;
    this.baseID = baseID;
    this.tableID = tableID;
    this.selectedFields = selectedFields || [];
    this.attachmentFields = attachmentFields || [];
  }

  getSheetNAME() {
    return this.sheetNAME;
  }

  getBaseID() {
    return this.baseID;
  }

  getTableID() {
    return this.tableID;
  }

  getSelectedFields() {
    return this.selectedFields;
  }

  getAttachmentFields() {
    return this.attachmentFields;
  }
}
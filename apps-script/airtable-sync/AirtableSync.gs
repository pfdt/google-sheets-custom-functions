class AirtableSync {
  constructor(baseId, tableName, viewName, selectedFields, attachmentFields) {
	this.baseId = baseId;
	this.tableName = tableName;
	this.viewName = viewName;
	this.selectedFields = selectedFields || [];
	this.attachmentFields = attachmentFields || [];
  }

  getBaseId() {
	return this.baseId;
  }

  getTableName() {
	return this.tableName;
  }

  getViewName() {
	return this.viewName;
  }

  getSelectedFields() {
	return this.selectedFields;
  }

  getAttachmentFields() {
	return this.attachmentFields;
  }
}
/*
Code based on github.com/robiningelbrecht/airtable-google-sheets-backup

Add here your credentials and Airtable base to sync.

Warning // This script cannot read Airtable "linked records. The workaround is to create a "formula records" column equal to the linked records (for each "linked records") and ignore "linked records" columns.
*/

const API_KEY = 'keyXXXXXXXXXXXX'; // ADD YOUR AIRTABLE API KEY
const ATTACHMENTS_ROOT_FOLDER_ID = '' // ADD THE GOOGLE DRIVE FOLDER ID WHERE YOU WANT TO STORE ATTACHMENTS (OPTIONAL)

class App {
  constructor() {
	this.client = new AirtableClient(API_KEY);
	this.syncs = [
	  // ADD ONE LINE FOR EACH AIRTABLE TABLE/VIEW TO SYNC, USING FOLLOWING TEMPLATE
	  // TEMPLATE TO SYNC THE ALL TABLE: new AirtableSync('BaseId', 'TableName', 'ViewName', [], []),
	  // TEMPLATE TO SYNC ONLY SPECIFIC FIELDS: new AirtableSync('BaseId', 'TableName', 'ViewName', ['FieldName-1', 'FieldName-2'], []),
	  // TEMPLATE TO IMPORT ATTACHMENT FIELDS: new AirtableSync('BaseId', 'TableName', 'ViewName', [], ['AttachmentFieldName-1', 'AttachmentFieldName-2']),
	  new AirtableSync('appXXXXXXXX', 'XXXXXXXX', 'viwXXXXXXXX', [], []),
	];
	if (ATTACHMENTS_ROOT_FOLDER_ID !== null && ATTACHMENTS_ROOT_FOLDER_ID !== '') {
	  this.attachmentService = new AttachmentService(ATTACHMENTS_ROOT_FOLDER_ID);
	}
  }

  run() {
	this.syncs.forEach(sync => {
	  const airtableRecords = new AirtableRecords(
		this.client.getRecords(sync.getBaseId(), sync.getTableName(), sync.getViewName(), sync.getSelectedFields()),
		sync.getAttachmentFields()
	  );

	  if (airtableRecords.isEmpty()) {
		// Shortcut and do not override sheet with "empty data".
		return;
	  }

	  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
	  const sheet = new Sheet(spreadsheet.getSheetByName(sync.getTableName()) || spreadsheet.insertSheet(sync.getTableName()));

	  sheet.clear();
	  sheet.setHeader(airtableRecords.getFieldNames());
	  sheet.setRows(airtableRecords.getData());

	  // Download and save attachments, if any.
	  for (const [id, urls] of Object.entries(airtableRecords.getAttachmentUrls())) {
		this.attachmentService.downloadAndSave(id, urls[0], sync.getTableName());
	  }
	});
  }
}

function run() {
  const app = new App();
  app.run();
}

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('AirtableSync')
	.addItem('Run sync', 'run')
	.addToUi();
}
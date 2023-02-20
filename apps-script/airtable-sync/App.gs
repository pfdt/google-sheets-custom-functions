const TOKEN = 'XXXXXX'; // ADD YOUR AIRTABLE PERSONAL ACCESS TOKEN
const ATTACHMENTS_ROOT_FOLDER_ID = '' // ADD THE GOOGLE DRIVE FOLDER ID WHERE YOU WANT TO STORE ATTACHMENTS (OPTIONAL)

class App {
	constructor() {
		this.client = new AirtableClient(TOKEN);
		this.syncs = [
			// ADD ONE LINE FOR EACH AIRTABLE TABLE/VIEW TO SYNC, USING FOLLOWING TEMPLATE
			// TEMPLATE TO SYNC THE ALL TABLE: new AirtableSync('SheetNAME_destination', 'AirtableBaseID', 'AirtableTableID', [], []),
			// TEMPLATE TO SYNC ONLY SPECIFIC FIELDS: new AirtableSync('SheetNAME_destination', 'AirtableBaseID', 'AirtableTableID', ['FieldName-1', 'FieldName-2'], []),
			// TEMPLATE TO IMPORT ATTACHMENT FIELDS: new AirtableSync('SheetNAME_destination', 'AirtableBaseID', 'AirtableTableID', [], ['AttachmentFieldName-1', 'AttachmentFieldName-2']),
			new AirtableSync('YOUR_SHEET_NAME', 'appXXXXXX', 'tblXXXXXX', [], []),
		];
		if (ATTACHMENTS_ROOT_FOLDER_ID !== null && ATTACHMENTS_ROOT_FOLDER_ID !== '') {
			this.attachmentService = new AttachmentService(ATTACHMENTS_ROOT_FOLDER_ID);
		}
	}

	run() {
		this.syncs.forEach(sync => {

			const airtableRecords = new AirtableRecords(
				this.client.getRecords(sync.getBaseID(), sync.getTableID(), sync.getSelectedFields()),
				sync.getAttachmentFields(),
				sync.getSelectedFields()
			);

			if (airtableRecords.isEmpty()) {
				// Shortcut and do not override sheet with "empty data".
				return;
			}

			const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
			const sheet = new Sheet(spreadsheet.getSheetByName(sync.getSheetNAME()) || spreadsheet.insertSheet(sync.getSheetNAME()));
			const fieldNames = airtableRecords.getFieldNames();

			sheet.clear();
			sheet.setHeader(fieldNames);
			sheet.setRows(airtableRecords.getData(fieldNames));

			// Download and save attachments, if any.
			for (const [id, urls] of Object.entries(airtableRecords.getAttachmentUrls())) {
				this.attachmentService.downloadAndSave(id, urls[0], sync.getSheetNAME());
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
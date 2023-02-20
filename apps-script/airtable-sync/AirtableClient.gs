class AirtableClient {
	constructor(token) {
		this.token = token;
	}

	getRecords(baseID, tableID, selectedFields) {
		// Wait for a bit so we don't get rate limited by Airtable.
		Utilities.sleep(201);

		let offset = 0;
		let records = [];

		// List the selected fields to retrieved.
		var selectedFieldsParam = '';
		if (selectedFields !== undefined && selectedFields.length > 0) {
			for (let i = 0; i < selectedFields.length; i++) {
				selectedFieldsParam += '&fields%5B%5D=' + encodeURIComponent(selectedFields[i]);
			}
		}

		// Make calls to Airtable, until all of the data has been retrieved.
		while (offset !== null) {
			const url = [
				"https://api.airtable.com/v0/",
				baseID,
				"/",
				tableID,
				"?",
				selectedFieldsParam,
				"&offset=",
				offset
			].join('');

			const options = {
				'method': 'GET',
				'headers': { 'Authorization': 'Bearer ' + this.token }
			};

			// Call the URL and add results to to our result set.
			const response = JSON.parse(UrlFetchApp.fetch(url, options));
			records = [...records, ...response.records];

			offset = response.offset || null;
		}
		return records;
	}
}
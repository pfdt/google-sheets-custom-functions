class AirtableRecords {
	constructor(rawRecords, attachmentFields, selectedFields) {
		this.records = rawRecords;
		this.attachmentFields = attachmentFields || [];
		this.attachmentUrls = [];
		this.selectedFields = selectedFields || [];
	}
	isEmpty() {
		this.records !== undefined && this.records.length > 0;
	}

	getFieldNames() {
		let result;
		if (this.selectedFields !== undefined && this.selectedFields.length > 0) {
			result = ['ID'].concat(this.selectedFields);
		} else {
			let maxLength = 0;
			let maxKey = 0;
			let fields = [];
			for (const [i, record] of Object.entries(this.records)) {
				let currentFields = Object.keys(this.records[i].fields);
				let currentLength = currentFields.length;
				fields.push(currentFields);
				if (currentLength > maxLength) {
					maxKey = i;
					maxLength = currentLength;
				}
			}
			fields.unshift(Object.keys(this.records[maxKey].fields));
			let uniqueFields = fields.flat().filter(function(item, pos, self) {
				return self.indexOf(item) == pos;
			})
			result = ['ID', ...uniqueFields];
		}

		return result;
	}

	getData(fieldNames) {
		let data = [];

		// Get the recordKeys
		let recordKeys = fieldNames;
		recordKeys.shift();

		for (const [i, record] of Object.entries(this.records)) {
			let row = [record.id];

			for (let [j, key] of Object.entries(recordKeys)) {
				let recordValue = record.fields[key];
				// This is an attachment field, needs special processing.
				if (this.attachmentFields.includes(j)) {
					recordvalue = recordvalue.map((object) => object.url);
					// Keep track of attachment urls, so we can 
					this.attachmentUrls[record.id] = recordvalue;
				}
				row.push(recordValue);
			}
			data.push(row);
		}

		return data;
	}

	getRawData() {
		return this.records;
	}

	getAttachmentUrls() {
		return this.attachmentUrls;
	}
}
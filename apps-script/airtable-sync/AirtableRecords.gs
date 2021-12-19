class AirtableRecords {
	constructor(rawRecords, attachmentFields) {
	  this.records = rawRecords;
	  this.attachmentFields = attachmentFields || [];
	  this.attachmentUrls = [];
	  this.data = this.parseDataAndAttachementUrls();
	}
  
	isEmpty() {
	  this.records !== undefined && this.records.length > 0;
	}
  
	getFieldNames() {
	  return ['ID', ...Object.keys(this.records[0].fields)];
	}
  
	parseDataAndAttachementUrls() {
	  let data = [];

	  // Get the recordKeys
	  let recordKeys = Object.keys(this.records[0].fields);
  
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
  
	getData() {
	  return this.data;
	}
  
	getRawData() {
	  return this.records;
	}
  
	getAttachmentUrls() {
	  return this.attachmentUrls;
	}
  }
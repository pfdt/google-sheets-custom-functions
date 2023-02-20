class AttachmentService {
	constructor(rootFolderId) {
		this.rootFolderId = rootFolderId;
		this.rootFolder = DriveApp.getFolderById(this.rootFolderId);
		this.folders = {};
		this.files = {};
	}

	downloadAndSave(filename, uri, folderName) {
		const folder = this.getFolderByName(folderName);

		if (this.isExistingFile(folder, filename)) {
			return;
		}

		const file = UrlFetchApp.fetch(uri);
		const blob = file.getBlob().setName(filename);
		folder.createFile(blob);

		// After creating, tag the file as existing.
		this.files[folder.getId()].push(filename);
	}

	isExistingFile(folder, filename) {
		// This method has static cache to make sure slow API calls are only executed once.
		if (Object.keys(this.files).length === 0 || !(folder.getId() in this.files)) {
			if (!(folder.getId() in this.files)) {
				this.files[folder.getId()] = [];
			}

			const files = folder.getFiles();
			while (files.hasNext()) {
				const file = files.next();
				this.files[folder.getId()].push(file.getName());
			}
		}

		return this.files[folder.getId()].includes(filename);
	}

	getFolderByName(folderName) {
		// This method has static cache to make sure slow API calls are only executed once.
		if (Object.keys(this.folders).length === 0) {
			const folders = this.rootFolder.getFolders();

			while (folders.hasNext()) {
				const folder = folders.next();
				this.folders[folder.getName()] = folder;
			}
		}

		if (!(folderName in this.folders)) {
			// Create new sub folder in root.
			const folder = this.rootFolder.createFolder(folderName);
			this.folders[folder.getName()] = folder;
		}

		return this.folders[folderName];
	}
}
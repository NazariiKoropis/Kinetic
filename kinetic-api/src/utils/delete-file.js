import fs from 'fs/promises'
import path from 'path'

const deleteFile = async (fileUrl, folder, id) => {
	try {
		if (!fileUrl) return

		const fileName = path.basename(fileUrl)
		const filePath = path.resolve(process.cwd(), `uploads/${folder}/${id}/${fileName}`)

		try {
			await fs.access(filePath)
			await fs.unlink(filePath)
			console.log(`File deleted: ${fileName}`)
		} catch {
			// File does not exist or could not be accessed, ignore
		}
	} catch (err) {
		console.error(`Error processing file deletion for ${fileUrl}:`, err.message)
	}
}

export default deleteFile

import fs from 'fs/promises'
import path from 'path'

const moveTempFile = async (tempUrl, folder, id) => {
	try {
		if (!tempUrl || !tempUrl.includes('/temp/')) return tempUrl
		if (!folder || !id) throw new Error('Invalid folder or id')

		const fileName = path.basename(tempUrl)
		const oldPath = path.resolve(`uploads/temp/${fileName}`)
		const newDir = path.resolve(`uploads/${folder}/${id}`)
		const newPath = path.resolve(`uploads/${folder}/${id}/${fileName}`)

		await fs.mkdir(newDir, { recursive: true })

		try {
			await fs.access(oldPath)
			await fs.rename(oldPath, newPath)
			return `/uploads/${folder}/${id}/${fileName}`
		} catch {
			return tempUrl
		}
	} catch (err) {
		console.error('Error processing file:', err)
		return tempUrl
	}
}

export default moveTempFile

import fs from 'fs/promises';
import path from 'path';

const moveTempFile = async (tempUrl, movieId) => {
	try {
		if (!tempUrl || !tempUrl.includes('/temp/')) return tempUrl;

		const fileName = path.basename(tempUrl);
		const oldPath = path.resolve(`uploads/temp/${fileName}`);
		const newDir = path.resolve(`uploads/movie/${movieId}`);
		const newPath = path.resolve(`uploads/movie/${movieId}/${fileName}`);


		await fs.mkdir(newDir, { recursive: true });

		try {
			await fs.access(oldPath);
			await fs.rename(oldPath, newPath);
			return `/uploads/${movieId}/${fileName}`;
		} catch (err) {

			return tempUrl;
		}
	} catch (err) {
		console.error('Error processing file:', err);
		return tempUrl;
	}
};

export default moveTempFile
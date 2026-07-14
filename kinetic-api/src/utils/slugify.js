const slugify = (text) => {
	if (!text) return ''

	const cyrillicToLatinMap = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ye',
		'ж': 'zh', 'з': 'z', 'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l',
		'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
		'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ь': '',
		'ю': 'yu', 'я': 'ya', 'э': 'e', 'ы': 'y', 'ё': 'yo', 'ъ': '', 'і': 'i'
	}

	return text
		.toString()
		.toLowerCase()
		.split('')
		.map(char => cyrillicToLatinMap[char] !== undefined ? cyrillicToLatinMap[char] : char)
		.join('')
		.trim()
		.replace(/\s+/g, '-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '')
}

export default slugify

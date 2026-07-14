const generateSlug = text => {
	const cyr =
		'а б в г ґ д е є ж з и і ї й к л м н о п р с т у ф х ц ч ш щ ь ю я'.split(
			' '
		)
	const lat =
		'a b v h g d e ye zh z y i yi y k l m n o p r s t u f kh ts ch sh shch  yu ya'.split(
			' '
		)

	let res = text.toLowerCase()
	cyr.forEach((char, idx) => {
		res = res.replaceAll(char, lat[idx])
	})

	return res
		.trim()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

export { generateSlug }

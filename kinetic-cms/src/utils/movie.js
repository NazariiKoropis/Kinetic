import { MOVIE_STATUSES } from "@constants/movie"

const getStatusColor = (status) => {
	switch (status) {
		case MOVIE_STATUSES.RELEASED:
			return 'success'

		case MOVIE_STATUSES.UPCOMING:
			return 'warning'

		case MOVIE_STATUSES.HIDDEN:
			return 'default'

		default:
			return 'default'
	}
}

export { getStatusColor }

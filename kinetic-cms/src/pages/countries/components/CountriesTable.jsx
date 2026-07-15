import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import InboxIcon from '@mui/icons-material/Inbox'
import {
	Box,
	Chip,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Tooltip,
	Typography
} from '@mui/material'

function CountriesTable({
	countries,
	onDelete,
	onEdit,
	totalItems = 0,
	page = 1,
	limit = 10,
	onPageChange,
	onLimitChange
}) {
	return (
		<Box
			component="section"
			sx={{
				backgroundColor: 'background.paper',
				borderRadius: 2,
				border: '1px solid rgba(255, 255, 255, 0.1)',
				overflow: 'hidden'
			}}
		>
			<TableContainer>
				<Table sx={{ minWidth: 600 }}>
					<TableHead>
						<TableRow
							sx={{
								backgroundColor: 'rgba(255, 255, 255, 0.02)',
								borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
							}}
						>
							<TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>
								Name
							</TableCell>
							<TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>
								Country Code
							</TableCell>
							<TableCell sx={{ color: 'text.secondary', fontWeight: 600 }}>
								Movies Count
							</TableCell>
							<TableCell
								align="right"
								sx={{ color: 'text.secondary', fontWeight: 600, pr: 3 }}
							>
								Actions
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{!countries || countries.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={4}
									align="center"
									sx={{ py: 6, opacity: 0.5 }}
								>
									<InboxIcon
										sx={{
											fontSize: 40,
											mb: 1,
											display: 'block',
											margin: '0 auto'
										}}
									/>
									<Typography variant="body2">No countries found</Typography>
								</TableCell>
							</TableRow>
						) : (
							countries.map(country => (
								<TableRow
									key={country._id}
									sx={{
										transition: 'background-color 0.2s',
										'&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.02)' },
										'&:last-child td, &:last-child th': { border: 0 }
									}}
								>
									<TableCell sx={{ fontWeight: 500 }}>{country.name}</TableCell>

									<TableCell>
										<Box
											component="span"
											sx={{
												fontFamily: 'monospace',
												fontSize: '0.85rem',
												backgroundColor: 'rgba(255, 255, 255, 0.05)',
												padding: '2px 6px',
												borderRadius: 1,
												color: 'text.secondary'
											}}
										>
											{country.code}
										</Box>
									</TableCell>

									<TableCell>
										<Chip
											label={`${country.moviesCount || 0} movies`}
											size="small"
											variant="outlined"
											color={country.moviesCount > 0 ? 'primary' : 'default'}
											sx={{
												fontWeight: 600,
												fontSize: '0.75rem',
												height: 22,
												backgroundColor:
													country.moviesCount > 0
														? 'rgba(59, 130, 246, 0.05)'
														: 'transparent'
											}}
										/>
									</TableCell>

									<TableCell
										align="right"
										sx={{ pr: 2 }}
									>
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'flex-end',
												gap: 0.5
											}}
										>
											<Tooltip title="Edit Country">
												<IconButton
													size="small"
													onClick={() => onEdit(country._id)}
													color="primary"
													sx={{
														'&:hover': {
															backgroundColor: 'rgba(59, 130, 246, 0.1)'
														}
													}}
												>
													<EditIcon fontSize="small" />
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete Country">
												<IconButton
													size="small"
													onClick={() => onDelete(country._id)}
													color="error"
													sx={{
														'&:hover': {
															backgroundColor: 'rgba(239, 68, 68, 0.1)'
														}
													}}
												>
													<DeleteIcon fontSize="small" />
												</IconButton>
											</Tooltip>
										</Box>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				component="div"
				count={totalItems}
				page={page - 1}
				onPageChange={(event, newPage) => onPageChange(newPage + 1)}
				rowsPerPage={limit}
				onRowsPerPageChange={event => {
					onLimitChange(parseInt(event.target.value, 10))
					onPageChange(1)
				}}
				rowsPerPageOptions={[5, 10, 25, 50]}
				labelRowsPerPage="Lines on a page:"
				sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
			/>
		</Box>
	)
}

export default CountriesTable

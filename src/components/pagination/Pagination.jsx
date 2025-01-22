import "./pag.css";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
const Paginationn = ({ handlePageChange, currentpage, totalPages }) => {

    return (
        <Stack spacing={0} className='pagination-container'>
            <Pagination shape="rounded" count={totalPages}
                page={currentpage}
                onChange={(e, p) => handlePageChange(p)}
                sx={{
                    '.MuiPaginationItem-root': {
                        color: '#fff', 
                        backgroundColor: '#1e1e1e',
                        '&:hover': {
                            backgroundColor: '#08ab4b', 
                        },
                    },
                }} />
        </Stack>

    )
}

export default Paginationn
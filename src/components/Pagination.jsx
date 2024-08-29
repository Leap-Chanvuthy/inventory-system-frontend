import { Pagination } from "@mui/material";

const GlobalPagination = ({ current_page, last_page, from, to, total, onPageChange }) => {
    return (
        <div className="flex items-center flex-col lg:flex-row gap-3 justify-between dark:bg-gray-700 rounded-lg py-2 px-3">
            <div>
                <p className="text-sm hidden lg:flex">
                    Showing {from} to {to} of {total} Entities
                </p>
            </div>
            <Pagination
                size="medium"
                color="primary"
                count={last_page}
                page={current_page}
                onChange={onPageChange}
                showFirstButton
                showLastButton
                shape="rounded"
            />
        </div>
    );
};

export default GlobalPagination;

import { TableFooter, TablePagination, TableRow } from '@mui/material';
import React, { memo } from 'react';
import { FC } from 'react';

export interface TableComponentFooterProps {
  pageSize: number;
  handlePageChange: (currentPage: number) => void;
  currentPage: number;
  totalRows: number;
  rowsPerPageOptions?: Array<number>;
  totalPages?: number;
}

export const TableComponentFooter: FC<TableComponentFooterProps> = memo(
  ({
    pageSize,
    currentPage,
    handlePageChange,
    totalRows,
    rowsPerPageOptions = [],
  }) => {
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            count={totalRows}
            rowsPerPage={pageSize}
            page={currentPage}
            showFirstButton={true}
            onPageChange={(event: any, zeroIndexBasedPage: number) => {
              handlePageChange(zeroIndexBasedPage);
            }}
            rowsPerPageOptions={rowsPerPageOptions}
          />
        </TableRow>
      </TableFooter>
    );
  }
);

TableComponentFooter.displayName = 'TableComponentFooter';

import { Table, Typography } from '@mui/material';
import React, { useCallback } from 'react';
import {
  TableComponentHeader,
  TableComponentBody,
  TableComponentFooter,
  TableComponentFilters,
} from '../../components/table';
import { usePaginateData } from './usePaginateData';
import { useFilterTableData } from './useFilterTableData';
import { useStyles } from './TableComponent.styles';
import { TTableComponent } from './TableComponent.types';

export const TABLE_COMPONENT__DEFAULT_PAGE_SIZE = 5;

export const TableComponent: TTableComponent = ({
  header,
  data,
  tableTitle,
  tableTitleProps,
  pageSize = TABLE_COMPONENT__DEFAULT_PAGE_SIZE,
  tableFilters,
  loading = false,
  onRowClick,
  getCustomRowClassName,
}) => {
  const { filteredData, filters, setFilters } = useFilterTableData(
    data,
    tableFilters
  );
  const { activePage, setActivePage, paginatedData } = usePaginateData(
    filteredData,
    pageSize
  );
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {tableTitle && (
        <Typography gutterBottom {...tableTitleProps}>
          {tableTitle}
        </Typography>
      )}
      {tableFilters && tableFilters.length > 0 && (
        <TableComponentFilters filters={filters} setFilters={setFilters} />
      )}
      <Table>
        <TableComponentHeader headerData={header} />
        <TableComponentBody
          rowData={paginatedData}
          headerData={header}
          pageSize={pageSize}
          loading={loading}
          onRowClick={onRowClick}
          getCustomRowClassName={getCustomRowClassName}
        />
        <TableComponentFooter
          totalRows={filteredData.length}
          currentPage={activePage}
          handlePageChange={useCallback(
            (pageNumber) => {
              setActivePage(pageNumber);
            },
            [setActivePage]
          )}
          pageSize={pageSize}
          totalPages={Math.ceil(filteredData.length / pageSize)}
        />
      </Table>
    </div>
  );
};

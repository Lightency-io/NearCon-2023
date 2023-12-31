import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { Requirements } from '@energyweb/origin-ui-core';
import { DemandsTable, BidsTable, AsksTable } from '../../containers';
import { useMyOrdersPageEffects } from './MyOrdersPage.effects';

export const MyOrdersPage = () => {
  const { bids, asks, isLoading, canAccessPage, requirementsProps } =
    useMyOrdersPageEffects();

  if (!canAccessPage) {
    return <Requirements {...requirementsProps} />;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box width="100%">
      <Box my={3}>
        <DemandsTable />
      </Box>
      <Box my={3}>
        <BidsTable bids={bids} isLoading={isLoading} />
      </Box>
      <Box my={3}>
        <AsksTable asks={asks} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default MyOrdersPage;

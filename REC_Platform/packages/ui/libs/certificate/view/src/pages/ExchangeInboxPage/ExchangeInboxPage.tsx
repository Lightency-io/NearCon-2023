import React, { FC } from 'react';
import { ItemsListWithActions, Requirements } from '@energyweb/origin-ui-core';
import { CircularProgress, Typography } from '@mui/material';
import { useExchangeInboxPageEffects } from './ExchangeInboxPage.effects';

export const ExchangeInboxPage: FC = () => {
  const {
    isLoading,
    listProps,
    noCertificatesText,
    canAccessPage,
    requirementsProps,
    txPending,
  } = useExchangeInboxPageEffects();

  if (isLoading) return <CircularProgress />;

  if (!canAccessPage) {
    return <Requirements {...requirementsProps} />;
  }

  return (
    <ItemsListWithActions
      emptyListComponent={<Typography>{noCertificatesText}</Typography>}
      disabled={txPending}
      {...listProps}
    />
  );
};

export default ExchangeInboxPage;

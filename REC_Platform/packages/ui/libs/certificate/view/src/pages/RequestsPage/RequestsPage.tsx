import React, { FC } from 'react';
import { TableComponent, Requirements } from '@energyweb/origin-ui-core';
import { useRequestsPageEffects } from './RequestsPage.effects';

export const RequestsPage: FC = () => {
  const { tableData, canAccessPage, requirementsProps } =
    useRequestsPageEffects();

  if (!canAccessPage) {
    return <Requirements {...requirementsProps} />;
  }

  return <TableComponent {...tableData} />;
};

export default RequestsPage;

import React, { FC } from 'react';
import { Skeleton } from '@mui/material';
import { MyDeviceCardsList } from '../../containers';
import { Requirements } from '@energyweb/origin-ui-core';
import { useMyDevicePageEffects } from './MyDevicesPage.effects';

export const MyDevicesPage: FC = () => {
  const {
    myDevices,
    allDeviceTypes,
    isLoading,
    canAccessPage,
    requirementsProps,
  } = useMyDevicePageEffects();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Skeleton width={1000} height={140} />
        <Skeleton width={1000} height={140} />
        <Skeleton width={1000} height={140} />
      </div>
    );
  }

  if (!canAccessPage) {
    return <Requirements {...requirementsProps} />;
  }

  return (
    <MyDeviceCardsList allDeviceTypes={allDeviceTypes} devices={myDevices} />
  );
};

export default MyDevicesPage;

import React from 'react';
import {
  useApiMyDevices,
  useAllDeviceFuelTypes,
  useAllSupply,
  ComposedPublicDevice,
  useApiUserAndAccount,
} from '@energyweb/origin-ui-exchange-data';
import {
  useLogicSupply,
  createDeviceWithSupply,
  usePermissionsLogic,
} from '@energyweb/origin-ui-exchange-logic';
import {
  useExchangeModalsDispatch,
  ExchangeModalsActionsEnum,
} from '../../context';
import { useTranslation } from 'react-i18next';
import { Edit, Remove } from '@mui/icons-material';
import { TableActionData } from '@energyweb/origin-ui-core';

export const useSupplyPageEffects = () => {
  const { t } = useTranslation();

  const dispatchModals = useExchangeModalsDispatch();

  const {
    user,
    exchangeDepositAddress,
    isLoading: userAndAccountLoading,
  } = useApiUserAndAccount();
  const { canAccessPage, requirementsProps } = usePermissionsLogic({
    user,
    exchangeDepositAddress,
  });
  const { myDevices: devices, isLoading: areDevicesLoading } =
    useApiMyDevices();

  const { allTypes: allFuelTypes, isLoading: isFuelTypesloading } =
    useAllDeviceFuelTypes();

  const { allSupply: supplies, isLoading: areSuppliesLoading } = useAllSupply();

  const getDeviceWithSupply = (
    id: ComposedPublicDevice['externalRegistryId']
  ) => {
    const device = devices.find((device) => device.externalRegistryId === id);

    const deviceWithSupply = createDeviceWithSupply({
      device,
      supplies,
      allFuelTypes,
    });

    return deviceWithSupply;
  };

  const openUpdateSupplyModal = (
    id: ComposedPublicDevice['externalRegistryId']
  ) => {
    const deviceWithSupply = getDeviceWithSupply(id);

    dispatchModals({
      type: ExchangeModalsActionsEnum.SHOW_UPDATE_SUPPLY,
      payload: {
        open: true,
        deviceWithSupply,
      },
    });
  };

  const openRemoveSupplyModal = (
    id: ComposedPublicDevice['externalRegistryId']
  ) => {
    const deviceWithSupply = getDeviceWithSupply(id);

    dispatchModals({
      type: ExchangeModalsActionsEnum.SHOW_REMOVE_SUPPLY,
      payload: {
        open: true,
        supplyId: deviceWithSupply?.supplyId,
      },
    });
  };

  const actions: TableActionData<ComposedPublicDevice['externalRegistryId']>[] =
    [
      {
        icon: <Edit />,
        name: t('exchange.supply.update'),
        onClick: openUpdateSupplyModal,
      },
      {
        icon: <Remove />,
        name: t('exchange.supply.remove'),
        onClick: openRemoveSupplyModal,
      },
    ];

  const loading =
    isFuelTypesloading ||
    areDevicesLoading ||
    areSuppliesLoading ||
    userAndAccountLoading;

  const tableData = useLogicSupply({
    devices,
    supplies,
    allFuelTypes,
    actions,
    loading,
  });

  return {
    tableData,
    canAccessPage,
    requirementsProps,
  };
};

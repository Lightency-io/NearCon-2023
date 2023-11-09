import { EnergyFormatter } from '@energyweb/origin-ui-utils';
import dayjs from 'dayjs';
import { BigNumber } from '@ethersproject/bignumber';
import { useTranslation } from 'react-i18next';
import { TUseSmartMeterTableArgs, TUseSmartMeterTableLogic } from '../types';

const formatReadsData = (reads: TUseSmartMeterTableArgs['reads']) => {
  
    console.log('reads: ',reads);
  
  return reads?.map((reading) => ({
    id: reading.timestamp,
    time: dayjs(new Date(reading.timestamp)).format('DD-MM-YYYY HH:mm'),
    meterValue: EnergyFormatter.format(BigNumber.from(reading.value)),
  }));
};

export const useSmartMeterTableLogic: TUseSmartMeterTableLogic = ({
  device,
  reads,
  loading,
}) => {
  const { t } = useTranslation();

  return {
    header: {
      time: t('device.detailView.smartMeter.tableTime', {
        timezone: device.timezone,
      }),
      meterValue: t('device.detailView.smartMeter.tableMeterValue', {
        unit: EnergyFormatter.displayUnit,
      }),
    },
    loading,
    pageSize: 5,
    data: formatReadsData(reads),
  };
};

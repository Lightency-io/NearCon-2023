import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { periodTypeOptions } from '../utils';
import React from 'react';
import { TimeFrame } from '@energyweb/utils-general';
import { TextFieldProps } from '@mui/material';
import { TUseRepeatedPurchaseFormLogic } from './types';

export const useRepeatedPurchaseFormLogic: TUseRepeatedPurchaseFormLogic = (
  mobileView: boolean
) => {
  const { t } = useTranslation();

  const fieldProps: TextFieldProps = {
    variant: 'filled' as any,
    margin: mobileView ? ('none' as any) : ('normal' as any),
  };

  return {
    initialValues: {
      period: TimeFrame.Daily,
      volume: null,
      startDate: null,
      endDate: null,
      price: null,
    },
    validationSchema: yup.object({
      volume: yup
        .number()
        .transform((value) => (isNaN(value) ? 0 : value))
        .min(1)
        .required()
        .label(t('exchange.viewMarket.energy')),
      price: yup
        .number()
        .transform((value) => (isNaN(value) ? 0 : value))
        .min(0.1)
        .required()
        .label(t('exchange.viewMarket.price')),
    }),
    fields: {
      period: {
        name: 'period',
        options: periodTypeOptions(t, true),
        label: t('exchange.viewMarket.period'),
        textFieldProps: fieldProps,
      },
      volume: {
        name: 'volume',
        label: t('exchange.viewMarket.volume'),
        textFieldProps: { margin: mobileView ? 'none' : 'normal' },
        endAdornment: {
          element: <div>{'MWh'}</div>,
        },
      },
      startDate: {
        name: 'startDate',
        label: t('exchange.viewMarket.demandStartDate'),
        textFieldProps: fieldProps,
      },
      endDate: {
        name: 'endDate',
        label: t('exchange.viewMarket.demandEndDate'),
        textFieldProps: fieldProps,
      },
      totalVolume: {
        name: 'totalVolume',
        label: t('exchange.viewMarket.totalVolume'),
      },
      price: {
        name: 'price',
        label: t('exchange.viewMarket.price'),
        textFieldProps: { margin: 'none' },
        endAdornment: {
          element: <div>{'USD'}</div>,
        },
      },
    },
    buttons: [
      {
        label: t('exchange.viewMarket.placeDemandButton'),
        buttonProps: {
          variant: 'contained' as any,
        },
      },
    ],
  };
};

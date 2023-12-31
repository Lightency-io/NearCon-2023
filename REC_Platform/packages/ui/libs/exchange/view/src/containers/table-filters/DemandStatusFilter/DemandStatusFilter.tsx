import { DemandStatus } from '@energyweb/exchange-irec-react-query-client';
import { SelectRegular } from '@energyweb/origin-ui-core';
import { demandStatusOptions } from '@energyweb/origin-ui-exchange-logic';
import { IconButton, InputAdornment } from '@mui/material';
import { Close } from '@mui/icons-material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface StatusFilterProps {
  value: DemandStatus;
  handleFilterChange: (newValue: DemandStatus | undefined) => void;
}

export const DemandStatusFilter: FC<StatusFilterProps> = ({
  value,
  handleFilterChange,
}) => {
  const { t } = useTranslation();
  const handleChange = (event: any) => {
    handleFilterChange(event.target.value);
  };
  const handleClear = () => {
    handleFilterChange(undefined);
  };
  return (
    <SelectRegular
      field={{
        name: 'statusFilter',
        label: t('exchange.myOrders.status'),
        options: demandStatusOptions(t),
        textFieldProps: {
          margin: 'dense',
          InputProps: value
            ? {
                endAdornment: (
                  <InputAdornment position="end" style={{ marginRight: 15 }}>
                    <IconButton onClick={handleClear}>
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined,
        },
      }}
      variant="filled"
      value={value}
      onChange={handleChange}
    />
  );
};

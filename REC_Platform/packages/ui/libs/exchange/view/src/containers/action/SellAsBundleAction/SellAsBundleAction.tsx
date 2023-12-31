import { AccountAssetDTO } from '@energyweb/exchange-react-query-client';
import { ListActionComponentProps } from '@energyweb/origin-ui-core';
import { TextField, Typography } from '@mui/material';
import React, { PropsWithChildren, ReactElement } from 'react';
import { BundleActionContent } from '../../list';
import { useSellActionEffects } from './SellAsBundleAction.effects';
import { useStyles } from './SellAsBundleAction.styles';

type SellAsBundleActionProps = ListActionComponentProps<
  AccountAssetDTO['asset']['id']
>;

export type TSellAsBundleAction = (
  props: PropsWithChildren<SellAsBundleActionProps>
) => ReactElement;

export const SellAsBundleAction: TSellAsBundleAction = ({
  selectedIds,
  resetIds,
}) => {
  const classes = useStyles();
  const {
    title,
    buttonText,
    totalPriceText,
    priceInputLabel,
    price,
    selectedItems,
    handlePriceChange,
    sellBundleHandler,
    setTotalAmount,
    totalPrice,
    buttonDisabled,
  } = useSellActionEffects(selectedIds, resetIds);

  return (
    <BundleActionContent
      title={title}
      buttonText={buttonText}
      selectedIds={selectedIds}
      selectedItems={selectedItems}
      submitHandler={sellBundleHandler}
      setTotalAmount={setTotalAmount}
      buttonDisabled={buttonDisabled}
    >
      <>
        <TextField
          fullWidth
          variant="standard"
          label={priceInputLabel}
          margin="dense"
          onChange={handlePriceChange}
          value={price}
        />
        <div className={classes.totalPrice}>
          <Typography color="textSecondary">{totalPriceText}</Typography>
          <Typography>$ {totalPrice}</Typography>
        </div>
      </>
    </BundleActionContent>
  );
};

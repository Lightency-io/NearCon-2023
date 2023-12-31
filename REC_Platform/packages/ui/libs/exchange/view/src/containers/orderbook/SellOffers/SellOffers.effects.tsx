import { OrderBookOrderDTO } from '@energyweb/exchange-irec-react-query-client';
import {
  useCachedAllFuelTypes,
  useCachedUser,
} from '@energyweb/origin-ui-exchange-data';
import { useSellOffersTableLogic } from '@energyweb/origin-ui-exchange-logic';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/styles';
import {
  ExchangeModalsActionsEnum,
  useExchangeModalsDispatch,
} from '../../../context';
import { useStyles } from './SellOffers.styles';

export const useSellOffersEffects = (
  asks: OrderBookOrderDTO[],
  isLoading: boolean
) => {
  const allFuelTypes = useCachedAllFuelTypes();
  const user = useCachedUser();
  const classes = useStyles();
  const dispatchModals = useExchangeModalsDispatch();

  const handleBuyClick = (id: OrderBookOrderDTO['id']) => {
    dispatchModals({
      type: ExchangeModalsActionsEnum.SHOW_BUY_DIRECT,
      payload: {
        open: true,
        ask: asks?.find((ask) => ask.id === id),
      },
    });
  };

  const tableProps = useSellOffersTableLogic({
    asks,
    onBuyClick: handleBuyClick,
    isLoading,
    allFuelTypes,
    user,
    className: classes.owned,
  });

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('md'));

  return { tableProps, mobileView };
};

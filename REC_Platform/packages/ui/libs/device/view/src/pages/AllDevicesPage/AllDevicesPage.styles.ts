import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '0 40px',
    [theme.breakpoints.down('lg')]: {
      padding: 0,
      justifyContent: 'center',
    },
  },
}));

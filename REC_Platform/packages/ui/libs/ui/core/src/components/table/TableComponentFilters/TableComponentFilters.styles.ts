import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    '& p': {
      marginLeft: 5,
    },
  },
  filtersContainer: {
    padding: '0 10px 20px',
  },
  filter: {
    margin: '0 10px',
  },
});

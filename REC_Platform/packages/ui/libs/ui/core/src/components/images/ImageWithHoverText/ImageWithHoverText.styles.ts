import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    width: 'auto',
  },
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: '.5s ease',
    backgroundColor: theme.palette.background.paper,
    opacity: 0,
    '&:hover': {
      opacity: 0.8,
    },
  },
}));

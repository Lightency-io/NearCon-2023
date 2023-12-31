import { LightenColor, ThemeModeEnum } from '@energyweb/origin-ui-theme';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    cursor: 'pointer',
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  selectedCard: {
    boxShadow: `0 0 3pt 2pt ${LightenColor(
      theme.palette.background.paper,
      40,
      theme.palette.mode
    )}`,
  },
  image: {
    width: 160,
    minHeight: 140,
    borderRight: `1px solid ${
      theme.palette.mode === ThemeModeEnum.Dark
        ? theme.palette.background.paper
        : theme.palette.text.primary
    }`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  contentWrapper: {
    width: '100%',
  },
  header: {
    backgroundColor: LightenColor(
      theme.palette.background.paper,
      8,
      theme.palette.mode
    ),
  },
}));

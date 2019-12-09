import { makeStyles } from '@material-ui/core/styles';

const heading = (theme) => ({
  fontSize: theme.typography.pxToRem(15),
  fontWeight: theme.typography.fontWeightRegular,
  flexBasis: '33.33%',
  flexShrink: 0,
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: heading(theme),
  headingBlocked: {
    ...heading(theme),
    color: theme.palette.secondary.main,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '33.33%',
  },
  TrineryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    flexBasis: '33.33%',
  },
}));

export default useStyles;

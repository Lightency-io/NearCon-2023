import { Grid, GridProps, Typography, TypographyProps } from '@mui/material';
import React, { FC } from 'react';
import { useStyles } from './IconText.styles';

export interface IconTextProps {
  icon: FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  subtitle?: string;
  titleProps?: TypographyProps;
  subtitleProps?: TypographyProps;
  iconProps?: React.SVGProps<SVGSVGElement>;
  gridContainerProps?: GridProps;
}

export const IconText: FC<IconTextProps> = ({
  icon: Icon,
  title,
  subtitle = '',
  titleProps,
  subtitleProps,
  iconProps,
  gridContainerProps,
}) => {
  const classes = useStyles();

  return (
    <Grid container my={1} alignItems="center" {...gridContainerProps}>
      <Grid item>
        <Icon className={classes.icon} {...iconProps} />
      </Grid>
      <Grid item mx={2}>
        <Typography variant="body1" {...titleProps}>
          {title}
        </Typography>
        <Typography
          variant="subtitle2"
          className={classes.subtitle}
          {...subtitleProps}
        >
          {subtitle}
        </Typography>
      </Grid>
    </Grid>
  );
};

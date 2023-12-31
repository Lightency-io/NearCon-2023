import React, { FC } from 'react';
import { Global, css } from '@emotion/react';
import {
  ThemeModeEnum,
  variables_darkTheme,
  variables_lightTheme,
} from '@energyweb/origin-ui-theme';
import { useTheme } from '@mui/material';

export const OriginGlobalStyles: FC = () => {
  const theme = useTheme();
  return (
    <Global
      styles={css({
        body: {
          backgroundColor:
            theme.palette.mode === ThemeModeEnum.Dark
              ? variables_darkTheme.bodyBackgroundColor
              : variables_lightTheme.bodyBackgroundColor,
          margin: 0,
        },
      })}
    />
  );
};

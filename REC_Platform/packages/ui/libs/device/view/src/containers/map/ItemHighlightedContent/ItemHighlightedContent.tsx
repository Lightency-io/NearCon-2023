import { Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { MapItem } from '@energyweb/origin-ui-core';
import { useStyles } from './ItemHighlightedContent.styles';

export const ItemHighlightedContent: FC<MapItem> = ({ name, ownerId, id }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6" className={classes.text} gutterBottom>
        <b>{name}</b>
      </Typography>
      <Typography className={classes.text} paragraph>
        <b>
          {t('device.map.owner')} id: {ownerId}
        </b>
      </Typography>
      <a className={classes.link} href={`device/detail-view/${id}`}>
        {t('device.map.seeMore')}
      </a>
    </div>
  );
};

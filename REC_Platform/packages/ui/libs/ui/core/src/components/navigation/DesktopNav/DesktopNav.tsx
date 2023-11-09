import { Box, BoxProps, Drawer, List, PaperProps } from '@mui/material';
import React, { FC, ReactNode, useMemo } from 'react';
import { EnergyWebLogo, SimpleLogo } from '@energyweb/origin-ui-assets';
import { IconLink } from '../../icons';
import {
  UsernameAndOrg,
  UsernameAndOrgProps,
} from '../../layout/UsernameAndOrg';
import { TMenuSection, NavBarSection } from '../NavBarSection';
import { useStyles } from './DesktopNav.styles';

export interface DesktopNavProps {
  userAndOrgData: UsernameAndOrgProps;
  isAuthenticated: boolean;
  menuSections: TMenuSection[];
  icon?: ReactNode;
  iconWrapperProps?: BoxProps;
  sidebarPaperProps?: PaperProps;
}

export const DesktopNav: FC<DesktopNavProps> = ({
  userAndOrgData,
  menuSections = [],
  isAuthenticated,
  icon,
  iconWrapperProps,
  sidebarPaperProps,
}) => {
  const classes = useStyles();
  const wrapperProps = useMemo(() => ({ className: classes.userAndOrg }), []);
  return (
    <Drawer
      open
      anchor="left"
      variant="permanent"
      className={classes.drawer}
      PaperProps={sidebarPaperProps}
    >
      <IconLink url="/" wrapperProps={iconWrapperProps}>
        <Box>
          <Box>
        {icon ? icon : <SimpleLogo className={classes.logo} />}
        </Box>
        </Box>
      </IconLink>
      {isAuthenticated && (
        <UsernameAndOrg wrapperProps={wrapperProps} {...userAndOrgData} />
      )}
      <List className={classes.list}>
        {menuSections.map((section) => (
          <NavBarSection key={section.sectionTitle} {...section} />
        ))}
      </List>
    </Drawer>
  );
};

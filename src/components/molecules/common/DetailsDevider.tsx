import React from 'react';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const DetailsDevider = (props: any) => {
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Typography
          {...props}
          align={context === DeviceType.isDesktopOrLaptop ? 'center' : 'center'}
          style={{
            fontStyle: 'normal',
            fontWeight: 400,
            whiteSpace: 'break-spaces',
            WebkitTapHighlightColor: 'transparent',
            textAlign: context === DeviceType.isDesktopOrLaptop ? 'left' : 'left',
            fontFamily: 'Signoria-Bold',
            color: `${theme.palette.common.white}`,
            fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
            textShadow: `1px 1px ${theme.palette.common.black}`,
          }}
        >
          |
        </Typography>
      )}
    </DeviceContextConsumer>
  );
};

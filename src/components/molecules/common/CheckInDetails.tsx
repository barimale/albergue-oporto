import React from 'react';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import { useTranslation } from 'react-i18next';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const CheckInDetails = (props: any) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          {...props}
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: context === DeviceType.isDesktopOrLaptop ? 'space-evenly' : 'space-evenly',
            backgroundColor: 'transparent',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            verticalAlign: 'center',
          }}
        >
          <Typography
            align={context === DeviceType.isDesktopOrLaptop ? 'center' : 'center'}
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
              whiteSpace: 'break-spaces',
              WebkitTapHighlightColor: 'transparent',
              textAlign: context === DeviceType.isDesktopOrLaptop ? 'left' : 'left',
              fontFamily: 'Signoria-Bold',
              color: `${theme.palette.common.white}`,
              fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px',
            }}
          >
            {`${t('Check In').toUpperCase()}: 2:30pm – 9:00pm`}
          </Typography>
        </div>
      )}
    </DeviceContextConsumer>
  );
};

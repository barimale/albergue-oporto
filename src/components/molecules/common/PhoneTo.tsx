/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { thirdMain } from '../../../customTheme';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { CommunicateProps } from '../../atoms/CommunicateProps';

export const PhoneTo = (props: CommunicateProps) => {
  const phoneNumber = '+351 220 140 515';
  const { t } = useTranslation();
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const { showLong, isLight } = props;
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <IconButton
          ref={hoverRef}
          href={`tel:${phoneNumber.replace(' ', '').replace('+', '00')}`}
          target="_blank"
          style={{
            opacity: opacityValue,
            height: context === DeviceType.isDesktopOrLaptop ? '26px' : '22px',
            width: context === DeviceType.isDesktopOrLaptop ? 'auto' : 'auto',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '10px',
            justifyContent: 'start',
            borderRadius: '0px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: 'transparent',
              alignItems: 'center',
            }}
          >
            <LocalPhoneIcon style={{
              color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
              height: context === DeviceType.isDesktopOrLaptop ? '26px' : '22px',
              width: context === DeviceType.isDesktopOrLaptop ? '26px' : '22px',
              borderRadius: '50%',
            }}
            />
            <Typography
              noWrap
              style={{
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '10px' : '10px',
                color: isLight !== undefined && isLight === true ? `${theme.palette.common.white}` : `${thirdMain}`,
                fontFamily: 'Signoria-Bold',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '16px',
              }}
            >
              {showLong !== undefined && showLong === true ? (
                phoneNumber
              ) : (
                context === DeviceType.isDesktopOrLaptop ? phoneNumber : t('Landline').toUpperCase()
              )}
            </Typography>
          </div>
        </IconButton>
      )}
    </DeviceContextConsumer>
  );
};

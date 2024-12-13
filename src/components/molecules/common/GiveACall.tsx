import React, { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CallEndIcon from '@material-ui/icons/CallEnd';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { thirdMain } from '../../../customTheme';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const GiveACall = (props: any) => {
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);
  const { anchorEl } = props;

  return (
    <DeviceContextConsumer>
      {(context) => (
        <IconButton
          {...props}
          ref={hoverRef}
          style={{
            opacity: opacityValue,
            height: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
            width: context === DeviceType.isDesktopOrLaptop ? 'auto' : 'auto',
            fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '10px',
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
            {Boolean(anchorEl).valueOf() === true ? (
              <CloseIcon style={{
                color: `${thirdMain}`,
                height: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
                width: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
                borderRadius: '50%',
              }}
              />
            ) : (
              <CallEndIcon style={{
                color: `${thirdMain}`,
                height: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
                width: context === DeviceType.isDesktopOrLaptop ? '30px' : '22px',
                borderRadius: '50%',
              }}
              />
            )}

          </div>
        </IconButton>
      )}
    </DeviceContextConsumer>
  );
};

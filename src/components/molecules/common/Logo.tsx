import React, { useRef } from 'react';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

import useOverEffectHook from '../../../hooks/useOverEffectHook';

export const Logo = (props: any) => {
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          {...props}
          style={{
            display: 'flex',
            width: props.siderWidth,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <img
            ref={hoverRef}
            src="/logo.webp"
            alt="logo"
            style={{
              border: context === DeviceType.isDesktopOrLaptop ? '3px white solid' : '1px white solid',
              borderRadius: '50%',
              cursor: context === DeviceType.isDesktopOrLaptop ? 'default' : 'pointer',
              opacity: context === DeviceType.isDesktopOrLaptop ? 1 : opacityValue,
              WebkitTapHighlightColor: 'transparent',
              height: context === DeviceType.isDesktopOrLaptop ? '50px' : `${props.siderWidth - 2}px`,
              objectFit: 'scale-down',
            }}
          />
        </div>
      )}
    </DeviceContextConsumer>
  );
};

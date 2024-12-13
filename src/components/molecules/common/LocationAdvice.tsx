import React, { useRef } from 'react';
import { IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { thirdMain } from '../../../customTheme';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import CopyToClipboard from '../../atoms/CopyToClipboard';

export const LocationAdvice = (props: any) => {
  const { t } = useTranslation();
  const copiedMessage = t('Copied');
  const address = 'R. do Barão de Forrester\n921-839\n 4050-350 Porto';
  const copiedAddress = 'R. do Barão de Forrester 921-839, 4050-350 Porto';
  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <CopyToClipboard
          TooltipProps={{
            title: copiedMessage, leaveDelay: 1000, leaveTouchDelay: 1000,
          }}
        >
          {({ copy }) => (
            <IconButton
              ref={hoverRef}
              {...props}
              disableRipple
              onClick={() => copy(copiedAddress)}
              style={{
                height: context === DeviceType.isDesktopOrLaptop ? 'auto' : '22px',
                width: context === DeviceType.isDesktopOrLaptop ? 'auto' : 'auto',
                justifyItems: 'left',
                margin: '0px',
                padding: '0px',
                borderRadius: '0px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  backgroundColor: 'transparent',
                  justifyItems: 'left',
                  padding: '0px',
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Typography
                  noWrap={false}
                  style={{
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    color: `${thirdMain}`,
                    padding: '0px',
                    margin: '0px',
                    textAlign: 'left',
                    width: 'auto',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {address}
                </Typography>
                <FileCopyIcon style={{
                  opacity: opacityValue,
                  color: `${thirdMain}`,
                  paddingLeft: '10px',
                  height: context === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                  width: context === DeviceType.isDesktopOrLaptop ? '16px' : '12px',
                  borderRadius: '50%',
                }}
                />
              </div>
            </IconButton>
          )}
        </CopyToClipboard>
      )}
    </DeviceContextConsumer>
  );
};

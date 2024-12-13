import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import useTheme from '@material-ui/core/styles/useTheme';
import { HomePath } from '../../../routes/Routes';
import useOverEffectHook from '../../../hooks/useOverEffectHook';
import { DeviceType, DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { useStyles } from '../../organisms/Header';

export const Title = (props: any) => {
  const classes = useStyles();
  const theme = useTheme();

  const hoverRef = useRef(null);
  const opacityValue = useOverEffectHook(hoverRef);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          {...props}
          style={{
            display: 'flex',
            width: 'auto',
            flexDirection: 'column',
            justifyContent: 'center',
            marginLeft: context === DeviceType.isDesktopOrLaptop ? `-${props.siderWidth !== undefined ? props.siderWidth / 2 : 3}px` : '-3px',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <Link
            ref={hoverRef}
            to={HomePath}
            style={{
              textDecoration: 'none',
              opacity: opacityValue,
            }}
          >
            <Typography
              className={classes.title}
              align="center"
              style={{
                color: `${theme.palette.secondary.main}`,
                WebkitTapHighlightColor: 'transparent',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                textAlign: 'center',
                // letterSpacing: '0.2em',
                fontFamily: 'Signoria-Bold',
              }}
            >
              ALBERGUE
            </Typography>
            <Typography
              className={classes.title}
              align="center"
              style={{
                color: `${theme.palette.secondary.main}`,
                WebkitTapHighlightColor: 'transparent',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                textAlign: 'center',
                fontFamily: 'Signoria-Bold',
              }}
            >
              DE PEREGRINOS
            </Typography>
            <Typography
              className={classes.title}
              align="center"
              style={{
                color: `${theme.palette.secondary.main}`,
                WebkitTapHighlightColor: 'transparent',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '16px' : '14px',
                textAlign: 'center',
                // letterSpacing: '0.5em',
                fontFamily: 'Signoria-Bold',
              }}
            >
              PORTO
            </Typography>
          </Link>
        </div>
      )}
    </DeviceContextConsumer>
  );
};

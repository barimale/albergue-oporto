import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import sizeMe, { SizeMe } from 'react-sizeme';
import useTheme from '@material-ui/core/styles/useTheme';

import MenuWithItems from '../molecules/mobile/MenuWithItems';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import LanguageSetter from '../molecules/common/LanguageSetter';
import { thirdMain } from '../../customTheme';
import { Title } from '../molecules/common/Title';
import { Logo } from '../molecules/common/Logo';
import { TitleWrapper } from '../molecules/common/TitleWrapper';
import { LogoWrapper } from '../molecules/common/LogoWrapper';
import { OpenHoursDetails } from '../molecules/common/OpenHoursDetails';
import { CheckOutDetails } from '../molecules/common/CheckOutDetails';
import { CheckInDetails } from '../molecules/common/CheckInDetails';
import { Ornament } from '../molecules/common/Ornament';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
  },
}));

function TopMenu(props: any) {
  const classes = useStyles();
  const theme = useTheme();
  const [paddingRight, setPaddingRight] = useState<number>(0);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <SizeMe
          monitorHeight
          monitorWidth
        >
          {(size) => (
            <div
              className={classes.root}
              style={{
                background: thirdMain,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
              }}
            >
              <AppBar
                position="sticky"
                style={{
                  backgroundColor: 'transparent',
                  paddingTop: context === DeviceType.isDesktopOrLaptop ? '5px' : '0px',
                  paddingBottom: '5px',
                  boxShadow: 'unset',
                  borderTop: context === DeviceType.isDesktopOrLaptop ? `8px solid ${theme.palette.primary.main}` : `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <Ornament />
                <Toolbar style={{
                  backgroundColor: 'transparent',
                  paddingTop: context === DeviceType.isDesktopOrLaptop ? '0px' : '5px',
                  paddingBottom: context === DeviceType.isDesktopOrLaptop ? '0px' : '5px',
                  paddingLeft: context === DeviceType.isDesktopOrLaptop ? '0px' : '0px',
                  paddingRight: context === DeviceType.isDesktopOrLaptop ? '32px' : '0px',
                }}
                >
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      width: '100%',
                      padding: '0px',
                      margin: '0px',
                      backgroundColor: 'transparent',
                      boxShadow: theme.shadows[2],
                      height: '50px',
                      marginTop: '-50px',
                    }}
                  />
                  {context === DeviceType.isTabletOrMobile && (
                    <MenuWithItems
                      top={size?.size?.height || 0}
                      left={0}
                      onSize={(size: any) => {
                        setPaddingRight(size.width || 0);
                      }}
                    />
                  )}
                  {context === DeviceType.isDesktopOrLaptop && (
                    <LogoWrapper
                      siderWidth={props.siderWidth}
                    >
                      <Logo
                        siderWidth={props.siderWidth}
                        style={{
                          paddingRight,
                        }}
                      />
                    </LogoWrapper>
                  )}
                  <TitleWrapper>
                    <Title
                      siderWidth={props.siderWidth}
                    />
                  </TitleWrapper>
                  <LanguageSetter top={size?.size?.height || 0} width={size.size.width} />
                </Toolbar>
                <Ornament />
              </AppBar>
              <AppBar
                position="sticky"
                style={{
                  backgroundColor: `${theme.palette.primary.main}`,
                  height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '26px' : '30px',
                }}
              >
                {context.valueOf() === DeviceType.isDesktopOrLaptop ? (
                  <div style={{
                    height: '100%', width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center',
                  }}
                  >
                    <CheckInDetails />
                    <OpenHoursDetails />
                    <CheckOutDetails />
                  </div>
                ) : (
                  <>
                    <OpenHoursDetails />
                    <div style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'space-evenly',
                    }}
                    >
                      <CheckInDetails />
                      <CheckOutDetails />
                    </div>
                  </>
                )}
              </AppBar>
            </div>
          )}
        </SizeMe>
      )}
    </DeviceContextConsumer>
  );
}

export default sizeMe({
  monitorHeight: true, monitorWidth: true,
})(TopMenu);

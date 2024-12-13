import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { useLocation, useHistory } from 'react-router-dom';
import { Grid, useTheme } from '@material-ui/core';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import SiderLeft from '../organisms/Sider';

import Footer from '../organisms/Footer';
import Header from '../organisms/Header';

const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const MainBackground = (props: any) => {
  const theme = useTheme();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div
          {...props}
          style={{
            backgroundColor: `${theme.palette.common.white}`,
            height: props?.style?.height !== undefined ? props?.style?.height : 'inherit',
            width: props?.style?.width !== undefined ? props?.style?.width : 'inherit',
            position: context.valueOf() === DeviceType.isDesktopOrLaptop ? 'sticky' : 'unset',
          }}
        >
          {props.children}
        </div>
      )}
    </DeviceContextConsumer>
  );
};

export const MainLayout = (props: any) => {
  const { innerHeight: height } = window;
  const [mainDivHeight, setMainDivHeight] = useState<number>(height);
  const [paddingTop, setPaddingTop] = useState<number>(0);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [siderWidth, setSiderWidth] = useState<number>(0);

  const isPortrait = useMediaQuery({
    orientation: 'portrait',
  });
  const prevVal = usePrevious(isPortrait);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    history.replace(location.pathname);
  }, [window.screen.width, window.screen.height]);

  useEffect(() => {
    if (prevVal === undefined) {
      return;
    }

    if (isPortrait !== prevVal) {
      history.replace(location.pathname);
    }
  }, [isPortrait, prevVal]);

  const mainLayoutRef = useRef(null);

  useEffect(() => {
    const resizeListener = () => {
      if (mainLayoutRef.current) {
        setMainDivHeight(window.innerHeight);
      }
    };
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [mainLayoutRef.current]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <Header
            onSize={(size: any) => {
              setPaddingTop(size.height || 0);
            }}
            siderWidth={siderWidth}
          />
          <main
            ref={mainLayoutRef}
            style={{
              height: mainDivHeight - paddingTop - footerHeight,
              width: '100%',
              paddingTop,
              paddingBottom: footerHeight,
              overflow: 'hidden',
            }}
          >

            {context.valueOf() === DeviceType.isDesktopOrLaptop ? (
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: '100%',
                width: '100%',
              }}
              >
                <DesktopLeftSection setSiderWidth={setSiderWidth} />
                <MainBackground style={{
                  height: 'inherit', width: '100%',
                }}
                >
                  {props.children}
                </MainBackground>
              </div>
            ) : (
              <MainBackground>
                {props.children}
              </MainBackground>
            )}
          </main>
          <Footer
            siderWidth={siderWidth}
            onSize={(size: any) => {
              setFooterHeight(size.height || 0);
            }}
          />
        </>
      )}
    </DeviceContextConsumer>
  );
};

const DesktopLeftSection = (props: any) => (
  <Grid
    container
    spacing={0}
    style={{
      width: 'max-content', verticalAlign: 'center', height: 'inherit',
    }}
  >
    <Grid
      item
      style={{
        height: 'inherit',
      }}
    >
      <SiderLeft onSize={(size: any) => {
        props.setSiderWidth(size.width || 0);
      }}
      />
    </Grid>
  </Grid>
);

export const ContentLayout = (props: any) => {
  const position: string = (props.style && props.style.position) ?? 'unset';

  return (
    <div
      {...props}
      style={{
        position,
        display: 'flex',
        flexDirection: 'column',
        width: 'inherit',
        height: 'inherit',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tansparent',
        paddingBottom: '10px',
        transition: 'all 0.4s ease',
        msTransition: 'all 0.4s ease',
        MozTransition: 'all 0.4s ease',
        WebkitTransition: 'all 0.4s ease',
      }}
    >
      {props.children}
    </div>
  );
};

import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer } from '@monsonjeremy/react-leaflet';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import React, { useEffect } from 'react';
import { Title } from '../screens/ContactPage';
import { LocationAdvice } from '../molecules/common/LocationAdvice';
import Paper from '../molecules/common/Paper';
import { position, albergueIcon, delayInMilliseconds, AlbergueFlyer } from '../molecules/common/AlbergueMapHelper';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { PortaledMarkerWithChildren } from '../molecules/common/PortaledMarker';
import { LoadingInProgress } from '../molecules/common/LoadingInProgress';

export default function ContactPageContent() {
  return (
    <Content />
  );
}

const Content = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Paper
          title={(
            <Typography
              align={context === DeviceType.isDesktopOrLaptop ? 'center' : 'center'}
              style={{
                fontStyle: 'normal',
                fontWeight: 600,
                width: '100%',
                whiteSpace: 'break-spaces',
                color: `${theme.palette.common.black}`,
                WebkitTapHighlightColor: 'transparent',
                fontSize: context === DeviceType.isDesktopOrLaptop ? '32px' : '20px',
                textAlign: context === DeviceType.isDesktopOrLaptop ? 'left' : 'center',
                fontFamily: 'Signoria-Bold',
                paddingLeft: context === DeviceType.isDesktopOrLaptop ? '20px' : 'unset',
                paddingTop: context === DeviceType.isDesktopOrLaptop ? '10px' : 'unset',
                paddingBottom: context === DeviceType.isDesktopOrLaptop ? '10px' : 'unset',
              }}
            >
              {t(Title).toUpperCase()}
            </Typography>
          )}
          content={
            <MapDetails />
          }
        />
      )}
    </DeviceContextConsumer>
  );
};

const MapDetails = (props: any) => (
  <DeviceContextConsumer>
    {() => (
      <MapContainer
        {...props}
        center={position}
        preferCanvas
        zoom={17}
        scrollWheelZoom
        style={{
          width: '100%',
          height: '100%',
          border: '0px',
        }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <PortaledMarkerWithChildren
          index={1}
          outerIndex={1}
          keyy={'al'.repeat(1)}
          position={position}
          prefix="albergue"
          icon={albergueIcon}
        >
          <div>
            <AlbergueFlyer
              onLoaded={() => {
              }}
            />
            <AlbergueDetailed
              onLoaded={() => {
              }}
            />
          </div>
        </PortaledMarkerWithChildren>
      </MapContainer>
    )}
  </DeviceContextConsumer>
);

const AddressDetails = (props: any) => (
  <div
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'left',
      borderRadius: '10px',
      width: 'max-content',
    }}
  >
    <LocationAdvice />
  </div>
);

export const AlbergueDetailed = (props: any) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, delayInMilliseconds);
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      props?.onLoaded();
    }
  }, [isLoading]);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignContent: 'left',
        }}
        >
          {isLoading.valueOf() === true ? (
            <LoadingInProgress />
          ) : (
            <ul
              className="facility-list"
              style={{
                listStyleType: 'none',
                paddingLeft: '0px',
                maxWidth: context === DeviceType.isDesktopOrLaptop ? '240px' : '140px',
              }}
            >
              <li>
                <Typography
                  style={{
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.black}`,
                    paddingBottom: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  {`${t('Our location')}:`}
                </Typography>
              </li>
              <li>
                <AddressDetails style={{
                  paddingBottom: '10px',
                }}
                />
              </li>
              <li>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'space-evenly',
                  paddingTop: '10px',
                }}
                >
                  <a
                    href="https://www.google.com/maps/dir//41.1597963,-8.6207608/@41.159796,-8.620761,16z?hl=en"
                    target="_blank"
                    className="pointerOverEffect"
                    rel="noreferrer"
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                    >
                      <CallSplitIcon />
                      {t('Directions')}
                    </div>
                  </a>
                </div>
              </li>
            </ul>
          )}
        </div>
      )}
    </DeviceContextConsumer>
  );
};

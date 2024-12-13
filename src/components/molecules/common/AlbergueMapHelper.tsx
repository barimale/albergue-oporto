import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { useMap } from '@monsonjeremy/react-leaflet';
import L, { LatLngTuple } from 'leaflet';

import 'leaflet.awesome-markers';
import '@fortawesome/free-solid-svg-icons';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import { PortaledMarkerWithChildren } from './PortaledMarker';
import { LoadingInProgress } from './LoadingInProgress';
import { PhoneToMobileInPopup } from './PhoneToMobile';
import { WebLinkTo } from './WebLinkTo';
import { MapItem } from '../../atoms/MapItem';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { AlbergueDetailed } from '../../pages/ContactPageContent';

export const delayInMilliseconds = 300;

export const albergueIcon = new L.AwesomeMarkers.Icon({
  icon: 'home',
  prefix: 'fa',
  markerColor: 'darkred',
  iconColor: 'white',
});

function defaultIcon (color: 'red' | 'darkred' | 'orange' | 'green' | 'darkgreen' | 'blue' | 'purple' | 'darkpurple' | 'cadetblue') {
  return new L.AwesomeMarkers.Icon({
    icon: 'circle',
    prefix: 'fa',
    markerColor: color,
    iconColor: 'white',
    extraClasses: 'fas',
  });
}

export const greenIcon = defaultIcon('green');
export const orangeIcon = defaultIcon('orange');
export const yellowIcon = defaultIcon('darkgreen');
export const purpleIcon = defaultIcon('cadetblue');
export const blueIcon = defaultIcon('blue');

export const position: LatLngTuple = [41.1597588, -8.6208183];

export const AlbergueMapItem: MapItem = {
  name: 'Albergue',
  description: 'albergue',
  type: 'albergue',
  position,
};

export const AlbergueMarker = () => (
  <DeviceContextConsumer>
    {() => (
      <PortaledMarkerWithChildren
        index={0}
        outerIndex={0}
        keyy={'alf'.repeat(1)}
        position={position}
        prefix="albergueflyer"
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
    )}
  </DeviceContextConsumer>
);

export const AlbergueFlyer = (props: any) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
        >
          {isLoading.valueOf() === true ? (
            <LoadingInProgress />
          ) : (
            <>
              <img
                style={{
                  height: context.valueOf() === DeviceType.isDesktopOrLaptop ? '40px' : '30px',
                  width: 'auto',
                  alignSelf: 'center',
                  padding: '0px',
                  paddingLeft: '0px',
                }}
                src="/logo.webp"
                alt="logo"
              />
              <div>
                <Typography
                  align="center"
                  style={{
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    textAlign: 'center',
                    fontFamily: 'Signoria-Bold',
                  }}
                >
                  {t('Header title.Line1')}
                </Typography>
                <Typography
                  align="center"
                  style={{
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    textAlign: 'center',
                    fontFamily: 'Signoria-Bold',
                  }}
                >
                  {t('Header title.Line2')}
                </Typography>
                <Typography
                  align="center"
                  style={{
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.black}`,
                    WebkitTapHighlightColor: 'transparent',
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    textAlign: 'center',
                    fontFamily: 'Signoria-Bold',
                  }}
                >
                  {t('Header title.Line3')}
                </Typography>
              </div>
            </>
          )}
        </div>
      )}
    </DeviceContextConsumer>
  );
};

type MapDetailsContentProp = {
  items: MapItem[];
}

export const MapDetailsContent = (props: PropsWithChildren<MapDetailsContentProp>) => {
  const { items: externals } = props;
  const items = [...externals, AlbergueMapItem];
  const map = useMap();

  map.whenReady(() => {
    const flatten: LatLngTuple[] = items.flatMap((p: MapItem) => [p.position]);
    const bounds = L.latLngBounds(flatten);

    map.fitBounds(bounds);
    map.invalidateSize();
  });

  return (
    <DeviceContextConsumer>
      {() => (
        <>
          {props.children}
          <AlbergueMarker />
        </>
      )}
    </DeviceContextConsumer>
  );
};

export type MapItemPopupContentProps = {
  item: MapItem;
}

export const MapItemPopupContent = (props: MapItemPopupContentProps) => {
  const { item } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, delayInMilliseconds);
  }, []);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
        }}
        >
          {isLoading.valueOf() === true ? (
            <LoadingInProgress />
          ) : (
            <>
              <Typography
                style={{
                  fontSize: context === DeviceType.isDesktopOrLaptop ? '14px' : '12px',
                  paddingLeft: '0px',
                  margin: '0px',
                  fontWeight: 'bold',
                  fontFamily: 'Signoria-Bold',
                  color: `${theme.palette.common.black}`,
                }}
              >
                {t(item.name)}
              </Typography>
              {item.description !== undefined && (
                <Typography
                  style={{
                    fontSize: context === DeviceType.isDesktopOrLaptop ? '12px' : '10px',
                    paddingLeft: '0px',
                    margin: '0px',
                    color: `${theme.palette.common.black}`,
                    paddingBottom: '5px',
                    fontFamily: 'Signoria-Bold',
                  }}
                >
                  {t(item.description)}
                </Typography>
              )}
              <ul
                className="facility-list"
                style={{
                  fontFamily: 'Signoria-Bold',
                  listStyleType: 'none',
                  padding: '0px',
                  textAlign: 'left',
                }}
              >
                {item.phoneNumber !== undefined && (
                  <li><PhoneToMobileInPopup showLong phoneNumber={item.phoneNumber || ''} /></li>
                )}
                {item.externalLink !== undefined && (
                  <li><WebLinkTo showLong url={item.externalLink || ''} /></li>
                )}
                <li>
                  <a
                    href={`https://www.google.com/maps/dir//${item.position[0]},${item.position[1]}/@${item.position[0]},${item.position[1]},16z?hl=en`}
                    rel="noreferrer"
                    target="_blank"
                    className="pointerOverEffect"
                  >
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    >
                      <CallSplitIcon />
                      {t('Directions')}
                    </div>
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </DeviceContextConsumer>
  );
};

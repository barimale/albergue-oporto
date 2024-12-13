/* eslint-disable no-unused-vars */
import { MapContainer, TileLayer, LayersControl } from '@monsonjeremy/react-leaflet';
import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { MapDetailsContent, orangeIcon, position } from '../molecules/common/AlbergueMapHelper';

import { MapItem } from '../atoms/MapItem';
import { LegendedOverlay } from '../molecules/common/LegendedOverlay';

import { GroupBy } from '../../utilities/CollectionsHelper';

export const RestaurantsContent = () => (
  <Restaurants />
);

const Restaurants = () => (
  <DeviceContextConsumer>
    {() => (
      <div style={{
        height: '100%',
        width: '100%',
        padding: '0px',
      }}
      >
        <MapDetails style={{
          height: '100%',
          width: '100%',
        }}
        />
      </div>
    )}
  </DeviceContextConsumer>
);

const restaurants: Array<MapItem> = [
  {
    name: 'Quinta Amarela',
    description: 'Restaurant',
    type: 'flatware',
    position: [41.16123134123641, -8.624545974369896],
  },
  {
    name: 'Restaurante Alicantina',
    description: 'Restaurant',
    type: 'flatware',
    position: [41.16084156863542, -8.621239458256467],
  },
  {
    name: 'Confeitaria Nandinha',
    description: 'Coffeehouse',
    type: 'local_cafe',
    position: [41.16116896160765, -8.620868204545076],
  },
];

const MapDetails = (props: any) => {
  const grouped = GroupBy(restaurants, 'type');

  return (
    <DeviceContextConsumer>
      {(context) => (
        <MapContainer
          center={position}
          preferCanvas
          zoom={16}
          scrollWheelZoom
          style={{
            width: '100%',
            height: '100%',
            border: '0px',
          }}
        >
          <LayersControl position="topright" collapsed={context.valueOf() === DeviceType.isTabletOrMobile}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapDetailsContent items={restaurants}>
              {Array.from(grouped.keys()).map((key: string, outerIndex: number) => (
                <LegendedOverlay
                  icon={orangeIcon}
                  outerIndex={outerIndex}
                  keyy={key}
                  items={grouped.get(key)}
                  prefix="restaurants"
                />
              ))}
            </MapDetailsContent>
          </LayersControl>
        </MapContainer>
      )}

    </DeviceContextConsumer>
  );
};

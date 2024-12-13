/* eslint-disable no-unused-vars */
import { MapContainer, TileLayer, LayersControl } from '@monsonjeremy/react-leaflet';
import React from 'react';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { position, MapDetailsContent, blueIcon } from '../molecules/common/AlbergueMapHelper';

import { MapItem } from '../atoms/MapItem';

import { LegendedOverlay } from '../molecules/common/LegendedOverlay';

import { GroupBy } from '../../utilities/CollectionsHelper';

export const TransportContent = () => (
  <Transport />
);

const Transport = () => (
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

const transports: Array<MapItem> = [
  {
    name: 'Carolina Michaelis',
    description: 'Metro station',
    externalLink: 'https://www.metrodoporto.pt/',
    type: 'subway',
    position: [41.1585585, -8.6218958],
  },
  {
    name: 'Terminal Alsa',
    description: 'Bus station',
    externalLink: 'https://www.alsa.com',
    type: 'bus',
    position: [41.16129174926166, -8.629608563739145],
  },
  {
    name: 'Estação Campanhã',
    description: 'Train station',
    externalLink: 'https://www.cp.pt/passageiros/pt/consultar-horarios/estacoes/porto-campanha',
    type: 'train',
    position: [41.151548551715095, -8.586039815766961],
  },
  {
    name: 'Aeroporto Francisco Sá Carneiro',
    description: 'Airport',
    externalLink: 'https://www.aeroportoporto.pt',
    type: 'local_airport',
    position: [41.2483, -8.6807],
  },
];

const MapDetails = (props: any) => {
  const grouped = GroupBy(transports, 'type');

  return (
    <DeviceContextConsumer>
      {(context) => (
        <MapContainer
          center={position}
          preferCanvas
          zoom={14}
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
            <MapDetailsContent items={transports}>
              {Array.from(grouped.keys()).map((key: string, outerIndex: number) => (
                <LegendedOverlay
                  icon={blueIcon}
                  outerIndex={outerIndex}
                  keyy={key}
                  items={grouped.get(key)}
                  prefix="transports"
                />
              ))}
            </MapDetailsContent>
          </LayersControl>
        </MapContainer>
      )}
    </DeviceContextConsumer>
  );
};

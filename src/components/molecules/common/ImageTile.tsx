import React, { useState } from 'react';

import GridListTileBar from '@material-ui/core/GridListTileBar';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { ImageTileBar } from './ImageTileBar';
import { Image } from './Image';
import { ImageDetails } from '../../pages/GalleryPageContent';

type ImageTileProps = {
    index: number;
    tile: ImageDetails;
};
export const ImageTile = (props: ImageTileProps) => {
  const { tile, index } = props;
  const [isDisplayed] = useState<boolean>(false);

  return (
    <DeviceContextConsumer>
      {(context) => (
        <>
          <Image
            src={tile.src}
            alt={tile.src + index}
          />
          <GridListTileBar
            title={(
              <ImageTileBar
                isOpen={isDisplayed}
                item={tile}
                id={(context.valueOf() === DeviceType.isDesktopOrLaptop ? 'ccm' : 'ccd') + index}
              />
)}
          />
        </>
      )}
    </DeviceContextConsumer>
  );
};

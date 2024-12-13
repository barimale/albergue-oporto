import React from 'react';
import { makeStyles, hexToRgb } from '@material-ui/core/styles';
import sizeMe from 'react-sizeme';
import { DeviceContextConsumer } from '../../contexts/DeviceContext';
import MenuButtons, { Divider } from '../molecules/desktop/MenuButtons';
import { thirdMain } from '../../customTheme';
import { RGBToRGBA } from '../../utilities';

import ExternalSitesButtons from '../molecules/desktop/ExternalSitesButtons';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: `${RGBToRGBA(hexToRgb(thirdMain), 0.75)}`,
    maxHeight: '100%',
    height: '100%',
    overflow: 'auto',
    width: 'max-content',
    padding: '0px',
  },
  menuButton: {
  },
}));

function SiderLeft (props: any) {
  const { style } = props;
  const classes = useStyles();

  return (
    <DeviceContextConsumer>
      {() => (
        <div
          className={classes.root}
          style={{
            ...style,
            background: thirdMain,
          }}
        >
          <MenuButtons />
          <ExternalSitesButtons />
          <Divider />
        </div>
      )}
    </DeviceContextConsumer>
  );
}

export default sizeMe({
  monitorHeight: true, monitorWidth: true,
})(SiderLeft);

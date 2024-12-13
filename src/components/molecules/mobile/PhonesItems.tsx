import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { withSize } from 'react-sizeme';
import { PhoneTo } from '../common/PhoneTo';
import { PhoneToMobile } from '../common/PhoneToMobile';

type PhoneItemsProps ={
  handleClose: () => void;
}

const PhoneItems = (props: PhoneItemsProps) => (
  <div style={{
    padding: '0px', height: '100%',
  }}
  >
    <MenuItem
      key={0}
      onClick={props.handleClose}
    >
      <PhoneToMobile showLong={false} isLight phoneNumber="+351 912 591 321" />
    </MenuItem>
    <Divider orientation="horizontal" />
    <MenuItem
      key={1}
      onClick={props.handleClose}
    >
      <PhoneTo showLong={false} isLight />
    </MenuItem>
  </div>
);

export default withSize({
  monitorHeight: true,
})(PhoneItems);

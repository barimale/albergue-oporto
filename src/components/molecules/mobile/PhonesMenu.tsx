/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useState } from 'react';
import sizeMe from 'react-sizeme';
import { Fade } from '@material-ui/core';
import { GiveACall } from '../common/GiveACall';
import { StyledPhoneMenu } from '../../../customTheme';
import PhoneItems from './PhonesItems';

type PhonesMenuProps = {
  bottom: number;
  left: number;
}

const PhonesMenu = (props: PhonesMenuProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuHeight, setMenuHeight] = useState<number>(0);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <GiveACall anchorEl={anchorEl} aria-controls="phone-menu" aria-haspopup="true" onClick={handleClick} />
      <StyledPhoneMenu
        elevation={0}
        id="phone-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        marginThreshold={0}
        onClose={handleClose}
        anchorReference="anchorPosition"
        TransitionComponent={Fade}
        anchorPosition={
        {
          top: menuHeight,
          left: props.left,
        }
}
      >
        <PhoneItems
          handleClose={handleClose}
          onSize={(size: any) => {
            setMenuHeight(window.innerHeight - 2 * size?.height + props.bottom);
          }}
        />
      </StyledPhoneMenu>
    </div>
  );
};

export default sizeMe({
  monitorWidth: true,
})(PhonesMenu);

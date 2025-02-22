/* eslint-disable react/require-default-props */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-unused-vars */
import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip';
import copy from 'clipboard-copy';
import * as React from 'react';

interface ChildProps {
  copy: (content: any) => void;
}

interface Props {
  TooltipProps?: Partial<TooltipProps>;
  children: (props: ChildProps) => React.ReactElement<any>;
}

interface OwnState {
  showTooltip: boolean;
}

/**
 * Render prop component that wraps element in a Tooltip that shows "Copied to clipboard!" when the
 * copy function is invoked
 */
class CopyToClipboard extends React.Component<Props, OwnState> {
  public state: OwnState = {
    showTooltip: false,
  };

  private onCopy = (content: any) => {
    copy(content);
    this.setState({
      showTooltip: true,
    });
  };

  private handleOnTooltipClose = () => {
    this.setState({
      showTooltip: false,
    });
  };

  public render () {
    return (
      <Tooltip
        open={this.state.showTooltip}
        title="Copied to clipboard!"
        leaveDelay={1500}
        onClose={this.handleOnTooltipClose}
        {...this.props.TooltipProps || {
        }}
      >
        {this.props.children({
          copy: this.onCopy,
        }) as React.ReactElement<any>}
      </Tooltip>
    );
  }
}

export default CopyToClipboard;

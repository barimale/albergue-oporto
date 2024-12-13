import React from 'react';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AppBar from '@material-ui/core/AppBar';
import sizeMe from 'react-sizeme';
import { a11yProps } from './TabPanel';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';

export const indexer = (type: DeviceType, index: number) => {
  if (type === DeviceType.isDesktopOrLaptop) {
    return index;
  }
  return index;
};

export const parentId = 'TheWay-tabs';
export const tabPrefix = 'TheWay-tabs-item';

const TheWayTabs = (props: any) => {
  const { value, onChange } = props;
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <AppBar position="static">
          <Tabs
            variant="scrollable"
            scrollButtons="on"
            value={value}
            onChange={onChange}
            aria-label="The Way tabs"
            style={{
            }}
          >
            <Tab label={t('Caminho Português da Costa').toUpperCase()} {...a11yProps(indexer(context, 0), parentId, tabPrefix)} />
            <Tab label={t('Caminho Português Central').toUpperCase()} {...a11yProps(indexer(context, 1), parentId, tabPrefix)} />
          </Tabs>
        </AppBar>
      )}
    </DeviceContextConsumer>
  );
};

export default sizeMe({
  monitorHeight: true,
})(TheWayTabs);

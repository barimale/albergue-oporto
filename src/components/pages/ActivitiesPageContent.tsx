import React, { useState } from 'react';

import Paper from '../molecules/common/Paper';
import { DeviceContextConsumer, DeviceType } from '../../contexts/DeviceContext';
import { TabPanel, useTabPanelStyles } from '../molecules/common/TabPanel';
import ActivitiesTabs, { parentId, tabPrefix } from '../molecules/common/ActivitiesTabs';
import { ActivitiesPhotosContent } from '../organisms/ActivitiesPhotosContent';
import { ActivitiesScheduleContent } from '../organisms/ActivitiesScheduleContent';

const indexer = (type: DeviceType, index: number) => {
  if (type === DeviceType.isDesktopOrLaptop) {
    return index;
  }
  return index;
};

export default function ActivitiesPageContent () {
  return (
    <ContentWithTabs />
  );
}

const ContentWithTabs = () => {
  const classes = useTabPanelStyles();
  const [value, setValue] = useState<number>(0);
  const [activitiesTabHeight, setActivitiesTabHeight] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Paper
          title={(
            <ActivitiesTabs
              value={value}
              onChange={handleChange}
              onSize={(size: any) => {
                setActivitiesTabHeight(size.height || 0);
              }}
            />
          )}
          content={(
            <div className={classes.root}>
              <div style={{
                height: context === DeviceType.isDesktopOrLaptop ? `calc(100% - ${activitiesTabHeight}px)` : `calc(100% - ${activitiesTabHeight}px)`,
              }}
              >
                <TabPanel
                  value={value}
                  index={indexer(context, 0)}
                  parentId={parentId}
                  tabPrefix={tabPrefix}
                >
                  <ActivitiesPhotosContent />
                </TabPanel>
                <TabPanel
                  value={value}
                  index={indexer(context, 1)}
                  parentId={parentId}
                  tabPrefix={tabPrefix}
                >
                  <ActivitiesScheduleContent />
                </TabPanel>
              </div>
            </div>
          )}
        />
      )}
    </DeviceContextConsumer>
  );
};

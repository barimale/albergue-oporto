import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { CenteredDiv } from '../../templates/divs';
import { ContentLayout } from '../../templates/MainLayout';

export const LoadingInProgress = () => (
  <ContentLayout>
    <CenteredDiv>
      <CircularProgress color="primary" />
    </CenteredDiv>
  </ContentLayout>
);

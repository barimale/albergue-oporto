import React from 'react';
import { FormikProps } from 'formik';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';
import { ReservationDetails } from '../../pages/ReservationPageContent';
import { MyTextField } from '../../atoms/MyTextField';
import { defaultXs, defaultSm, Today } from '../../organisms/ReservationForm';

export const CheckInField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {() => (
        <Grid item xs={defaultXs} sm={defaultSm}>
          {isMobile ? (
            <MyTextField
              id="checkIn"
              name="checkIn"
              inputProps={{
                min: Today(), max: '2100-01-01',
              }}
              label={t('Check-In')}
              type="date"
              margin="dense"
              error={Boolean(props.touched.checkIn && props.errors.checkIn)}
              helperText={props.touched.checkIn && props.errors.checkIn}
              InputLabelProps={{
                shrink: true,
              }}
              native={isMobile}
              fullWidth
            />
          ) : (
            <MyTextField
              id="checkIn"
              name="checkIn"
              inputProps={{
                min: Today(), max: '2100-01-01',
              }}
              label={t('Check-In')}
              type="date"
              margin="dense"
              error={Boolean(props.touched.checkIn && props.errors.checkIn)}
              helperText={props.touched.checkIn && props.errors.checkIn}
              InputLabelProps={{
                shrink: true,
              }}
              native={isMobile}
              fullWidth
            />
          )}
        </Grid>
      )}
    </DeviceContextConsumer>
  );
};

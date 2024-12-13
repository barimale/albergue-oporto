import React from 'react';
import { FormikProps } from 'formik';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { ReservationDetails } from '../../pages/ReservationPageContent';
import { DeviceContextConsumer, DeviceType } from '../../../contexts/DeviceContext';
import { defaultXs } from '../../organisms/ReservationForm';

export const NotesField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();

  return (
    <DeviceContextConsumer>
      {(context) => (
        <Grid item xs={defaultXs} sm={defaultXs}>
          <TextField
            id="message"
            name="message"
            label={t('Notes')}
            multiline
            rowsMax={5}
            rows={5}
            defaultValue=""
            margin="dense"
            variant="outlined"
            SelectProps={{
              native: context.valueOf() !== DeviceType.isDesktopOrLaptop,
            }}
            helperText={props.touched.message && props.errors.message}
            error={Boolean(props.touched.message && props.errors.message)}
            fullWidth
          />
        </Grid>
      )}
    </DeviceContextConsumer>
  );
};

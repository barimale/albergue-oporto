import React from 'react';
import { FormikProps } from 'formik';
import { TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { isMobile } from 'react-device-detect';
import { defaultXs, defaultSm } from '../../organisms/ReservationForm';
import { ReservationDetails } from '../../pages/ReservationPageContent';
import { DeviceContextConsumer } from '../../../contexts/DeviceContext';

export const SexField = (props: FormikProps<ReservationDetails>) => {
  const { t } = useTranslation();
  const options = [
    {
      title: t('Male'), code: 'm',
    },
    {
      title: t('Female'), code: 'f',
    }];
  return (
    <DeviceContextConsumer>
      {() => (
        <Grid item xs={defaultXs} sm={defaultSm}>
          {isMobile === false ? (
            <Autocomplete
              id="sex"
              options={options}
              getOptionSelected={(option: any, value: any) => option.code === value.code}
              getOptionLabel={(option: any) => option.title}
              onChange={(e, value) => props.setFieldValue('sex', value?.code || '')}
              onOpen={props.handleBlur}
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={props.touched.sex && props.errors.sex}
                  error={Boolean(props.touched.sex && props.errors.sex)}
                  fullWidth
                  label={t('Sex')}
                  variant="outlined"
                  margin="dense"
                />
              )}
            />
          ) : (
            <TextField
              id="sex"
              select
              fullWidth
              variant="outlined"
              label={t('Sex')}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                props.setFieldValue('sex', event.target.value || '');
              }}
              SelectProps={{
                native: true,
              }}
              helperText={props.touched.sex && props.errors.sex}
              error={Boolean(props.touched.sex && props.errors.sex)}
              defaultValue="-"
            >
              <option disabled key="-" value="-">
                -
              </option>
              {options.map((item: any) => (
                <option key={item.code} value={item.title}>
                  {item.title}
                </option>
              ))}
            </TextField>
          )}
        </Grid>
      )}
    </DeviceContextConsumer>
  );
};

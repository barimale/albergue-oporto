/* eslint-disable react/no-array-index-key */
import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@material-ui/core/styles';
import { configSection, configSectionType, OrderedSectionsConfiguration, GetFullPathTo } from '../../../routes/RouterConfiguration';

export default function MenuButtons(props: any) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <div
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        verticalAlign: 'center',
        fontSize: '16px',
        width: '100%',
        color: `${theme.palette.common.white}`,
        // marginRight: '2px',
      }}
    >
      {OrderedSectionsConfiguration.map((section: configSection, index: number) => {
        switch (section.type) {
          case (configSectionType.divider):
            return null;
          case (configSectionType.link):
            return (
              <Link
                to={GetFullPathTo(section.title)}
                style={{
                  textDecoration: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'Signoria-Bold',
                  whiteSpace: 'break-spaces',
                  borderRadius: '0px',
                  border: `0.5px solid ${theme.palette.common.black}`,
                }}
              >
                <Button
                  className="pointerOverEffect"
                  tabIndex={index}
                  key={index}
                  color="inherit"
                  style={{
                    width: '100%',
                    fontSize: 'inherit',
                    fontFamily: 'Signoria-Bold',
                    whiteSpace: 'break-spaces',
                  }}
                >
                  {t(section.title).toUpperCase()}
                </Button>
              </Link>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export const Divider = (props: any) => (
  <div
    {...props}
    style={{
      paddingLeft: '0px',
      paddingRight: '0px',
      height: '0px',
      width: '100%',
      alignSelf: 'center',
    }}
  >
    <div style={{
      height: '0px',
      width: '100%',
      borderTop: '0.5px solid black',
    }}
    />
  </div>
);

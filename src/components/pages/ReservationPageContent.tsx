/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ReservationForm } from '../organisms/ReservationForm';

export type ReservationDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    checkIn: string;
    checkOut: string;
    documentType: string;
    passport: string;
    sex: string;
    age: string;
    nationality: string;
    documentCountryExpeditor: string;
    residenceCountry: string;
}

export default function ReservationPageContent () {
  return (
    <ReservationForm />
    // <ExternalReservation />
  );
}

// ref does not work
const ExternalReservation = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(
    (iframeRef as unknown as any)?.contentWindow?.document?.body !== null,
  );

  useEffect(() => {
    function removeMenu () {
      if (iframeRef && iframeRef?.current) {
        const allDivs = iframeRef.current.querySelectorAll('div.col-sm-2');
        iframeRef.current.removeChild(allDivs[0]);
      }
    }
    setIsMounted((iframeRef as unknown as any)?.contentWindow?.document?.body !== null);

    if (iframeRef && iframeRef?.current && iframeRef?.current?.contentWindow) {
      iframeRef.current.contentWindow.onload = function () {
        removeMenu();
      };
    }
  }, [(iframeRef as unknown as any)?.contentWindow?.document?.body]);

  return (
    isMounted.valueOf() === true
      ? (
        <div
          dangerouslySetInnerHTML={{
            __html: `<iframe ref=${iframeRef} src='http://albergue.hectormarti.com/reservation' sandbox='allow-scripts' loading='eager' height='100%' width='100%' style='border:none;' referrerpolicy='no-referrer'/>`,
          }}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      ) : (<>Something went wrong.</>)
  );
};

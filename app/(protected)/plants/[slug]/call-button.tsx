"use client";
import { Button } from '@mui/material';
import React, { useState } from 'react';

interface CallButtonProps {
  phoneNumber?: string;
}

const formatPhoneNumber = (phoneNumber: string) => {
    return `(+48) ${phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3')}`;
}

export default function CallButton({ phoneNumber }: CallButtonProps) {
  const [isNumberVisible, setIsNumberVisible] = useState(false);

  const handleClick = () => {
    if (!phoneNumber) return;

    if (!isNumberVisible) {
      setIsNumberVisible(true);
    } else {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  if (!phoneNumber) return null;

  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        width: '300px',
        px: 4,
        py: 2,
        color: 'black',
        backgroundColor: 'white',
        fontSize: '18px',
        textTransform: 'none',
        fontWeight: 'bold',
        boxSizing: 'border-box',
        '&:hover': {
          borderColor: 'black',
          borderWidth: 4,
          margin: '-2px',
          backgroundColor: 'white',
        },
      }}
    >
      {isNumberVisible ? (
        <a
          href={`tel:${phoneNumber}`}
          data-testid="contact-phone"
          style={{
            color: 'inherit',
            textDecoration: 'none',
            pointerEvents: 'none',
          }}
        >
          {formatPhoneNumber(phoneNumber)}
        </a>
      ) : (
        'Zadzwoń'
      )}
    </Button>
  );
}

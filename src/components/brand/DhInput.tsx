'use client';

import React from 'react';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export interface DhInputProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * DhInput — text field molecule.
 * Always outlined. Zero radius, mono label, lime focus ring.
 */
export function DhInput({ startIcon, endIcon, slotProps, ...props }: DhInputProps) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          startAdornment: startIcon
            ? <span style={{ marginRight: 8, display: 'flex', alignItems: 'center' }}>{startIcon}</span>
            : undefined,
          endAdornment: endIcon
            ? <span style={{ marginLeft: 8, display: 'flex', alignItems: 'center' }}>{endIcon}</span>
            : undefined,
          ...(slotProps?.input as object),
        },
        ...slotProps,
      }}
      {...props}
    />
  );
}

'use client';

import React from 'react';
import MuiButton, { type ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { palette, motion } from '@/lib/theme/tokens';

export interface DhButtonProps extends ButtonProps {
  loading?: boolean;
  iconEnd?: React.ReactNode;
}

/**
 * DhButton — DreamHouse primary interaction primitive.
 *
 * Variants:
 *   contained primary  → lime fill, ink text (call-to-action)
 *   contained secondary → stone fill (secondary action)
 *   outlined           → ghost, border accent
 *   text               → minimal, no chrome
 */
export function DhButton({
  children,
  loading = false,
  disabled,
  iconEnd,
  sx,
  ...props
}: DhButtonProps) {
  return (
    <MuiButton
      disabled={disabled || loading}
      endIcon={
        loading ? (
          <CircularProgress
            size={14}
            sx={{ color: 'inherit' }}
          />
        ) : iconEnd
      }
      sx={{
        position: 'relative',
        // Lime underline reveal on hover for text variant
        ...(props.variant === 'text' && {
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 6,
            left: 16,
            right: 16,
            height: '1px',
            backgroundColor: palette.lime,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: `transform ${motion.duration.normal} ${motion.easing.architectural}`,
          },
          '&:hover::after': { transform: 'scaleX(1)' },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}

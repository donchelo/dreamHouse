'use client';

import React from 'react';
import MuiCard, { type CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { palette, motion } from '@/lib/theme/tokens';

export interface DhCardProps extends CardProps {
  /** Adds a lime left-border accent. */
  accent?: boolean;
  /** Makes the card interactive (hover lift). */
  interactive?: boolean;
  noPadding?: boolean;
}

export function DhCard({
  children,
  accent = false,
  interactive = false,
  noPadding = false,
  sx,
  ...props
}: DhCardProps) {
  return (
    <MuiCard
      sx={{
        ...(accent && {
          borderLeft: `2px solid ${palette.lime}`,
        }),
        ...(interactive && {
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: palette.lime,
          },
          transition: `all ${motion.duration.normal} ${motion.easing.architectural}`,
        }),
        ...sx,
      }}
      {...props}
    >
      {noPadding ? children : <CardContent>{children}</CardContent>}
    </MuiCard>
  );
}

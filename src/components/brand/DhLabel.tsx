'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { palette, typography as t } from '@/lib/theme/tokens';

export interface DhLabelProps {
  /** The eyebrow number/index, e.g. "01" */
  index?: string;
  children: React.ReactNode;
  /** Draws the lime left-bar accent */
  accent?: boolean;
}

/**
 * DhLabel — section eyebrow / overline.
 *
 * Usage:
 *   <DhLabel index="01">Nuestra Visión</DhLabel>
 */
export function DhLabel({ index, children, accent = false }: DhLabelProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        ...(accent && {
          pl: 2,
          borderLeft: `2px solid ${palette.lime}`,
        }),
      }}
    >
      {index && (
        <Typography
          component="span"
          sx={{
            fontFamily: t.fontMono,
            fontSize: t.size['2xs'],
            fontWeight: t.weight.bold,
            letterSpacing: t.tracking.caps,
            color: palette.stone500,
            textTransform: 'uppercase',
          }}
        >
          {index}.
        </Typography>
      )}
      <Typography
        component="span"
        sx={{
          fontFamily: t.fontMono,
          fontSize: t.size['2xs'],
          fontWeight: t.weight.bold,
          letterSpacing: t.tracking.caps,
          color: palette.lime,
          textTransform: 'uppercase',
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

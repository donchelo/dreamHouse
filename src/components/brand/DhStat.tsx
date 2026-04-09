'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { palette, typography as t } from '@/lib/theme/tokens';

export interface DhStatProps {
  value: string;
  label: string;
  /** If true, value is rendered in lime */
  accent?: boolean;
}

/**
 * DhStat — metric display molecule.
 *
 * Large value + small label separated by architectural divider.
 */
export function DhStat({ value, label, accent = true }: DhStatProps) {
  return (
    <Box sx={{ pt: 3, borderTop: `1px solid ${palette.stone800}` }}>
      <Typography
        sx={{
          fontFamily: t.fontSans,
          fontSize: t.size['4xl'],
          fontWeight: t.weight.black,
          letterSpacing: t.tracking.tightest,
          color: accent ? palette.lime : 'text.primary',
          textTransform: 'uppercase',
          lineHeight: 1,
          mb: 1,
        }}
      >
        {value}
      </Typography>
      <Typography
        sx={{
          fontFamily: t.fontMono,
          fontSize: t.size['2xs'],
          fontWeight: t.weight.bold,
          letterSpacing: t.tracking.caps,
          textTransform: 'uppercase',
          color: palette.stone500,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

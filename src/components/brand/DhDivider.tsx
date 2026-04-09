'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { palette } from '@/lib/theme/tokens';

export interface DhDividerProps {
  /** Width in pixels of the lime segment. Default 48. */
  accentWidth?: number;
  /** Additional sx passthrough */
  sx?: object;
}

/**
 * DhDivider — architectural line with lime accent.
 *
 * A full-width hairline where the first N pixels glow lime.
 */
export function DhDivider({ accentWidth = 48, sx }: DhDividerProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '1px',
        backgroundColor: palette.stone800,
        ...sx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '1px',
          width: accentWidth,
          backgroundColor: palette.lime,
        }}
      />
    </Box>
  );
}

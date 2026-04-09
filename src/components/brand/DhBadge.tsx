'use client';

import React from 'react';
import Box from '@mui/material/Box';
import { palette, typography as t } from '@/lib/theme/tokens';

type BadgeVariant = 'primary' | 'stone' | 'outline' | 'ghost';

export interface DhBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  sx?: object;
}

const variantStyles: Record<BadgeVariant, object> = {
  primary: {
    backgroundColor: palette.lime,
    color: palette.ink,
    border: `1px solid ${palette.lime}`,
  },
  stone: {
    backgroundColor: palette.stone800,
    color: palette.stone300,
    border: `1px solid ${palette.stone700}`,
  },
  outline: {
    backgroundColor: 'transparent',
    color: palette.stone300,
    border: `1px solid ${palette.stone600}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: palette.stone400,
    border: '1px solid transparent',
  },
};

/**
 * DhBadge — status tag / metadata label.
 *
 * Mono-spaced uppercase — the data point as ornament.
 */
export function DhBadge({
  children,
  variant = 'stone',
  dot = false,
  sx,
}: DhBadgeProps) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.25,
        py: 0.5,
        fontFamily: t.fontMono,
        fontSize: t.size['2xs'],
        fontWeight: t.weight.bold,
        letterSpacing: t.tracking.widest,
        textTransform: 'uppercase',
        lineHeight: 1,
        ...variantStyles[variant],
        ...sx,
      }}
    >
      {dot && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: 5,
            height: 5,
            borderRadius: '50%',
            backgroundColor:
              variant === 'primary' ? palette.ink : palette.lime,
            flexShrink: 0,
          }}
        />
      )}
      {children}
    </Box>
  );
}

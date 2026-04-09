'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { palette, typography as t } from '@/lib/theme/tokens';

export interface DhLogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  /** Show vertical tagline below name */
  showTagline?: boolean;
}

const sizeMap = {
  sm: { name: t.size.lg,   tag: t.size['2xs'], gap: 0.5 },
  md: { name: t.size['2xl'], tag: t.size['2xs'], gap: 0.75 },
  lg: { name: t.size['4xl'], tag: t.size.xs,   gap: 1 },
};

/**
 * DhLogo — the DreamHouse wordmark.
 *
 * Two-line stacked: DREAMHOUSE / ARCHITECTURE
 * The lime accent dot (·) is the logo mark — a period as punctuation in space.
 */
export function DhLogo({ size = 'md', href = '/', showTagline = true }: DhLogoProps) {
  const s = sizeMap[size];

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: s.gap,
        textDecoration: 'none',
        color: 'text.primary',
        '&:hover .dh-logo-accent': { color: palette.lime },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <Typography
          component="span"
          sx={{
            fontFamily: t.fontSans,
            fontSize: s.name,
            fontWeight: t.weight.black,
            letterSpacing: t.tracking.tightest,
            textTransform: 'uppercase',
            lineHeight: 1,
            color: 'text.primary',
          }}
        >
          Dream
        </Typography>
        <Typography
          component="span"
          className="dh-logo-accent"
          sx={{
            fontFamily: t.fontSans,
            fontSize: s.name,
            fontWeight: t.weight.black,
            letterSpacing: t.tracking.tightest,
            textTransform: 'uppercase',
            lineHeight: 1,
            color: palette.lime,
            transition: 'color 0.2s ease',
          }}
        >
          House
        </Typography>
        <Typography
          component="span"
          sx={{
            fontFamily: t.fontMono,
            fontSize: s.tag,
            color: palette.lime,
            lineHeight: 1,
            mb: '2px',
          }}
        >
          ·
        </Typography>
      </Box>

      {showTagline && (
        <Typography
          component="span"
          sx={{
            fontFamily: t.fontMono,
            fontSize: s.tag,
            fontWeight: t.weight.bold,
            letterSpacing: t.tracking.caps,
            textTransform: 'uppercase',
            color: palette.stone500,
            borderTop: `1px solid ${palette.stone700}`,
            pt: 0.5,
            width: '100%',
          }}
        >
          Architecture
        </Typography>
      )}
    </Box>
  );

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      {content}
    </Link>
  );
}

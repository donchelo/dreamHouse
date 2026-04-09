'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { type SxProps, type Theme } from '@mui/material/styles';

export interface DhSectionProps {
  children: React.ReactNode;
  /** Background color override */
  bg?: string;
  /** Full-bleed bg, contained content */
  contained?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | false;
  sx?: SxProps<Theme>;
  id?: string;
}

/**
 * DhSection — page section wrapper.
 *
 * Handles consistent vertical rhythm (py: 20 = 160px),
 * optional contained layout, and background variants.
 */
export function DhSection({
  children,
  bg,
  contained = true,
  maxWidth = 'xl',
  sx,
  id,
}: DhSectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 20 },
        backgroundColor: bg,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {contained ? (
        <Container maxWidth={maxWidth} sx={{ px: { xs: 3, md: 6 } }}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Box>
  );
}

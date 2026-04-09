'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import {
  DhButton,
  DhCard,
  DhLabel,
  DhDivider,
  DhBadge,
  DhInput,
  DhStat,
  DhLogo,
  DhSection,
} from '@/components/brand';
import { palette, typography as t, brand } from '@/lib/theme/tokens';
import Header from '@/components/Header';

// ─── Color Swatch ────────────────────────────────────────────────────────────

function Swatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <Box>
      <Box
        sx={{
          height: 80,
          backgroundColor: color,
          border: '1px solid rgba(255,255,255,0.06)',
          mb: 1.5,
        }}
      />
      <Typography
        sx={{
          fontFamily: t.fontMono,
          fontSize: t.size.xs,
          fontWeight: t.weight.bold,
          color: 'text.primary',
          display: 'block',
        }}
      >
        {name}
      </Typography>
      <Typography
        sx={{
          fontFamily: t.fontMono,
          fontSize: t.size.xs,
          color: palette.stone500,
        }}
      >
        {hex}
      </Typography>
    </Box>
  );
}

// ─── Type Specimen ───────────────────────────────────────────────────────────

function TypeRow({
  label,
  children,
  sx = {},
}: {
  label: string;
  children: React.ReactNode;
  sx?: object;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 6,
        py: 3,
        borderBottom: `1px solid ${palette.stone800}`,
        '&:first-of-type': { borderTop: `1px solid ${palette.stone800}` },
      }}
    >
      <Typography
        sx={{
          fontFamily: t.fontMono,
          fontSize: t.size.xs,
          color: palette.stone500,
          minWidth: 120,
          flexShrink: 0,
        }}
      >
        {label}
      </Typography>
      <Box sx={sx}>{children}</Box>
    </Box>
  );
}

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 8 }}>
      <DhDivider sx={{ mb: 4 }} />
      <Typography
        sx={{
          fontFamily: t.fontMono,
          fontSize: t.size.xs,
          fontWeight: t.weight.bold,
          letterSpacing: t.tracking.caps,
          textTransform: 'uppercase',
          color: palette.stone500,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function BrandPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Header />

      {/* ── Cover ── */}
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          px: { xs: 3, md: 8 },
          py: { xs: 10, md: 16 },
          borderBottom: `1px solid ${palette.stone800}`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glyph */}
        <Typography
          aria-hidden
          sx={{
            position: 'absolute',
            top: '50%',
            right: '-5vw',
            transform: 'translateY(-50%)',
            fontFamily: t.fontSans,
            fontSize: 'clamp(160px, 25vw, 420px)',
            fontWeight: t.weight.black,
            letterSpacing: t.tracking.tightest,
            textTransform: 'uppercase',
            color: palette.stone900,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          DH
        </Typography>

        <Container maxWidth="xl" disableGutters>
          <DhBadge variant="outline" dot sx={{ mb: 5 }}>
            Brand System — {new Date().getFullYear()}
          </DhBadge>

          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: 'clamp(56px, 12vw, 200px)' },
              color: 'text.primary',
              mb: 6,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Dream
            <Box component="span" sx={{ color: palette.lime }}>
              House
            </Box>
            <Box
              component="span"
              sx={{ color: palette.lime, fontFamily: t.fontMono, fontSize: '0.2em', verticalAlign: 'top', ml: 1 }}
            >
              ·
            </Box>
          </Typography>

          <Grid container spacing={8} sx={{ alignItems: 'flex-end' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body1"
                sx={{ color: palette.stone400, maxWidth: 480, lineHeight: t.leading.relaxed }}
              >
                {brand.tagline}. Sistema visual construido sobre rigor arquitectónico, espacio como silencio y un único acento de color — todo lo que sobra, no está.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                <DhBadge variant="primary">Minimal</DhBadge>
                <DhBadge variant="stone">Architectural</DhBadge>
                <DhBadge variant="stone">Zen</DhBadge>
                <DhBadge variant="stone">Futurista</DhBadge>
                <DhBadge variant="outline">Colombia</DhBadge>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── Palette ── */}
      <DhSection id="palette">
        <SectionHeader>01 / Paleta de Color</SectionHeader>

        <Box sx={{ mb: 6 }}>
          <DhLabel index="A" accent>Accent único</DhLabel>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Swatch color={palette.lime} name="Lime" hex="#D4F200" />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Swatch color={palette.limeDim} name="Lime Dim" hex="#B8D400" />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mb: 6 }}>
          <DhLabel index="B" accent>Canvas</DhLabel>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Swatch color={palette.ink} name="Ink" hex="#050505" />
            </Grid>
            <Grid size={{ xs: 6, sm: 3, md: 2 }}>
              <Swatch color={palette.chalk} name="Chalk" hex="#F7F6F4" />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <DhLabel index="C" accent>Hormigón — Neutrales</DhLabel>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            {(
              [
                ['50',  palette.stone50,  '#FAFAF9'],
                ['100', palette.stone100, '#F5F4F1'],
                ['200', palette.stone200, '#E8E6E1'],
                ['300', palette.stone300, '#D1CEC7'],
                ['400', palette.stone400, '#A89F94'],
                ['500', palette.stone500, '#7A7168'],
                ['600', palette.stone600, '#5C544C'],
                ['700', palette.stone700, '#3E3830'],
                ['800', palette.stone800, '#28221C'],
                ['900', palette.stone900, '#1A1510'],
              ] as [string, string, string][]
            ).map(([n, c, h]) => (
              <Grid key={n} size={{ xs: 6, sm: 3, md: 2, lg: 1 }}>
                <Swatch color={c} name={`Stone ${n}`} hex={h} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DhSection>

      <DhDivider />

      {/* ── Typography ── */}
      <DhSection id="typography">
        <SectionHeader>02 / Tipografía</SectionHeader>

        <Grid container spacing={8} sx={{ mb: 8 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <DhLabel accent>Display — Instrument Sans</DhLabel>
            <Typography
              sx={{
                fontFamily: t.fontSans,
                fontSize: t.size['5xl'],
                fontWeight: t.weight.black,
                letterSpacing: t.tracking.tightest,
                textTransform: 'uppercase',
                lineHeight: 0.85,
                mt: 4,
              }}
            >
              Archi
              <Box component="span" sx={{ color: palette.lime }}>
                tect
              </Box>
              ure
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <DhLabel accent>Mono — JetBrains Mono</DhLabel>
            <Typography
              sx={{
                fontFamily: t.fontMono,
                fontSize: t.size.sm,
                letterSpacing: t.tracking.wider,
                color: palette.stone400,
                mt: 4,
                lineHeight: t.leading.relaxed,
              }}
            >
              {'// Sistema de identidad visual\n// Bogotá · Colombia · 2025\n// version: 1.0.0-alpha'}
            </Typography>
          </Grid>
        </Grid>

        <Box>
          <TypeRow label="H1 / 120px" sx={{ typography: 'h1', fontSize: '4rem !important' }}>
            DreamHouse
          </TypeRow>
          <TypeRow label="H2 / 80px" sx={{ typography: 'h2', fontSize: '3rem !important' }}>
            Architecture
          </TypeRow>
          <TypeRow label="H3 / 56px" sx={{ typography: 'h3', fontSize: '2.5rem !important' }}>
            Vision Studio
          </TypeRow>
          <TypeRow label="H4 / 40px" sx={{ typography: 'h4' }}>
            Exterior Design
          </TypeRow>
          <TypeRow label="H5 / 32px" sx={{ typography: 'h5' }}>
            AI Generation System
          </TypeRow>
          <TypeRow label="Subtitle 1" sx={{ typography: 'subtitle1' }}>
            Architectural Excellence
          </TypeRow>
          <TypeRow label="Subtitle 2 (mono)" sx={{ typography: 'subtitle2' }}>
            System Label — 01
          </TypeRow>
          <TypeRow label="Body 1" sx={{ typography: 'body1', maxWidth: 560 }}>
            Democratizando la visualización arquitectónica. Genera exteriores fotorrealistas de alta calidad a partir de conceptos básicos en segundos.
          </TypeRow>
          <TypeRow label="Caption (mono)" sx={{ typography: 'caption' }}>
            Engine: Nano Banana Pro v1.1 · Status: Active
          </TypeRow>
        </Box>
      </DhSection>

      <DhDivider />

      {/* ── Components ── */}
      <DhSection id="components">
        <SectionHeader>03 / Componentes</SectionHeader>

        {/* Buttons */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Buttons</DhLabel>
          <Stack direction="row" sx={{ mt: 4, flexWrap: 'wrap', gap: 2 }}>
            <DhButton variant="contained" color="primary" size="large">
              Iniciar Proyecto
            </DhButton>
            <DhButton variant="contained" color="primary">
              Contained
            </DhButton>
            <DhButton variant="contained" color="secondary">
              Secondary
            </DhButton>
            <DhButton variant="outlined">
              Outlined
            </DhButton>
            <DhButton variant="outlined" color="primary">
              Outlined Primary
            </DhButton>
            <DhButton variant="text">
              Text Action
            </DhButton>
            <DhButton variant="contained" color="primary" size="small">
              Small
            </DhButton>
            <DhButton variant="contained" color="primary" loading>
              Loading
            </DhButton>
            <DhButton variant="contained" color="primary" disabled>
              Disabled
            </DhButton>
          </Stack>
        </Box>

        {/* Badges */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Badges</DhLabel>
          <Stack direction="row" sx={{ mt: 4, flexWrap: 'wrap', gap: 2 }}>
            <DhBadge variant="primary">Primary</DhBadge>
            <DhBadge variant="primary" dot>Active</DhBadge>
            <DhBadge variant="stone">Stone</DhBadge>
            <DhBadge variant="outline">Outline</DhBadge>
            <DhBadge variant="ghost">Ghost</DhBadge>
            <DhBadge variant="stone" dot>System Online</DhBadge>
          </Stack>
        </Box>

        {/* Cards */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Cards</DhLabel>
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <DhCard>
                <DhLabel index="01">Referencias</DhLabel>
                <Typography variant="body2" sx={{ color: palette.stone400, mt: 2 }}>
                  Sube hasta 5 imágenes que capturen tu estilo, materiales o ambiente deseado.
                </Typography>
              </DhCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <DhCard accent>
                <DhLabel index="02">Parámetros</DhLabel>
                <Typography variant="body2" sx={{ color: palette.stone400, mt: 2 }}>
                  Configura clima, ciudad, arquitectos y materiales con control granular.
                </Typography>
              </DhCard>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <DhCard interactive>
                <DhLabel index="03">Generación</DhLabel>
                <Typography variant="body2" sx={{ color: palette.stone400, mt: 2 }}>
                  Nuestra IA crea un exterior fotorrealista 4K en segundos.
                </Typography>
              </DhCard>
            </Grid>
          </Grid>
        </Box>

        {/* Stats */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Stats</DhLabel>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid size={{ xs: 6, md: 3 }}>
              <DhStat value="85%" label="Reducción en tiempo" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <DhStat value="100%" label="Fotorrealismo garantizado" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <DhStat value="4K" label="Resolución de salida" />
            </Grid>
            <Grid size={{ xs: 6, md: 3 }}>
              <DhStat value="<30s" label="Tiempo de generación" />
            </Grid>
          </Grid>
        </Box>

        {/* Inputs */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Inputs</DhLabel>
          <Grid container spacing={3} sx={{ mt: 4, maxWidth: 720 }}>
            <Grid size={{ xs: 12 }}>
              <DhInput label="Prompt Arquitectónico" placeholder="Describe el exterior de tu proyecto..." />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DhInput label="Ciudad" placeholder="Bogotá, Colombia" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <DhInput label="Estilo" placeholder="Brutalismo, Minimalismo..." />
            </Grid>
          </Grid>
        </Box>

        {/* Dividers */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Dividers</DhLabel>
          <Stack spacing={4} sx={{ mt: 4, maxWidth: 480 }}>
            <DhDivider />
            <DhDivider accentWidth={96} />
            <DhDivider accentWidth={240} />
            <Divider />
          </Stack>
        </Box>

        {/* Logo */}
        <Box sx={{ mb: 12 }}>
          <DhLabel accent>Logo / Wordmark</DhLabel>
          <Stack spacing={6} sx={{ mt: 4 }}>
            <DhLogo size="lg" />
            <DhLogo size="md" />
            <DhLogo size="sm" />
            <DhLogo size="sm" showTagline={false} />
          </Stack>
        </Box>
      </DhSection>

      <DhDivider />

      {/* ── Motion ── */}
      <DhSection id="motion">
        <SectionHeader>04 / Espacio & Silencio</SectionHeader>
        <Grid container spacing={8}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h4"
              sx={{ mb: 4, color: 'text.primary' }}
            >
              El espacio en blanco<br />
              <Box component="span" sx={{ color: palette.lime }}>
                no está vacío.
              </Box>
            </Typography>
            <Typography variant="body1" sx={{ color: palette.stone400 }}>
              En arquitectura zen, el espacio negativo tiene tanto peso como la forma. Este sistema visual aplica ese principio: cada elemento respira, cada tipografía tiene silencio a su alrededor. La paleta de un color es disciplina, no limitación.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              {[
                { label: 'Fast',   val: '150ms', note: 'micro-interactions' },
                { label: 'Normal', val: '250ms', note: 'transitions' },
                { label: 'Slow',   val: '400ms', note: 'reveals' },
                { label: 'Reveal', val: '1200ms', note: 'hero animations' },
              ].map(({ label, val, note }) => (
                <Box
                  key={label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    py: 2,
                    borderBottom: `1px solid ${palette.stone800}`,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: t.fontMono,
                      fontSize: t.size.xs,
                      color: palette.lime,
                      minWidth: 60,
                    }}
                  >
                    {val}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: t.fontMono,
                      fontSize: t.size.xs,
                      fontWeight: t.weight.bold,
                      color: 'text.primary',
                      minWidth: 80,
                      letterSpacing: t.tracking.wide,
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: t.fontMono,
                      fontSize: t.size.xs,
                      color: palette.stone500,
                    }}
                  >
                    {note}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </DhSection>

      {/* ── Footer ── */}
      <Box
        component="footer"
        sx={{
          borderTop: `1px solid ${palette.stone800}`,
          py: 8,
          px: { xs: 3, md: 8 },
        }}
      >
        <Container maxWidth="xl" disableGutters>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'flex-end' },
              gap: 4,
            }}
          >
            <DhLogo size="sm" />
            <Stack spacing={1} sx={{ textAlign: { md: 'right' } }}>
              <Typography
                sx={{
                  fontFamily: t.fontMono,
                  fontSize: t.size.xs,
                  color: palette.lime,
                  letterSpacing: t.tracking.wider,
                  textTransform: 'uppercase',
                }}
              >
                {brand.origin}
              </Typography>
              <Typography
                sx={{
                  fontFamily: t.fontMono,
                  fontSize: t.size.xs,
                  color: palette.stone600,
                }}
              >
                Brand System v1.0 · © {brand.year} {brand.name}
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

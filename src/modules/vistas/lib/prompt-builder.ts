import { DreamHouseParams } from '@/types';
import { VISTA_DESCRIPTIONS } from '../constants';

/**
 * Builds a narrative prompt for architectural vistas based on a base image.
 * The prompt emphasizes maintaining the core design elements of the reference house
 * while changing the perspective or focus.
 */
export function buildVistasPrompt(params: DreamHouseParams, viewType: string): string {
  const vistaDescription = VISTA_DESCRIPTIONS[viewType] || "A professional architectural view.";
  
  const styles = params.architecturalStyles.length > 0 
    ? `maintaining the ${params.architecturalStyles.join(' and ')} style` 
    : "maintaining its original architectural style";

  const architectCredit = params.architect.length > 0 
    ? `as seen through the lens of ${params.architect.join(' and ')}` 
    : "";

  const basicPrompt = `
ARCHITECTURAL PORTFOLIO GENERATION:
Task: Generate a new ${viewType} of the house provided in the reference image.

VISUAL REQUIREMENTS:
- View Type: ${vistaDescription}
- Style Consistency: The building must be IDENTICAL in form, materials, and character to the one in the reference image. It is the same house, just a different camera position.
- Context: ${params.environment ? `The house is located in a ${params.environment} setting.` : "Maintain the same environmental context as the reference."}
- Lighting: ${params.lighting || "Match the lighting style of the reference image."}
- Atmosphere: ${params.mood || "Professional, clean, and high-end."}

NARRATIVE:
An award-quality architectural photograph ${architectCredit}, capturing the ${viewType} of the building ${styles}. 
The camera is positioned to highlight ${vistaDescription}. 
All materiality, from the ${params.materials.join(', ') || 'original textures'} to the window treatments and roof geometry, must be preserved with absolute fidelity.
`.trim();

  return basicPrompt;
}

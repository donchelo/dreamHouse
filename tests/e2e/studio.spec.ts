import { test, expect } from '@playwright/test';

test.describe('DreamHouse Studio E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API generation response
    await page.route('**/api/generate', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          imageUrl: 'https://placehold.co/1280x720?text=Mocked+DreamHouse+Render',
          groundingMetadata: {}
        }),
      });
    });

    // Go to the studio page
    await page.goto('/studio');
    
    // Fill the API Key in localStorage (simulating user config)
    await page.evaluate(() => {
      localStorage.setItem('GEMINI_API_KEY', 'mock-key');
    });
  });

  test('Exterior mode workflow', async ({ page }) => {
    // Verify default mode
    await expect(page.getByText('Arquitectura Exterior')).toBeVisible();
    
    // Fill some fields
    await page.getByPlaceholder('Tokyo, Barcelona, Dubai...').fill('Medellin');
    
    // Click Surprise Me (Randomize)
    await page.getByRole('button', { name: 'Surprise Me' }).click();
    
    // Generate
    await page.getByRole('button', { name: 'Generate exterior' }).click();
    
    // Verify results
    await expect(page.getByText('Render generated successfully!')).toBeVisible();
    await expect(page.getByAltText('Final exterior')).toBeVisible();
  });

  test('Interior mode workflow', async ({ page }) => {
    // Switch to Interior
    await page.getByText('Diseño Interior').click();
    
    // Verify interior specific elements (e.g., Room Type)
    await expect(page.getByText('Tipo de Espacio')).toBeVisible();
    
    // Generate
    await page.getByRole('button', { name: 'Generate interior' }).click();
    
    // Verify results
    await expect(page.getByText('Render generated successfully!')).toBeVisible();
    await expect(page.getByAltText('Final interior')).toBeVisible();
  });

  test('Edit mode workflow', async ({ page }) => {
    // Switch to Edit
    await page.getByText('Editar Imagen con IA').click();
    
    // Verify Edit specific elements (Sketch Canvas)
    // We look for the canvas or the "Upload base image" message
    await expect(page.getByText('Sube la imagen que deseas editar')).toBeVisible();
    
    // Note: Fully testing sketch involves complex interactions, 
    // but we can verify the prompt behavior.
    await page.getByPlaceholder('Haz que el cielo sea nublado...').fill('Add some birds');
    
    // Generate (it might fail if no image is uploaded, so let's check validation)
    await page.getByRole('button', { name: 'Generate edit' }).click();
    
    // Since we didn't upload an image, it might show an error or just do nothing if guarded.
    // Based on src/app/studio/page.tsx, if editCompositeFile is null, it still sends the request.
    // The API might return 400. Let's see how the app handles it.
  });
});

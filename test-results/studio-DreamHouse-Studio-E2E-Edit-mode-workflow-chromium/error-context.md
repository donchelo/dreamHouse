# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: studio.spec.ts >> DreamHouse Studio E2E >> Edit mode workflow
- Location: tests/e2e/studio.spec.ts:59:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Sube la imagen que deseas editar')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Sube la imagen que deseas editar')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "DreamHouse Architecture" [ref=e5] [cursor=pointer]:
          - /url: /
          - generic [ref=e6]:
            - heading "DreamHouse" [level=1] [ref=e7]
            - generic [ref=e8]: Architecture
        - navigation [ref=e9]:
          - list [ref=e10]:
            - listitem [ref=e11]:
              - link "Vision" [ref=e12] [cursor=pointer]:
                - /url: /#vision
            - listitem [ref=e13]:
              - link "Process" [ref=e14] [cursor=pointer]:
                - /url: /#process
            - listitem [ref=e15]:
              - link "Studio" [ref=e16] [cursor=pointer]:
                - /url: /studio
          - generic [ref=e18]:
            - generic [ref=e19]:
              - img [ref=e20]
              - generic [ref=e23]: API Active
            - generic [ref=e24]:
              - img
              - textbox "Gemini API Key..." [ref=e25]: mock-key
              - button "Show" [ref=e26]
          - button "Toggle theme" [ref=e27]:
            - img [ref=e28]
          - link "Start Project" [ref=e34] [cursor=pointer]:
            - /url: /studio
            - button "Start Project" [ref=e35]
    - main [ref=e36]:
      - generic [ref=e37]:
        - generic [ref=e38]:
          - heading "El Estudio" [level=2] [ref=e39]
          - heading "Diseña tu Propia Obra Maestra." [level=3] [ref=e40]
        - generic [ref=e41]:
          - button "Restablecer todos los parámetros a sus valores predeterminados" [ref=e42]:
            - img [ref=e43]
            - generic [ref=e46]: Reset
          - button "Generar una combinación aleatoria de parámetros para inspiración" [ref=e48]:
            - img [ref=e49]
            - generic [ref=e52]: Surprise Me
        - generic [ref=e53]:
          - button "01 MODO Módulo de Trabajo" [ref=e54]:
            - generic [ref=e55]:
              - generic [ref=e56]: "01"
              - generic [ref=e58]:
                - generic [ref=e59]: MODO
                - heading "Módulo de Trabajo" [level=3] [ref=e60]:
                  - img [ref=e62]
                  - text: Módulo de Trabajo
            - img [ref=e65]
          - generic [ref=e69]:
            - button "Arquitectura Exterior" [ref=e70]:
              - img [ref=e71]
              - generic [ref=e74]: Arquitectura Exterior
            - button "Diseño Interior" [ref=e75]:
              - img [ref=e76]
              - generic [ref=e79]: Diseño Interior
            - button "Editar Imagen con IA" [active] [ref=e80]:
              - img [ref=e81]
              - generic [ref=e86]: Editar Imagen con IA
        - form "Módulo de Edición de Imagen" [ref=e87]:
          - generic [ref=e88]:
            - button "02 Modo Sketch / Edición Visual" [ref=e89]:
              - generic [ref=e90]:
                - generic [ref=e91]: "02"
                - heading "Modo Sketch / Edición Visual" [level=3] [ref=e94]:
                  - img [ref=e96]
                  - text: Modo Sketch / Edición Visual
              - img [ref=e99]
            - generic [ref=e100]:
              - paragraph [ref=e102]: Dibuja sobre la imagen base para indicar las zonas que deseas modificar y escribe tu instrucción de edición.
              - generic [ref=e103]:
                - generic [ref=e104]:
                  - generic [ref=e105]: Instrucción Principal (Prompt de Edición)
                  - 'textbox "Ej: Make the tree smaller, add a modern pool, change the wall color to white..." [ref=e106]'
                - region "Sube la imagen a editar Opcional" [ref=e107]:
                  - generic [ref=e108]:
                    - img [ref=e111]
                    - generic [ref=e113]:
                      - heading "Sube la imagen a editar Opcional" [level=3] [ref=e114]:
                        - text: Sube la imagen a editar
                        - generic [ref=e115]: Opcional
                      - paragraph [ref=e116]: Sube la base sobre la que harás los trazos.
                  - generic [ref=e118] [cursor=pointer]:
                    - button "Subir foto del lote" [ref=e119]
                    - img [ref=e121]
                    - paragraph [ref=e124]: Haz clic para subir o arrastra la foto aquí
                    - paragraph [ref=e125]: Sin límite de tamaño
          - generic [ref=e126]:
            - button "03 Configuración de Salida" [ref=e127]:
              - generic [ref=e128]:
                - generic [ref=e129]: "03"
                - heading "Configuración de Salida" [level=3] [ref=e132]:
                  - img [ref=e134]
                  - text: Configuración de Salida
              - img [ref=e139]
            - generic [ref=e141]:
              - generic [ref=e142]:
                - generic [ref=e143]: Estilo Render
                - generic [ref=e144]:
                  - combobox [ref=e145] [cursor=pointer]:
                    - option "—" [selected]
                    - option "3D técnico / Clean render"
                    - option "Acuarela arquitectónica"
                    - option "Boceto digital / Sketch"
                    - option "Editorial / Magazine"
                    - option "Fotorrealista"
                    - option "Ilustración arquitectónica"
                    - option "Render artístico / Painterly"
                  - generic:
                    - img
              - generic [ref=e146]:
                - generic [ref=e147]: Ratio de Aspecto
                - generic [ref=e148]:
                  - combobox [ref=e149] [cursor=pointer]:
                    - option "—"
                    - option "16:9" [selected]
                    - option "1:1"
                    - option "1:4"
                    - option "1:8"
                    - option "3:4"
                    - option "4:1"
                    - option "4:3"
                    - option "8:1"
                    - option "9:16"
                  - generic:
                    - img
              - generic [ref=e150]:
                - generic [ref=e151]: Resolución
                - generic [ref=e152]:
                  - combobox [ref=e153] [cursor=pointer]:
                    - option "—" [selected]
                    - option "1K"
                    - option "2K"
                    - option "4K"
                    - option "512"
                  - generic:
                    - img
        - button "Generate edit render" [ref=e155]:
          - text: Generate edit
          - img [ref=e156]
        - generic [ref=e163]:
          - generic [ref=e165]:
            - img [ref=e167]
            - generic [ref=e170]:
              - heading "Design Spec" [level=3] [ref=e171]
              - paragraph [ref=e172]: 6 PARAMS ACTIVE
          - generic [ref=e177]:
            - generic [ref=e178]:
              - generic [ref=e179]:
                - generic [ref=e180]: "03"
                - img [ref=e182]
                - generic [ref=e187]: Modo de Trabajo
              - generic [ref=e189]:
                - generic [ref=e190]: MODO
                - generic [ref=e191]: edit
            - generic [ref=e192]:
              - generic [ref=e193]:
                - generic [ref=e194]: "11"
                - img [ref=e196]
                - generic [ref=e199]: Parámetros Fotográficos
              - generic [ref=e200]:
                - generic [ref=e201]:
                  - generic [ref=e202]: CÁMARA
                  - generic [ref=e203]: Fujifilm X100 VI
                - generic [ref=e204]:
                  - generic [ref=e205]: FOCAL
                  - generic [ref=e206]: 35mm (documental natural)
                - generic [ref=e207]:
                  - generic [ref=e208]: APERTURA
                  - generic [ref=e209]: f/5.6 (punto dulce arquitectónico)
                - generic [ref=e210]:
                  - generic [ref=e211]: PELÍCULA
                  - generic [ref=e212]: Classic Chrome
            - generic [ref=e213]:
              - generic [ref=e214]:
                - generic [ref=e215]: "12"
                - img [ref=e217]
                - generic [ref=e220]: Configuración de Salida
              - generic [ref=e222]:
                - generic [ref=e223]: RATIO
                - generic [ref=e224]: 16:9
    - contentinfo [ref=e226]:
      - generic [ref=e227]:
        - generic [ref=e228]:
          - heading "DreamHouse AI" [level=2] [ref=e229]
          - generic [ref=e230]:
            - link "Terms" [ref=e231] [cursor=pointer]:
              - /url: "#"
            - link "Privacy" [ref=e232] [cursor=pointer]:
              - /url: "#"
            - link "Contact" [ref=e233] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e234]:
          - paragraph [ref=e235]: Architecture Studio
          - paragraph [ref=e236]: © 2025 DreamHouse Inc.
  - button "Open Next.js Dev Tools" [ref=e242] [cursor=pointer]:
    - img [ref=e243]
  - alert [ref=e246]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('DreamHouse Studio E2E', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     // Mock the API generation response
  6  |     await page.route('**/api/generate', async (route) => {
  7  |       await route.fulfill({
  8  |         status: 200,
  9  |         contentType: 'application/json',
  10 |         body: JSON.stringify({
  11 |           imageUrl: 'https://placehold.co/1280x720?text=Mocked+DreamHouse+Render',
  12 |           groundingMetadata: {}
  13 |         }),
  14 |       });
  15 |     });
  16 | 
  17 |     // Go to the studio page
  18 |     await page.goto('/studio');
  19 |     
  20 |     // Fill the API Key in localStorage (simulating user config)
  21 |     await page.evaluate(() => {
  22 |       localStorage.setItem('GEMINI_API_KEY', 'mock-key');
  23 |     });
  24 |   });
  25 | 
  26 |   test('Exterior mode workflow', async ({ page }) => {
  27 |     // Verify default mode
  28 |     await expect(page.getByText('Arquitectura Exterior')).toBeVisible();
  29 |     
  30 |     // Fill some fields
  31 |     await page.getByPlaceholder('Tokyo, Barcelona, Dubai...').fill('Medellin');
  32 |     
  33 |     // Click Surprise Me (Randomize)
  34 |     await page.getByRole('button', { name: 'Surprise Me' }).click();
  35 |     
  36 |     // Generate
  37 |     await page.getByRole('button', { name: 'Generate exterior' }).click();
  38 |     
  39 |     // Verify results
  40 |     await expect(page.getByText('Render generated successfully!')).toBeVisible();
  41 |     await expect(page.getByAltText('Final exterior')).toBeVisible();
  42 |   });
  43 | 
  44 |   test('Interior mode workflow', async ({ page }) => {
  45 |     // Switch to Interior
  46 |     await page.getByText('Diseño Interior').click();
  47 |     
  48 |     // Verify interior specific elements (e.g., Room Type)
  49 |     await expect(page.getByText('Tipo de Espacio')).toBeVisible();
  50 |     
  51 |     // Generate
  52 |     await page.getByRole('button', { name: 'Generate interior' }).click();
  53 |     
  54 |     // Verify results
  55 |     await expect(page.getByText('Render generated successfully!')).toBeVisible();
  56 |     await expect(page.getByAltText('Final interior')).toBeVisible();
  57 |   });
  58 | 
  59 |   test('Edit mode workflow', async ({ page }) => {
  60 |     // Switch to Edit
  61 |     await page.getByText('Editar Imagen con IA').click();
  62 |     
  63 |     // Verify Edit specific elements (Sketch Canvas)
  64 |     // We look for the canvas or the "Upload base image" message
> 65 |     await expect(page.getByText('Sube la imagen que deseas editar')).toBeVisible();
     |                                                                      ^ Error: expect(locator).toBeVisible() failed
  66 |     
  67 |     // Note: Fully testing sketch involves complex interactions, 
  68 |     // but we can verify the prompt behavior.
  69 |     await page.getByPlaceholder('Haz que el cielo sea nublado...').fill('Add some birds');
  70 |     
  71 |     // Generate (it might fail if no image is uploaded, so let's check validation)
  72 |     await page.getByRole('button', { name: 'Generate edit' }).click();
  73 |     
  74 |     // Since we didn't upload an image, it might show an error or just do nothing if guarded.
  75 |     // Based on src/app/studio/page.tsx, if editCompositeFile is null, it still sends the request.
  76 |     // The API might return 400. Let's see how the app handles it.
  77 |   });
  78 | });
  79 | 
```
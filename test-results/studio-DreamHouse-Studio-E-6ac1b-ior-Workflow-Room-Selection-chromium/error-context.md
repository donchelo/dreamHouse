# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: studio.spec.ts >> DreamHouse Studio E2E MVP >> Interior Workflow: Room Selection
- Location: tests/e2e/studio.spec.ts:79:7

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for getByText('Espacio y Propósito', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Dream House · Architecture" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]:
          - generic [ref=e7]:
            - generic [ref=e8]: Dream
            - generic [ref=e9]: House
            - generic [ref=e10]: ·
          - generic [ref=e11]: Architecture
      - navigation [ref=e12]:
        - link "Vision" [ref=e13] [cursor=pointer]:
          - /url: /#vision
          - paragraph [ref=e14]: Vision
        - link "Process" [ref=e15] [cursor=pointer]:
          - /url: /#process
          - paragraph [ref=e16]: Process
        - link "Studio" [ref=e17] [cursor=pointer]:
          - /url: /studio
          - paragraph [ref=e18]: Studio
        - link "Brand" [ref=e19] [cursor=pointer]:
          - /url: /brand
          - paragraph [ref=e20]: Brand
      - generic [ref=e21]:
        - generic [ref=e22]:
          - img [ref=e23]
          - paragraph [ref=e25]: API Required
          - generic [ref=e26]:
            - img [ref=e28]
            - textbox "Gemini key..." [ref=e30]
            - group
          - button "Show" [ref=e31] [cursor=pointer]
        - button "Toggle theme" [ref=e32] [cursor=pointer]:
          - img [ref=e33]
        - link "Start Project" [ref=e35] [cursor=pointer]:
          - /url: /studio
          - button "Start Project" [ref=e36]
  - main [ref=e37]:
    - generic [ref=e38]:
      - generic [ref=e39]:
        - heading "El Estudio" [level=2] [ref=e40]
        - heading "Diseña tu Propia Obra Maestra." [level=3] [ref=e41]
      - generic [ref=e42]:
        - button "Restablecer todos los parámetros a sus valores predeterminados" [ref=e43]:
          - img [ref=e44]
          - generic [ref=e47]: Reset
        - button "Generar una combinación aleatoria de parámetros para inspiración" [ref=e49]:
          - img [ref=e50]
          - generic [ref=e53]: Surprise Me
      - generic [ref=e54]:
        - button "01 MODO Módulo de Trabajo" [ref=e55]:
          - generic [ref=e56]:
            - generic [ref=e57]: "01"
            - generic [ref=e59]:
              - generic [ref=e60]: MODO
              - heading "Módulo de Trabajo" [level=3] [ref=e61]:
                - img [ref=e63]
                - text: Módulo de Trabajo
          - img [ref=e66]
        - generic [ref=e70]:
          - button "Arquitectura Exterior" [ref=e71]:
            - img [ref=e72]
            - generic [ref=e75]: Arquitectura Exterior
          - button "Diseño Interior" [active] [ref=e76]:
            - img [ref=e77]
            - generic [ref=e80]: Diseño Interior
          - button "Editar Imagen con IA" [ref=e81]:
            - img [ref=e82]
            - generic [ref=e87]: Editar Imagen con IA
          - button "Portafolio de Vistas" [ref=e88]:
            - img [ref=e89]
            - generic [ref=e93]: Portafolio de Vistas
      - generic [ref=e94]:
        - button "02 INSPIRACIÓN Referencias Visuales" [ref=e95]:
          - generic [ref=e96]:
            - generic [ref=e97]: "02"
            - generic [ref=e99]:
              - generic [ref=e100]: INSPIRACIÓN
              - heading "Referencias Visuales" [level=3] [ref=e101]:
                - img [ref=e103]
                - text: Referencias Visuales
          - img [ref=e109]
        - region "Referentes Visuales" [ref=e111]:
          - generic [ref=e112]:
            - generic [ref=e113]:
              - img [ref=e116]
              - generic [ref=e121]:
                - heading "Referentes Visuales" [level=3] [ref=e122]
                - paragraph [ref=e123]: Sube imágenes de casas o estilos que te inspiren. La IA las usará como referencia visual para tu diseño.
            - generic [ref=e124]: 0/5
          - generic [ref=e126] [cursor=pointer]:
            - button "Subir imágenes de referencia (máximo 5 archivos)" [ref=e127]
            - img [ref=e131]
            - generic [ref=e134]: Añadir imagen
            - generic [ref=e135]: Optimización automática aplicada
          - note [ref=e136]:
            - img [ref=e138]
            - paragraph [ref=e141]: "Pro tip: Sube fotos de casas, fachadas o interiores que te inspiren. La IA analizará colores, formas y estilos para crear algo similar."
      - generic [ref=e142]:
        - button "03 BASE Foto del Lote / Terreno" [ref=e143]:
          - generic [ref=e144]:
            - generic [ref=e145]: "03"
            - generic [ref=e147]:
              - generic [ref=e148]: BASE
              - heading "Foto del Lote / Terreno" [level=3] [ref=e149]:
                - img [ref=e151]
                - text: Foto del Lote / Terreno
          - img [ref=e155]
        - generic [ref=e157]:
          - region "Lote / Emplazamiento Opcional" [ref=e158]:
            - generic [ref=e159]:
              - img [ref=e162]
              - generic [ref=e164]:
                - heading "Lote / Emplazamiento Opcional" [level=3] [ref=e165]:
                  - text: Lote / Emplazamiento
                  - generic [ref=e166]: Opcional
                - paragraph [ref=e167]: Sube una foto real del terreno. La IA integrará el volumen en el sitio.
            - generic [ref=e169] [cursor=pointer]:
              - button "Subir foto del lote" [ref=e170]
              - img [ref=e172]
              - paragraph [ref=e175]: Haz clic para subir o arrastra la foto aquí
              - paragraph [ref=e176]: Cualquier tamaño · Optimización automática
          - region "Lote / Emplazamiento Opcional" [ref=e177]:
            - generic [ref=e178]:
              - img [ref=e181]
              - generic [ref=e184]:
                - heading "Casa Actual (Estructura Base) Opcional" [level=3] [ref=e185]:
                  - text: Casa Actual (Estructura Base)
                  - generic [ref=e186]: Opcional
                - paragraph [ref=e187]: Sube una foto de la casa existente. La IA mantendrá la volumetría y cambiará el estilo según el prompt.
            - generic [ref=e189] [cursor=pointer]:
              - button "Subir foto del lote" [ref=e190]
              - img [ref=e192]
              - paragraph [ref=e195]: Haz clic para subir o arrastra la foto aquí
              - paragraph [ref=e196]: Cualquier tamaño · Optimización automática
      - generic [ref=e197]:
        - button "04 GUÍA Plano de Planta" [ref=e198]:
          - generic [ref=e199]:
            - generic [ref=e200]: "04"
            - generic [ref=e202]:
              - generic [ref=e203]: GUÍA
              - heading "Plano de Planta" [level=3] [ref=e204]:
                - img [ref=e206]
                - text: Plano de Planta
          - img [ref=e212]
        - region "Plano Residencial Opcional" [ref=e214]:
          - generic [ref=e215]:
            - img [ref=e218]
            - generic [ref=e220]:
              - heading "Plano Residencial Opcional" [level=3] [ref=e221]:
                - text: Plano Residencial
                - generic [ref=e222]: Opcional
              - paragraph [ref=e223]: Sube el plano de planta. El exterior respetará la geometría del plano.
          - generic [ref=e225] [cursor=pointer]:
            - button "Subir plano de planta" [ref=e226]
            - img [ref=e228]
            - paragraph [ref=e231]: Haz clic para subir o arrastra el plano aquí
            - paragraph [ref=e232]: Cualquier tamaño · Optimización automática
      - form "Módulo de Arquitectura Exterior" [ref=e233]:
        - generic [ref=e234]:
          - button "05 Identidad del Proyecto" [ref=e235]:
            - generic [ref=e236]:
              - generic [ref=e237]: "05"
              - heading "Identidad del Proyecto" [level=3] [ref=e240]:
                - img [ref=e242]
                - text: Identidad del Proyecto
            - img [ref=e246]
          - generic [ref=e247]:
            - paragraph [ref=e249]: Define la esencia y el carácter arquitectónico del edificio exterior.
            - generic [ref=e250]:
              - generic [ref=e251]:
                - generic [ref=e252]:
                  - generic [ref=e253]: Tipo de Proyecto
                  - generic [ref=e254]:
                    - combobox [ref=e255] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Apartamento/Penthouse"
                      - option "Biblioteca"
                      - option "Casa unifamiliar"
                      - option "Centro cultural"
                      - option "Clínica/Hospital"
                      - option "Edificio educativo"
                      - option "Edificio residencial"
                      - option "Hotel boutique"
                      - option "Hotel resort"
                      - option "Mixed-use"
                      - option "Museo/Galería"
                      - option "Oficinas corporativas"
                      - option "Restaurante/Bar"
                      - option "Retail/Tienda"
                      - option "Sauna"
                      - option "Spa/Wellness"
                      - option "Teatro/Auditorio"
                      - option "Villa de lujo"
                    - generic:
                      - img
                - generic [ref=e256]:
                  - generic [ref=e257]: Atmósfera / Mood
                  - generic [ref=e258]:
                    - combobox [ref=e259] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Acogedor y cálido"
                      - option "Dramático e impactante"
                      - option "Elegante y sofisticado"
                      - option "Futurista y vanguardista"
                      - option "Industrial y raw"
                      - option "Lujoso y opulento"
                      - option "Minimalista y puro"
                      - option "Romántico y nostálgico"
                      - option "Rústico y orgánico"
                      - option "Sereno y zen"
                    - generic:
                      - img
              - generic [ref=e260]:
                - group [ref=e261]:
                  - generic [ref=e262]:
                    - generic [ref=e263]: Estilos Arquitectónicos
                    - paragraph [ref=e264]: Combina estéticas para una propuesta única.
                  - generic [ref=e265]:
                    - button "Africano vernáculo" [ref=e266]:
                      - generic [ref=e268]: Africano vernáculo
                    - button "Alpino/Chalet" [ref=e269]:
                      - generic [ref=e271]: Alpino/Chalet
                    - button "Andaluz" [ref=e272]:
                      - generic [ref=e274]: Andaluz
                    - button "Antebellum" [ref=e275]:
                      - generic [ref=e277]: Antebellum
                    - button "Árabe contemporáneo" [ref=e278]:
                      - generic [ref=e280]: Árabe contemporáneo
                    - button "Art Deco" [ref=e281]:
                      - generic [ref=e283]: Art Deco
                    - button "Art Nouveau" [ref=e284]:
                      - generic [ref=e286]: Art Nouveau
                    - button "Australiano contemporáneo" [ref=e287]:
                      - generic [ref=e289]: Australiano contemporáneo
                    - button "Balinés" [ref=e290]:
                      - generic [ref=e292]: Balinés
                    - button "Barroco" [ref=e293]:
                      - generic [ref=e295]: Barroco
                    - button "Bauhaus" [ref=e296]:
                      - generic [ref=e298]: Bauhaus
                    - button "Beaux-Arts" [ref=e299]:
                      - generic [ref=e301]: Beaux-Arts
                    - button "Biofílico" [ref=e302]:
                      - generic [ref=e304]: Biofílico
                    - button "Blob Architecture" [ref=e305]:
                      - generic [ref=e307]: Blob Architecture
                    - button "Bohemio de lujo" [ref=e308]:
                      - generic [ref=e310]: Bohemio de lujo
                    - button "Brasileño moderno" [ref=e311]:
                      - generic [ref=e313]: Brasileño moderno
                    - button "Brownstone" [ref=e314]:
                      - generic [ref=e316]: Brownstone
                    - button "Brutalista" [ref=e317]:
                      - generic [ref=e319]: Brutalista
                    - button "California Modern" [ref=e320]:
                      - generic [ref=e322]: California Modern
                    - button "Cape Cod" [ref=e323]:
                      - generic [ref=e325]: Cape Cod
                    - button "Caribeño" [ref=e326]:
                      - generic [ref=e328]: Caribeño
                    - button "Coastal Modern" [ref=e329]:
                      - generic [ref=e331]: Coastal Modern
                    - button "Colonial" [ref=e332]:
                      - generic [ref=e334]: Colonial
                    - button "Container" [ref=e335]:
                      - generic [ref=e337]: Container
                    - button "Contemporáneo" [ref=e338]:
                      - generic [ref=e340]: Contemporáneo
                    - button "Craftsman/Bungalow" [ref=e341]:
                      - generic [ref=e343]: Craftsman/Bungalow
                    - button "De Stijl" [ref=e344]:
                      - generic [ref=e346]: De Stijl
                    - button "Deconstructivista" [ref=e347]:
                      - generic [ref=e349]: Deconstructivista
                    - button "Desert Modern" [ref=e350]:
                      - generic [ref=e352]: Desert Modern
                    - button "Earthship" [ref=e353]:
                      - generic [ref=e355]: Earthship
                    - button "Escandinavo" [ref=e356]:
                      - generic [ref=e358]: Escandinavo
                    - button "Español Colonial" [ref=e359]:
                      - generic [ref=e361]: Español Colonial
                    - button "Farmhouse moderno" [ref=e362]:
                      - generic [ref=e364]: Farmhouse moderno
                    - button "Floating/Sobre agua" [ref=e365]:
                      - generic [ref=e367]: Floating/Sobre agua
                    - button "Florida/Miami Deco" [ref=e368]:
                      - generic [ref=e370]: Florida/Miami Deco
                    - button "Futurista" [ref=e371]:
                      - generic [ref=e373]: Futurista
                    - button "Georgian" [ref=e374]:
                      - generic [ref=e376]: Georgian
                    - button "Greek Revival" [ref=e377]:
                      - generic [ref=e379]: Greek Revival
                    - button "Griego isleño" [ref=e380]:
                      - generic [ref=e382]: Griego isleño
                    - button "Gótico Revival" [ref=e383]:
                      - generic [ref=e385]: Gótico Revival
                    - button "Hacienda moderna" [ref=e386]:
                      - generic [ref=e388]: Hacienda moderna
                    - button "Hanok (Coreano)" [ref=e389]:
                      - generic [ref=e391]: Hanok (Coreano)
                    - button "High-Tech" [ref=e392]:
                      - generic [ref=e394]: High-Tech
                    - button "Industrial" [ref=e395]:
                      - generic [ref=e397]: Industrial
                    - button "Japandi" [ref=e398]:
                      - generic [ref=e400]: Japandi
                    - button "Japonés tradicional" [ref=e401]:
                      - generic [ref=e403]: Japonés tradicional
                    - button "Loft" [ref=e404]:
                      - generic [ref=e406]: Loft
                    - button "Marroquí/Morisco" [ref=e407]:
                      - generic [ref=e409]: Marroquí/Morisco
                    - button "Mediterráneo" [ref=e410]:
                      - generic [ref=e412]: Mediterráneo
                    - button "Metabolista" [ref=e413]:
                      - generic [ref=e415]: Metabolista
                    - button "Mexicano contemporáneo" [ref=e416]:
                      - generic [ref=e418]: Mexicano contemporáneo
                    - button "Mid-Century Modern" [ref=e419]:
                      - generic [ref=e421]: Mid-Century Modern
                    - button "Minimalista" [ref=e422]:
                      - generic [ref=e424]: Minimalista
                    - button "Moderno" [ref=e425]:
                      - generic [ref=e427]: Moderno
                    - button "Mountain Modern" [ref=e428]:
                      - generic [ref=e430]: Mountain Modern
                    - button "Neo-brutalista" [ref=e431]:
                      - generic [ref=e433]: Neo-brutalista
                    - button "Neoclásico" [ref=e434]:
                      - generic [ref=e436]: Neoclásico
                    - button "Net-Zero/Passivhaus" [ref=e437]:
                      - generic [ref=e439]: Net-Zero/Passivhaus
                    - button "Orgánico" [ref=e440]:
                      - generic [ref=e442]: Orgánico
                    - button "Pacific Northwest" [ref=e443]:
                      - generic [ref=e445]: Pacific Northwest
                    - button "Palladiano" [ref=e446]:
                      - generic [ref=e448]: Palladiano
                    - button "Paramétrico" [ref=e449]:
                      - generic [ref=e451]: Paramétrico
                    - button "Persa" [ref=e452]:
                      - generic [ref=e454]: Persa
                    - button "Postmoderno" [ref=e455]:
                      - generic [ref=e457]: Postmoderno
                    - button "Prairie" [ref=e458]:
                      - generic [ref=e460]: Prairie
                    - button "Provenzal" [ref=e461]:
                      - generic [ref=e463]: Provenzal
                    - button "Pueblo Revival" [ref=e464]:
                      - generic [ref=e466]: Pueblo Revival
                    - button "Pueblo/Adobe" [ref=e467]:
                      - generic [ref=e469]: Pueblo/Adobe
                    - button "Ranch" [ref=e470]:
                      - generic [ref=e472]: Ranch
                    - button "Resort Modern" [ref=e473]:
                      - generic [ref=e475]: Resort Modern
                    - button "Shingle Style" [ref=e476]:
                      - generic [ref=e478]: Shingle Style
                    - button "Sustentable/Eco" [ref=e479]:
                      - generic [ref=e481]: Sustentable/Eco
                    - button "Tiny House" [ref=e482]:
                      - generic [ref=e484]: Tiny House
                    - button "Toscano" [ref=e485]:
                      - generic [ref=e487]: Toscano
                    - button "Treehouse/Árbol" [ref=e488]:
                      - generic [ref=e490]: Treehouse/Árbol
                    - button "Tropical" [ref=e491]:
                      - generic [ref=e493]: Tropical
                    - button "Tudor" [ref=e494]:
                      - generic [ref=e496]: Tudor
                    - button "Underground/Tierra" [ref=e497]:
                      - generic [ref=e499]: Underground/Tierra
                    - button "Victoriano" [ref=e500]:
                      - generic [ref=e502]: Victoriano
                    - button "Wabi-sabi" [ref=e503]:
                      - generic [ref=e505]: Wabi-sabi
                    - button "Wine Country" [ref=e506]:
                      - generic [ref=e508]: Wine Country
                - group [ref=e509]:
                  - generic [ref=e510]:
                    - generic [ref=e511]: Arquitectos Inspiradores
                    - paragraph [ref=e512]: Influencia formal y conceptual.
                  - generic [ref=e513]:
                    - button "Alberto Campo Baeza" [ref=e514]:
                      - generic [ref=e516]: Alberto Campo Baeza
                    - button "Alejandro Aravena" [ref=e517]:
                      - generic [ref=e519]: Alejandro Aravena
                    - button "Álvaro Siza" [ref=e520]:
                      - generic [ref=e522]: Álvaro Siza
                    - button "Antoni Gaudí" [ref=e523]:
                      - generic [ref=e525]: Antoni Gaudí
                    - button "Arata Isozaki" [ref=e526]:
                      - generic [ref=e528]: Arata Isozaki
                    - button "Balkrishna Doshi" [ref=e529]:
                      - generic [ref=e531]: Balkrishna Doshi
                    - button "Bjarke Ingels (BIG)" [ref=e532]:
                      - generic [ref=e534]: Bjarke Ingels (BIG)
                    - button "Carlo Scarpa" [ref=e535]:
                      - generic [ref=e537]: Carlo Scarpa
                    - button "Coop Himmelb(l)au" [ref=e538]:
                      - generic [ref=e540]: Coop Himmelb(l)au
                    - button "Daniel Libeskind" [ref=e541]:
                      - generic [ref=e543]: Daniel Libeskind
                    - button "David Adjaye" [ref=e544]:
                      - generic [ref=e546]: David Adjaye
                    - button "David Chipperfield" [ref=e547]:
                      - generic [ref=e549]: David Chipperfield
                    - button "Diller Scofidio + Renfro" [ref=e550]:
                      - generic [ref=e552]: Diller Scofidio + Renfro
                    - button "Diébédo Francis Kéré" [ref=e553]:
                      - generic [ref=e555]: Diébédo Francis Kéré
                    - button "Eduardo Souto de Moura" [ref=e556]:
                      - generic [ref=e558]: Eduardo Souto de Moura
                    - button "Frank Gehry" [ref=e559]:
                      - generic [ref=e561]: Frank Gehry
                    - button "Frank Lloyd Wright" [ref=e562]:
                      - generic [ref=e564]: Frank Lloyd Wright
                    - button "Frida Escobedo" [ref=e565]:
                      - generic [ref=e567]: Frida Escobedo
                    - button "Fumihiko Maki" [ref=e568]:
                      - generic [ref=e570]: Fumihiko Maki
                    - button "Glenn Murcutt" [ref=e571]:
                      - generic [ref=e573]: Glenn Murcutt
                    - button "Grafton Architects" [ref=e574]:
                      - generic [ref=e576]: Grafton Architects
                    - button "Heatherwick Studio" [ref=e577]:
                      - generic [ref=e579]: Heatherwick Studio
                    - button "Herzog & de Meuron" [ref=e580]:
                      - generic [ref=e582]: Herzog & de Meuron
                    - button "I.M. Pei" [ref=e583]:
                      - generic [ref=e585]: I.M. Pei
                    - button "Jean Nouvel" [ref=e586]:
                      - generic [ref=e588]: Jean Nouvel
                    - button "John Pawson" [ref=e589]:
                      - generic [ref=e591]: John Pawson
                    - button "Junya Ishigami" [ref=e592]:
                      - generic [ref=e594]: Junya Ishigami
                    - button "Kengo Kuma" [ref=e595]:
                      - generic [ref=e597]: Kengo Kuma
                    - button "Lacaton & Vassal" [ref=e598]:
                      - generic [ref=e600]: Lacaton & Vassal
                    - button "Le Corbusier" [ref=e601]:
                      - generic [ref=e603]: Le Corbusier
                    - button "Louis Kahn" [ref=e604]:
                      - generic [ref=e606]: Louis Kahn
                    - button "Ludwig Mies van der Rohe" [ref=e607]:
                      - generic [ref=e609]: Ludwig Mies van der Rohe
                    - button "MAD Architects" [ref=e610]:
                      - generic [ref=e612]: MAD Architects
                    - button "Moshe Safdie" [ref=e613]:
                      - generic [ref=e615]: Moshe Safdie
                    - button "MVRDV" [ref=e616]:
                      - generic [ref=e618]: MVRDV
                    - button "Norman Foster" [ref=e619]:
                      - generic [ref=e621]: Norman Foster
                    - button "Olson Kundig" [ref=e622]:
                      - generic [ref=e624]: Olson Kundig
                    - button "OMA" [ref=e625]:
                      - generic [ref=e627]: OMA
                    - button "Oscar Niemeyer" [ref=e628]:
                      - generic [ref=e630]: Oscar Niemeyer
                    - button "Paulo Mendes da Rocha" [ref=e631]:
                      - generic [ref=e633]: Paulo Mendes da Rocha
                    - button "Peter Eisenman" [ref=e634]:
                      - generic [ref=e636]: Peter Eisenman
                    - button "Peter Zumthor" [ref=e637]:
                      - generic [ref=e639]: Peter Zumthor
                    - button "Rafael Moneo" [ref=e640]:
                      - generic [ref=e642]: Rafael Moneo
                    - button "Rem Koolhaas" [ref=e643]:
                      - generic [ref=e645]: Rem Koolhaas
                    - button "Renzo Piano" [ref=e646]:
                      - generic [ref=e648]: Renzo Piano
                    - button "Richard Meier" [ref=e649]:
                      - generic [ref=e651]: Richard Meier
                    - button "SANAA (Sejima + Nishizawa)" [ref=e652]:
                      - generic [ref=e654]: SANAA (Sejima + Nishizawa)
                    - button "Santiago Calatrava" [ref=e655]:
                      - generic [ref=e657]: Santiago Calatrava
                    - button "Shigeru Ban" [ref=e658]:
                      - generic [ref=e660]: Shigeru Ban
                    - button "Sin arquitecto específico" [ref=e661]:
                      - generic [ref=e663]: Sin arquitecto específico
                    - button "Snøhetta" [ref=e664]:
                      - generic [ref=e666]: Snøhetta
                    - button "Sou Fujimoto" [ref=e667]:
                      - generic [ref=e669]: Sou Fujimoto
                    - button "Steven Holl" [ref=e670]:
                      - generic [ref=e672]: Steven Holl
                    - button "Studio Gang" [ref=e673]:
                      - generic [ref=e675]: Studio Gang
                    - button "Tadao Ando" [ref=e676]:
                      - generic [ref=e678]: Tadao Ando
                    - button "Tatiana Bilbao" [ref=e679]:
                      - generic [ref=e681]: Tatiana Bilbao
                    - button "Thom Mayne (Morphosis)" [ref=e682]:
                      - generic [ref=e684]: Thom Mayne (Morphosis)
                    - button "Toyo Ito" [ref=e685]:
                      - generic [ref=e687]: Toyo Ito
                    - button "UNStudio" [ref=e688]:
                      - generic [ref=e690]: UNStudio
                    - button "Wang Shu" [ref=e691]:
                      - generic [ref=e693]: Wang Shu
                    - button "WOHA" [ref=e694]:
                      - generic [ref=e696]: WOHA
                    - button "Zaha Hadid" [ref=e697]:
                      - generic [ref=e699]: Zaha Hadid
        - generic [ref=e700]:
          - button "06 Ubicación y Paisaje" [ref=e701]:
            - generic [ref=e702]:
              - generic [ref=e703]: "06"
              - heading "Ubicación y Paisaje" [level=3] [ref=e706]:
                - img [ref=e708]
                - text: Ubicación y Paisaje
            - img [ref=e712]
          - generic [ref=e713]:
            - paragraph [ref=e715]: El emplazamiento físico y las condiciones climáticas del sitio.
            - generic [ref=e716]:
              - generic [ref=e717]:
                - generic [ref=e718]: Ciudad / Región
                - 'textbox "Ej: Kyoto, Oslo, Atacama..." [ref=e719]'
              - generic [ref=e720]:
                - generic [ref=e721]:
                  - generic [ref=e722]: Entorno Natural
                  - generic [ref=e723]:
                    - combobox [ref=e724] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Bosque"
                      - option "Desierto"
                      - option "Isla"
                      - option "Lago/Río"
                      - option "Montaña"
                      - option "Playa"
                      - option "Rural"
                      - option "Suburbana"
                      - option "Urbana centro"
                      - option "Urbana residencial"
                    - generic:
                      - img
                - generic [ref=e725]:
                  - generic [ref=e726]: Clima Dominante
                  - generic [ref=e727]:
                    - combobox [ref=e728] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Árido"
                      - option "Continental"
                      - option "Desértico"
                      - option "Frío/Nórdico"
                      - option "Mediterráneo"
                      - option "Montañoso"
                      - option "Oceánico"
                      - option "Tropical"
                    - generic:
                      - img
              - generic [ref=e729]:
                - generic [ref=e730]:
                  - generic [ref=e731]: Cuerpo de Agua
                  - generic [ref=e732]:
                    - combobox [ref=e733] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Canal/waterfront urbano"
                      - option "Estanque/laguna"
                      - option "Frente al mar/océano"
                      - option "Junto a lago"
                      - option "Orilla de río"
                      - option "Sin agua cercana"
                    - generic:
                      - img
                - generic [ref=e734]:
                  - generic [ref=e735]: Condición del Tiempo
                  - generic [ref=e736]:
                    - combobox [ref=e737] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Atardecer tormentoso"
                      - option "Despejado/Soleado"
                      - option "Lluvia ligera"
                      - option "Niebla/Bruma"
                      - option "Nieve fresca"
                      - option "Nublado dramático"
                      - option "Parcialmente nublado"
                      - option "Post-lluvia (mojado)"
                    - generic:
                      - img
        - generic [ref=e738]:
          - button "07 Volumetría y Estructura" [ref=e739]:
            - generic [ref=e740]:
              - generic [ref=e741]: "07"
              - heading "Volumetría y Estructura" [level=3] [ref=e744]:
                - img [ref=e746]
                - text: Volumetría y Estructura
            - img [ref=e750]
          - generic [ref=e752]:
            - generic [ref=e753]:
              - generic [ref=e754]:
                - generic [ref=e755]: Escala / Tamaño
                - generic [ref=e756]:
                  - combobox [ref=e757] [cursor=pointer]:
                    - option "—" [selected]
                    - option "Estate (>1000m²)"
                    - option "Grande (300-500m²)"
                    - option "Mansión (500-1000m²)"
                    - option "Mediana (150-300m²)"
                    - option "Pequeña (50-150m²)"
                    - option "Tiny House (<50m²)"
                  - generic:
                    - img
              - generic [ref=e758]:
                - generic [ref=e759]: Niveles / Pisos
                - spinbutton [ref=e760]: "0"
            - generic [ref=e761]:
              - generic [ref=e762]:
                - generic [ref=e763]: Tipo de Cubierta
                - generic [ref=e764]:
                  - combobox [ref=e765] [cursor=pointer]:
                    - option "—" [selected]
                    - option "A cuatro aguas"
                    - option "A dos aguas"
                    - option "Curvo"
                    - option "Mansarda"
                    - option "Mariposa"
                    - option "Plano"
                    - option "Terraza habitable"
                    - option "Verde/Jardín"
                  - generic:
                    - img
              - generic [ref=e766]:
                - generic [ref=e767]: Esquema Espacial
                - generic [ref=e768]:
                  - combobox [ref=e769] [cursor=pointer]:
                    - option "—" [selected]
                    - option "Courtyard-centered"
                    - option "Linear/Corridor"
                    - option "Loft-style"
                    - option "Open plan"
                    - option "Pavilion-style"
                    - option "Radial/Central"
                    - option "Split-level"
                    - option "Traditional (zonificado)"
                    - option "Wing-based"
                  - generic:
                    - img
        - generic [ref=e770]:
          - button "08 Programa Exterior" [ref=e771]:
            - generic [ref=e772]:
              - generic [ref=e773]: "08"
              - heading "Programa Exterior" [level=3] [ref=e776]:
                - img [ref=e778]
                - text: Programa Exterior
            - img [ref=e784]
          - generic [ref=e787]:
            - generic [ref=e788]:
              - generic [ref=e789]: Estacionamiento
              - generic [ref=e790]:
                - combobox [ref=e791] [cursor=pointer]:
                  - option "—" [selected]
                  - option "Cochera techada abierta"
                  - option "Espacio abierto/Driveway"
                  - option "Garaje cerrado (1 auto)"
                  - option "Garaje cerrado (2+ autos)"
                  - option "Sin estacionamiento"
                - generic:
                  - img
            - group [ref=e792]:
              - generic [ref=e793]:
                - generic [ref=e794]: Áreas Sociales
                - paragraph [ref=e795]: Espacios compartidos exteriores.
              - generic [ref=e796]:
                - button "Bar/Barra" [ref=e797]:
                  - generic [ref=e799]: Bar/Barra
                - button "BBQ/Grill area" [ref=e800]:
                  - generic [ref=e802]: BBQ/Grill area
                - button "Cinema/Sala de cine" [ref=e803]:
                  - generic [ref=e805]: Cinema/Sala de cine
                - button "Game room/Sala de juegos" [ref=e806]:
                  - generic [ref=e808]: Game room/Sala de juegos
                - button "Gym/Gimnasio" [ref=e809]:
                  - generic [ref=e811]: Gym/Gimnasio
                - button "Home office/Oficina" [ref=e812]:
                  - generic [ref=e814]: Home office/Oficina
                - button "Library/Biblioteca" [ref=e815]:
                  - generic [ref=e817]: Library/Biblioteca
                - button "Outdoor kitchen/Cocina exterior" [ref=e818]:
                  - generic [ref=e820]: Outdoor kitchen/Cocina exterior
                - button "Playroom/Cuarto de juegos" [ref=e821]:
                  - generic [ref=e823]: Playroom/Cuarto de juegos
                - button "Pool/Piscina" [ref=e824]:
                  - generic [ref=e826]: Pool/Piscina
                - button "Rooftop terrace/Terraza en azotea" [ref=e827]:
                  - generic [ref=e829]: Rooftop terrace/Terraza en azotea
                - button "Spa/Sauna" [ref=e830]:
                  - generic [ref=e832]: Spa/Sauna
                - button "Studio/Taller" [ref=e833]:
                  - generic [ref=e835]: Studio/Taller
                - button "Wine cellar/Bodega" [ref=e836]:
                  - generic [ref=e838]: Wine cellar/Bodega
        - generic [ref=e839]:
          - button "09 Piel y Materialidad" [ref=e840]:
            - generic [ref=e841]:
              - generic [ref=e842]: "09"
              - heading "Piel y Materialidad" [level=3] [ref=e845]:
                - img [ref=e847]
                - text: Piel y Materialidad
            - img [ref=e852]
          - generic [ref=e854]:
            - group [ref=e855]:
              - generic [ref=e856]:
                - generic [ref=e857]: Materiales Dominantes
                - paragraph [ref=e858]: Paleta constructiva exterior.
              - generic [ref=e859]:
                - button "Acero" [ref=e860]:
                  - generic [ref=e862]: Acero
                - button "Acero corten" [ref=e863]:
                  - generic [ref=e865]: Acero corten
                - button "Adobe" [ref=e866]:
                  - generic [ref=e868]: Adobe
                - button "Bambú" [ref=e869]:
                  - generic [ref=e871]: Bambú
                - button "Cobre" [ref=e872]:
                  - generic [ref=e874]: Cobre
                - button "Concreto" [ref=e875]:
                  - generic [ref=e877]: Concreto
                - button "Concreto expuesto" [ref=e878]:
                  - generic [ref=e880]: Concreto expuesto
                - button "Estuco" [ref=e881]:
                  - generic [ref=e883]: Estuco
                - button "Ladrillo" [ref=e884]:
                  - generic [ref=e886]: Ladrillo
                - button "Ladrillo visto" [ref=e887]:
                  - generic [ref=e889]: Ladrillo visto
                - button "Madera" [ref=e890]:
                  - generic [ref=e892]: Madera
                - button "Madera oscura" [ref=e893]:
                  - generic [ref=e895]: Madera oscura
                - button "Mármol" [ref=e896]:
                  - generic [ref=e898]: Mármol
                - button "Piedra natural" [ref=e899]:
                  - generic [ref=e901]: Piedra natural
                - button "Terracota" [ref=e902]:
                  - generic [ref=e904]: Terracota
                - button "Vidrio" [ref=e905]:
                  - generic [ref=e907]: Vidrio
                - button "Zinc" [ref=e908]:
                  - generic [ref=e910]: Zinc
            - generic [ref=e911]:
              - generic [ref=e912]: Calidad de Ejecución
              - generic [ref=e913]:
                - combobox [ref=e914] [cursor=pointer]:
                  - option "—" [selected]
                  - option "Económico/Funcional"
                  - option "Estándar/Medio"
                  - option "Premium/Alto"
                  - option "Ultra lujo/Bespoke"
                - generic:
                  - img
            - group [ref=e915]:
              - generic [ref=e916]:
                - generic [ref=e917]: Detalles de Diseño
                - paragraph [ref=e918]: Gamas y ornamentación.
              - generic [ref=e919]:
                - button "Espacios abiertos" [ref=e920]:
                  - generic [ref=e922]: Espacios abiertos
                - button "Grandes ventanales" [ref=e923]:
                  - generic [ref=e925]: Grandes ventanales
                - button "Puerta monumental" [ref=e926]:
                  - generic [ref=e928]: Puerta monumental
                - button "Techos altos" [ref=e929]:
                  - generic [ref=e931]: Techos altos
        - generic [ref=e932]:
          - button "10 Paisajismo y Color" [ref=e933]:
            - generic [ref=e934]:
              - generic [ref=e935]: "10"
              - heading "Paisajismo y Color" [level=3] [ref=e938]:
                - img [ref=e940]
                - text: Paisajismo y Color
            - img [ref=e947]
          - generic [ref=e949]:
            - group [ref=e950]:
              - generic [ref=e951]:
                - generic [ref=e952]: Paleta de Color
                - paragraph [ref=e953]: Tonos cromáticos de la fachada.
              - generic [ref=e954]:
                - button "Alto contraste" [ref=e955]:
                  - generic [ref=e957]: Alto contraste
                - button "Blanco puro" [ref=e958]:
                  - generic [ref=e960]: Blanco puro
                - button "Colores cálidos" [ref=e961]:
                  - generic [ref=e963]: Colores cálidos
                - button "Colores fríos" [ref=e964]:
                  - generic [ref=e966]: Colores fríos
                - button "Grises" [ref=e967]:
                  - generic [ref=e969]: Grises
                - button "Madera natural" [ref=e970]:
                  - generic [ref=e972]: Madera natural
                - button "Monocromático" [ref=e973]:
                  - generic [ref=e975]: Monocromático
                - button "Negro/Carbón" [ref=e976]:
                  - generic [ref=e978]: Negro/Carbón
                - button "Tonos neutros" [ref=e979]:
                  - generic [ref=e981]: Tonos neutros
                - button "Tonos tierra" [ref=e982]:
                  - generic [ref=e984]: Tonos tierra
            - group [ref=e985]:
              - generic [ref=e986]:
                - generic [ref=e987]: Elementos de Sitio
                - paragraph [ref=e988]: Infraestructura exterior.
              - generic [ref=e989]:
                - button "Balcones" [ref=e990]:
                  - generic [ref=e992]: Balcones
                - button "Cancha deportiva" [ref=e993]:
                  - generic [ref=e995]: Cancha deportiva
                - button "Cerca viva" [ref=e996]:
                  - generic [ref=e998]: Cerca viva
                - button "Chimenea exterior" [ref=e999]:
                  - generic [ref=e1001]: Chimenea exterior
                - button "Cochera abierta" [ref=e1002]:
                  - generic [ref=e1004]: Cochera abierta
                - button "Cocina exterior" [ref=e1005]:
                  - generic [ref=e1007]: Cocina exterior
                - button "Deck de madera" [ref=e1008]:
                  - generic [ref=e1010]: Deck de madera
                - button "Espejo de agua" [ref=e1011]:
                  - generic [ref=e1013]: Espejo de agua
                - button "Fuente" [ref=e1014]:
                  - generic [ref=e1016]: Fuente
                - button "Garaje visible" [ref=e1017]:
                  - generic [ref=e1019]: Garaje visible
                - button "Iluminación arquitectónica" [ref=e1020]:
                  - generic [ref=e1022]: Iluminación arquitectónica
                - button "Jacuzzi" [ref=e1023]:
                  - generic [ref=e1025]: Jacuzzi
                - button "Muro perimetral" [ref=e1026]:
                  - generic [ref=e1028]: Muro perimetral
                - button "Paneles solares" [ref=e1029]:
                  - generic [ref=e1031]: Paneles solares
                - button "Piscina" [ref=e1032]:
                  - generic [ref=e1034]: Piscina
                - button "Piscina infinity" [ref=e1035]:
                  - generic [ref=e1037]: Piscina infinity
                - button "Pérgola" [ref=e1038]:
                  - generic [ref=e1040]: Pérgola
                - button "Roof garden" [ref=e1041]:
                  - generic [ref=e1043]: Roof garden
                - button "Terraza" [ref=e1044]:
                  - generic [ref=e1046]: Terraza
            - group [ref=e1047]:
              - generic [ref=e1048]:
                - generic [ref=e1049]: Especies Vegetales
                - paragraph [ref=e1050]: Entorno verde.
              - generic [ref=e1051]:
                - button "Bosque/Pinos" [ref=e1052]:
                  - generic [ref=e1054]: Bosque/Pinos
                - button "Césped amplio" [ref=e1055]:
                  - generic [ref=e1057]: Césped amplio
                - button "Flores silvestres" [ref=e1058]:
                  - generic [ref=e1060]: Flores silvestres
                - button "Huerto/Jardín comestible" [ref=e1061]:
                  - generic [ref=e1063]: Huerto/Jardín comestible
                - button "Jardín de rocas" [ref=e1064]:
                  - generic [ref=e1066]: Jardín de rocas
                - button "Jardín japonés" [ref=e1067]:
                  - generic [ref=e1069]: Jardín japonés
                - button "Mediterránea" [ref=e1070]:
                  - generic [ref=e1072]: Mediterránea
                - button "Mínima/Desértica" [ref=e1073]:
                  - generic [ref=e1075]: Mínima/Desértica
                - button "Palmeras" [ref=e1076]:
                  - generic [ref=e1078]: Palmeras
                - button "Tropical exuberante" [ref=e1079]:
                  - generic [ref=e1081]: Tropical exuberante
        - generic [ref=e1082]:
          - button "11 Dirección de Cámara" [ref=e1083]:
            - generic [ref=e1084]:
              - generic [ref=e1085]: "11"
              - heading "Dirección de Cámara" [level=3] [ref=e1088]:
                - img [ref=e1090]
                - text: Dirección de Cámara
            - img [ref=e1094]
          - generic [ref=e1096]:
            - generic [ref=e1097]:
              - generic [ref=e1098]: Preset de Cámara
              - generic [ref=e1099]:
                - combobox [ref=e1100] [cursor=pointer]:
                  - option "—"
                  - option "Canon EOS R5 II"
                  - option "Fujifilm GFX 100S II"
                  - option "Fujifilm X100 VI" [selected]
                  - option "Hasselblad X2D 100C"
                  - option "Leica M11"
                  - option "Nikon Z8"
                  - option "Phase One IQ4 150MP"
                  - option "Sony A7R V"
                - generic:
                  - img
            - generic [ref=e1101]:
              - generic [ref=e1102]:
                - generic [ref=e1103]: Lente
                - generic [ref=e1104]:
                  - combobox [ref=e1105] [cursor=pointer]:
                    - option "—" [selected]
                    - option "14mm (ultra-angular extremo)"
                    - option "17mm (gran angular arquitectónico)"
                    - option "17mm Tilt-Shift"
                    - option "21mm"
                    - option "24mm"
                    - option "24mm Tilt-Shift"
                    - option "28mm"
                    - option "35mm"
                    - option "50mm"
                    - option "85mm"
                  - generic:
                    - img
              - generic [ref=e1106]:
                - generic [ref=e1107]: Diafragma
                - generic [ref=e1108]:
                  - combobox [ref=e1109] [cursor=pointer]:
                    - option "—" [selected]
                    - option "f/11"
                    - option "f/2"
                    - option "f/2.8"
                    - option "f/4"
                    - option "f/5.6"
                    - option "f/8"
                  - generic:
                    - img
            - generic [ref=e1110]:
              - generic [ref=e1111]:
                - generic [ref=e1112]: Ángulo
                - generic [ref=e1113]:
                  - combobox [ref=e1114] [cursor=pointer]:
                    - option "—" [selected]
                    - option "3/4 frontal"
                    - option "Aéreo/Drone"
                    - option "Frontal"
                    - option "Lateral"
                    - option "Nivel de calle"
                    - option "Perspectiva dramática"
                  - generic:
                    - img
              - generic [ref=e1115]:
                - generic [ref=e1116]: Composición
                - generic [ref=e1117]:
                  - combobox [ref=e1118] [cursor=pointer]:
                    - option "—" [selected]
                    - option "Encuadre natural (árboles)"
                    - option "Líneas guía dramáticas"
                    - option "Reflejo en agua"
                    - option "Regla de tercios"
                    - option "Silueta contra cielo"
                    - option "Simétrica centrada"
                  - generic:
                    - img
        - generic [ref=e1119]:
          - button "12 Configuración de Salida" [ref=e1120]:
            - generic [ref=e1121]:
              - generic [ref=e1122]: "12"
              - heading "Configuración de Salida" [level=3] [ref=e1125]:
                - img [ref=e1127]
                - text: Configuración de Salida
            - img [ref=e1132]
          - generic [ref=e1134]:
            - generic [ref=e1135]:
              - generic [ref=e1136]: Estilo
              - generic [ref=e1137]:
                - combobox [ref=e1138] [cursor=pointer]:
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
            - generic [ref=e1139]:
              - generic [ref=e1140]: Ratio
              - generic [ref=e1141]:
                - combobox [ref=e1142] [cursor=pointer]:
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
            - generic [ref=e1143]:
              - generic [ref=e1144]: Resolución
              - generic [ref=e1145]:
                - combobox [ref=e1146] [cursor=pointer]:
                  - option "—" [selected]
                  - option "1K"
                  - option "2K"
                  - option "4K"
                  - option "512"
                - generic:
                  - img
        - generic [ref=e1147]:
          - button "13 Dirección Creativa" [ref=e1148]:
            - generic [ref=e1149]:
              - generic [ref=e1150]: "13"
              - heading "Dirección Creativa" [level=3] [ref=e1153]:
                - img [ref=e1155]
                - text: Dirección Creativa
            - img [ref=e1158]
          - textbox "Instrucciones artísticas específicas..." [ref=e1160]
      - button "Generate exterior render" [ref=e1162]:
        - text: Generate exterior
        - img [ref=e1163]
      - generic [ref=e1170]:
        - generic [ref=e1172]:
          - img [ref=e1174]
          - generic [ref=e1177]:
            - heading "Design Spec" [level=3] [ref=e1178]
            - paragraph [ref=e1179]: 6 PARAMS ACTIVE
        - generic [ref=e1184]:
          - generic [ref=e1185]:
            - generic [ref=e1186]:
              - generic [ref=e1187]: "03"
              - img [ref=e1189]
              - generic [ref=e1194]: Modo de Trabajo
            - generic [ref=e1196]:
              - generic [ref=e1197]: MODO
              - generic [ref=e1198]: exterior
          - generic [ref=e1199]:
            - generic [ref=e1200]:
              - generic [ref=e1201]: "11"
              - img [ref=e1203]
              - generic [ref=e1206]: Parámetros Fotográficos
            - generic [ref=e1207]:
              - generic [ref=e1208]:
                - generic [ref=e1209]: CÁMARA
                - generic [ref=e1210]: Fujifilm X100 VI
              - generic [ref=e1211]:
                - generic [ref=e1212]: FOCAL
                - generic [ref=e1213]: 35mm (documental natural)
              - generic [ref=e1214]:
                - generic [ref=e1215]: APERTURA
                - generic [ref=e1216]: f/5.6 (punto dulce arquitectónico)
              - generic [ref=e1217]:
                - generic [ref=e1218]: PELÍCULA
                - generic [ref=e1219]: Classic Chrome
          - generic [ref=e1220]:
            - generic [ref=e1221]:
              - generic [ref=e1222]: "12"
              - img [ref=e1224]
              - generic [ref=e1227]: Configuración de Salida
            - generic [ref=e1229]:
              - generic [ref=e1230]: RATIO
              - generic [ref=e1231]: 16:9
      - heading "Historial de Generaciones" [level=3] [ref=e1236]
  - contentinfo [ref=e1237]:
    - generic [ref=e1238]:
      - generic [ref=e1239]:
        - heading "DreamHouse AI" [level=2] [ref=e1240]
        - generic [ref=e1241]:
          - link "Terms" [ref=e1242] [cursor=pointer]:
            - /url: "#"
          - link "Privacy" [ref=e1243] [cursor=pointer]:
            - /url: "#"
          - link "Contact" [ref=e1244] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e1245]:
        - paragraph [ref=e1246]: Architecture Studio
        - paragraph [ref=e1247]: © 2025 DreamHouse Inc.
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('DreamHouse Studio E2E MVP', () => {
  4   |   test.beforeEach(async ({ page }) => {
  5   |     // Mock the API generation response
  6   |     await page.route('**/api/generate', async (route) => {
  7   |       await route.fulfill({
  8   |         status: 200,
  9   |         contentType: 'application/json',
  10  |         body: JSON.stringify({
  11  |           imageUrl: 'https://placehold.co/1280x720?text=Mocked+DreamHouse+Render',
  12  |           houseName: 'Villa Test',
  13  |           groundingMetadata: {}
  14  |         }),
  15  |       });
  16  |     });
  17  | 
  18  |     // Go to the studio page
  19  |     await page.goto('/studio');
  20  |     
  21  |     // Fill the API Key in localStorage (simulating user config)
  22  |     await page.evaluate(() => {
  23  |       localStorage.setItem('GEMINI_API_KEY', 'mock-key');
  24  |     });
  25  |   });
  26  | 
  27  |   test('Global Actions: Surprise Me and Reset', async ({ page }) => {
  28  |     // Initially city should be empty
  29  |     const cityInput = page.getByPlaceholder('Ej: Kyoto, Oslo, Atacama...');
  30  |     await expect(cityInput).toHaveValue('');
  31  | 
  32  |     // Click Surprise Me using its aria-label
  33  |     await page.getByLabel('Generar una combinación aleatoria de parámetros para inspiración').click({ force: true });
  34  |     
  35  |     // Toast should appear (Spanish)
  36  |     await expect(page.getByText('Se ha generado un diseño exterior aleatorio.')).toBeVisible();
  37  | 
  38  |     // Click Reset using its aria-label
  39  |     await page.getByLabel('Restablecer todos los parámetros a sus valores predeterminados').click({ force: true });
  40  |     
  41  |     // City should be empty again
  42  |     await expect(cityInput).toHaveValue('');
  43  |     await expect(page.getByText('Parameters reset to default')).toBeVisible();
  44  |   });
  45  | 
  46  |   test('Exterior Workflow: Advanced Selection', async ({ page }) => {
  47  |     // Ensure we are in Exterior mode
  48  |     await expect(page.getByText('Arquitectura Exterior')).toBeVisible();
  49  | 
  50  |     // Open Identity section
  51  |     await page.getByText('Identidad del Proyecto', { exact: true }).click({ force: true });
  52  |     
  53  |     // Select Architect (this is a Chip, wait for it to be visible first)
  54  |     const architectChip = page.getByText('Zaha Hadid', { exact: true });
  55  |     await architectChip.waitFor({ state: 'visible' });
  56  |     await architectChip.click({ force: true });
  57  |     
  58  |     // Select Style
  59  |     const styleChip = page.getByText('Paramétrico', { exact: true });
  60  |     await styleChip.waitFor({ state: 'visible' });
  61  |     await styleChip.click({ force: true });
  62  | 
  63  |     // Fill City
  64  |     await page.getByPlaceholder('Ej: Kyoto, Oslo, Atacama...').fill('Dubai');
  65  | 
  66  |     // Generate
  67  |     await page.getByRole('button', { name: 'Generate exterior' }).click({ force: true });
  68  | 
  69  |     // Verify Results
  70  |     await expect(page.getByText('Render generated successfully!')).toBeVisible();
  71  |     
  72  |     // Check if Prompt DNA reflects our choices
  73  |     await expect(page.locator('span:text-is("ARQUITECTO")')).toBeVisible();
  74  |     await expect(page.getByText('Zaha Hadid', { exact: true }).nth(1)).toBeVisible(); 
  75  |     await expect(page.locator('span:text-is("ESTILO")')).toBeVisible();
  76  |     await expect(page.getByText('Paramétrico', { exact: true }).nth(1)).toBeVisible();
  77  |   });
  78  | 
  79  |   test('Interior Workflow: Room Selection', async ({ page }) => {
  80  |     // Switch to Interior
  81  |     await page.getByText('Diseño Interior', { exact: true }).click({ force: true });
  82  |     
  83  |     // Open Identity section (Interior version)
> 84  |     await page.getByText('Espacio y Propósito', { exact: true }).click({ force: true });
      |                                                                  ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  85  |     
  86  |     // Wait for the select to be visible inside the section
  87  |     const roomSelect = page.getByLabel('Espacio / Habitación');
  88  |     await roomSelect.waitFor({ state: 'visible' });
  89  |     await roomSelect.selectOption('Cocina');
  90  |     
  91  |     // Select Style
  92  |     const styleChip = page.getByText('Minimalista', { exact: true });
  93  |     await styleChip.waitFor({ state: 'visible' });
  94  |     await styleChip.click({ force: true });
  95  | 
  96  |     // Generate
  97  |     await page.getByRole('button', { name: 'Generate interior' }).click({ force: true });
  98  | 
  99  |     // Verify Results
  100 |     await expect(page.getByText('Render generated successfully!')).toBeVisible();
  101 |     
  102 |     // Check Prompt DNA
  103 |     await expect(page.locator('span:text-is("TIPO")')).toBeVisible();
  104 |     await expect(page.getByText('Cocina', { exact: true })).toBeVisible();
  105 |   });
  106 | 
  107 |   test('Vistas Workflow: Multi-generation', async ({ page }) => {
  108 |     // Switch to Vistas (Mode selector)
  109 |     await page.getByText('Portafolio de Vistas').first().click({ force: true });
  110 |     
  111 |     // Click the section header "Portafolio de Vistas" to expand it
  112 |     await page.getByText('Portafolio de Vistas').nth(1).click({ force: true });
  113 | 
  114 |     // Select some vistas from constants (wait for them to be visible)
  115 |     const heroShot = page.getByText('Perspectiva Principal (Hero Shot)');
  116 |     await heroShot.waitFor({ state: 'visible' });
  117 |     await heroShot.click({ force: true });
  118 |     
  119 |     const elevation = page.getByText('Fachada Frontal (Elevación)');
  120 |     await elevation.waitFor({ state: 'visible' });
  121 |     await elevation.click({ force: true });
  122 | 
  123 |     // Generate
  124 |     await page.getByRole('button', { name: 'Generate vistas' }).click({ force: true });
  125 | 
  126 |     // Multi-generation takes more time
  127 |     await expect(page.getByText('Portafolio generado con éxito')).toBeVisible({ timeout: 15000 });
  128 |     
  129 |     // Verify we have the result section
  130 |     await expect(page.getByText('Portafolio de Vistas').last()).toBeVisible();
  131 |   });
  132 | 
  133 |   test('Edit Mode: UI check', async ({ page }) => {
  134 |     // Switch to Edit
  135 |     await page.getByText('Editar Imagen con IA').click();
  136 |     
  137 |     // Verify Edit specific elements
  138 |     await expect(page.getByText('Sube la imagen a editar')).toBeVisible();
  139 |     
  140 |     // Fill edit prompt
  141 |     await page.getByPlaceholder('Ej: Make the tree smaller, add a modern pool, change the wall color to white...').fill('Change the wall to Blue');
  142 |     
  143 |     // Generate (Mock will handle it)
  144 |     await page.getByRole('button', { name: 'Generate edit' }).click();
  145 |     
  146 |     await expect(page.getByText('Render generated successfully!')).toBeVisible();
  147 |   });
  148 | });
  149 | 
  150 | 
```
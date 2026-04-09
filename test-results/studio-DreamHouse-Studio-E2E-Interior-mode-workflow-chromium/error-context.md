# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: studio.spec.ts >> DreamHouse Studio E2E >> Interior mode workflow
- Location: tests/e2e/studio.spec.ts:44:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Tipo de Espacio')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Tipo de Espacio')

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
            - button "Diseño Interior" [active] [ref=e75]:
              - img [ref=e76]
              - generic [ref=e79]: Diseño Interior
            - button "Editar Imagen con IA" [ref=e80]:
              - img [ref=e81]
              - generic [ref=e86]: Editar Imagen con IA
        - generic [ref=e87]:
          - button "02 INSPIRACIÓN Referencias Visuales" [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]: "02"
              - generic [ref=e92]:
                - generic [ref=e93]: INSPIRACIÓN
                - heading "Referencias Visuales" [level=3] [ref=e94]:
                  - img [ref=e96]
                  - text: Referencias Visuales
            - img [ref=e102]
          - region "Referentes Visuales" [ref=e104]:
            - generic [ref=e105]:
              - generic [ref=e106]:
                - img [ref=e109]
                - generic [ref=e114]:
                  - heading "Referentes Visuales" [level=3] [ref=e115]
                  - paragraph [ref=e116]: Sube imágenes de casas o estilos que te inspiren. La IA las usará como referencia visual para tu diseño.
              - generic [ref=e117]: 0/5
            - generic [ref=e119] [cursor=pointer]:
              - button "Subir imágenes de referencia (máximo 5 archivos)" [ref=e120]
              - img [ref=e124]
              - generic [ref=e127]: Añadir imagen
              - generic [ref=e128]: JPG, PNG, WebP · Máx. 5.00 MB
            - note [ref=e129]:
              - img [ref=e131]
              - paragraph [ref=e134]: "Pro tip: Sube fotos de casas, fachadas o interiores que te inspiren. La IA analizará colores, formas y estilos para crear algo similar."
        - generic [ref=e135]:
          - button "03 BASE Foto del Espacio Actual" [ref=e136]:
            - generic [ref=e137]:
              - generic [ref=e138]: "03"
              - generic [ref=e140]:
                - generic [ref=e141]: BASE
                - heading "Foto del Espacio Actual" [level=3] [ref=e142]:
                  - img [ref=e144]
                  - text: Foto del Espacio Actual
            - img [ref=e148]
          - region "Espacio Principal (Foto Actual) Opcional" [ref=e150]:
            - generic [ref=e151]:
              - img [ref=e154]
              - generic [ref=e157]:
                - heading "Espacio Principal (Foto Actual) Opcional" [level=3] [ref=e158]:
                  - text: Espacio Principal (Foto Actual)
                  - generic [ref=e159]: Opcional
                - paragraph [ref=e160]: Sube una foto de tu espacio actual. La IA lo usará como base para el rediseño.
            - generic [ref=e162] [cursor=pointer]:
              - button "Subir foto del lote" [ref=e163]
              - img [ref=e165]
              - paragraph [ref=e168]: Haz clic para subir o arrastra la foto aquí
              - paragraph [ref=e169]: Máx. 5.00 MB
        - generic [ref=e170]:
          - button "04 GUÍA Distribución / Layout" [ref=e171]:
            - generic [ref=e172]:
              - generic [ref=e173]: "04"
              - generic [ref=e175]:
                - generic [ref=e176]: GUÍA
                - heading "Distribución / Layout" [level=3] [ref=e177]:
                  - img [ref=e179]
                  - text: Distribución / Layout
            - img [ref=e185]
          - region "Layout del Área Opcional" [ref=e187]:
            - generic [ref=e188]:
              - img [ref=e191]
              - generic [ref=e193]:
                - heading "Layout del Área Opcional" [level=3] [ref=e194]:
                  - text: Layout del Área
                  - generic [ref=e195]: Opcional
                - paragraph [ref=e196]: Sube un croquis o plano de la estancia. La IA respetará la zonificación.
            - generic [ref=e198] [cursor=pointer]:
              - button "Subir plano de planta" [ref=e199]
              - img [ref=e201]
              - paragraph [ref=e204]: Haz clic para subir o arrastra el plano aquí
              - paragraph [ref=e205]: Máx. 5.00 MB
        - form "Módulo de Diseño Interior" [ref=e206]:
          - generic [ref=e207]:
            - button "05 Espacio y Propósito" [ref=e208]:
              - generic [ref=e209]:
                - generic [ref=e210]: "05"
                - heading "Espacio y Propósito" [level=3] [ref=e213]:
                  - img [ref=e215]
                  - text: Espacio y Propósito
              - img [ref=e219]
            - generic [ref=e220]:
              - paragraph [ref=e222]: Define el uso, el estilo y la influencia de autor de la estancia interior.
              - generic [ref=e223]:
                - group [ref=e224]:
                  - generic [ref=e225]:
                    - generic [ref=e226]: Influencia de Autor (Arquitecto)
                    - paragraph [ref=e227]: Busca la sensibilidad espacial de un maestro específico.
                  - generic [ref=e228]:
                    - button "Alberto Campo Baeza" [ref=e229]:
                      - generic [ref=e231]: Alberto Campo Baeza
                    - button "Alejandro Aravena" [ref=e232]:
                      - generic [ref=e234]: Alejandro Aravena
                    - button "Antoni Gaudí" [ref=e235]:
                      - generic [ref=e237]: Antoni Gaudí
                    - button "Arata Isozaki" [ref=e238]:
                      - generic [ref=e240]: Arata Isozaki
                    - button "Balkrishna Doshi" [ref=e241]:
                      - generic [ref=e243]: Balkrishna Doshi
                    - button "Bjarke Ingels (BIG)" [ref=e244]:
                      - generic [ref=e246]: Bjarke Ingels (BIG)
                    - button "Carlo Scarpa" [ref=e247]:
                      - generic [ref=e249]: Carlo Scarpa
                    - button "Coop Himmelb(l)au" [ref=e250]:
                      - generic [ref=e252]: Coop Himmelb(l)au
                    - button "Daniel Libeskind" [ref=e253]:
                      - generic [ref=e255]: Daniel Libeskind
                    - button "David Adjaye" [ref=e256]:
                      - generic [ref=e258]: David Adjaye
                    - button "David Chipperfield" [ref=e259]:
                      - generic [ref=e261]: David Chipperfield
                    - button "Diller Scofidio + Renfro" [ref=e262]:
                      - generic [ref=e264]: Diller Scofidio + Renfro
                    - button "Diébédo Francis Kéré" [ref=e265]:
                      - generic [ref=e267]: Diébédo Francis Kéré
                    - button "Eduardo Souto de Moura" [ref=e268]:
                      - generic [ref=e270]: Eduardo Souto de Moura
                    - button "Frank Gehry" [ref=e271]:
                      - generic [ref=e273]: Frank Gehry
                    - button "Frank Lloyd Wright" [ref=e274]:
                      - generic [ref=e276]: Frank Lloyd Wright
                    - button "Frida Escobedo" [ref=e277]:
                      - generic [ref=e279]: Frida Escobedo
                    - button "Fumihiko Maki" [ref=e280]:
                      - generic [ref=e282]: Fumihiko Maki
                    - button "Glenn Murcutt" [ref=e283]:
                      - generic [ref=e285]: Glenn Murcutt
                    - button "Grafton Architects" [ref=e286]:
                      - generic [ref=e288]: Grafton Architects
                    - button "Heatherwick Studio" [ref=e289]:
                      - generic [ref=e291]: Heatherwick Studio
                    - button "Herzog & de Meuron" [ref=e292]:
                      - generic [ref=e294]: Herzog & de Meuron
                    - button "I.M. Pei" [ref=e295]:
                      - generic [ref=e297]: I.M. Pei
                    - button "Jean Nouvel" [ref=e298]:
                      - generic [ref=e300]: Jean Nouvel
                    - button "John Pawson" [ref=e301]:
                      - generic [ref=e303]: John Pawson
                    - button "Junya Ishigami" [ref=e304]:
                      - generic [ref=e306]: Junya Ishigami
                    - button "Kengo Kuma" [ref=e307]:
                      - generic [ref=e309]: Kengo Kuma
                    - button "Lacaton & Vassal" [ref=e310]:
                      - generic [ref=e312]: Lacaton & Vassal
                    - button "Le Corbusier" [ref=e313]:
                      - generic [ref=e315]: Le Corbusier
                    - button "Louis Kahn" [ref=e316]:
                      - generic [ref=e318]: Louis Kahn
                    - button "Ludwig Mies van der Rohe" [ref=e319]:
                      - generic [ref=e321]: Ludwig Mies van der Rohe
                    - button "MAD Architects" [ref=e322]:
                      - generic [ref=e324]: MAD Architects
                    - button "Moshe Safdie" [ref=e325]:
                      - generic [ref=e327]: Moshe Safdie
                    - button "MVRDV" [ref=e328]:
                      - generic [ref=e330]: MVRDV
                    - button "Norman Foster" [ref=e331]:
                      - generic [ref=e333]: Norman Foster
                    - button "Olson Kundig" [ref=e334]:
                      - generic [ref=e336]: Olson Kundig
                    - button "OMA" [ref=e337]:
                      - generic [ref=e339]: OMA
                    - button "Oscar Niemeyer" [ref=e340]:
                      - generic [ref=e342]: Oscar Niemeyer
                    - button "Paulo Mendes da Rocha" [ref=e343]:
                      - generic [ref=e345]: Paulo Mendes da Rocha
                    - button "Peter Eisenman" [ref=e346]:
                      - generic [ref=e348]: Peter Eisenman
                    - button "Peter Zumthor" [ref=e349]:
                      - generic [ref=e351]: Peter Zumthor
                    - button "Rafael Moneo" [ref=e352]:
                      - generic [ref=e354]: Rafael Moneo
                    - button "Rem Koolhaas" [ref=e355]:
                      - generic [ref=e357]: Rem Koolhaas
                    - button "Renzo Piano" [ref=e358]:
                      - generic [ref=e360]: Renzo Piano
                    - button "Richard Meier" [ref=e361]:
                      - generic [ref=e363]: Richard Meier
                    - button "SANAA (Sejima + Nishizawa)" [ref=e364]:
                      - generic [ref=e366]: SANAA (Sejima + Nishizawa)
                    - button "Santiago Calatrava" [ref=e367]:
                      - generic [ref=e369]: Santiago Calatrava
                    - button "Shigeru Ban" [ref=e370]:
                      - generic [ref=e372]: Shigeru Ban
                    - button "Sin arquitecto específico" [ref=e373]:
                      - generic [ref=e375]: Sin arquitecto específico
                    - button "Snøhetta" [ref=e376]:
                      - generic [ref=e378]: Snøhetta
                    - button "Sou Fujimoto" [ref=e379]:
                      - generic [ref=e381]: Sou Fujimoto
                    - button "Steven Holl" [ref=e382]:
                      - generic [ref=e384]: Steven Holl
                    - button "Studio Gang" [ref=e385]:
                      - generic [ref=e387]: Studio Gang
                    - button "Tadao Ando" [ref=e388]:
                      - generic [ref=e390]: Tadao Ando
                    - button "Tatiana Bilbao" [ref=e391]:
                      - generic [ref=e393]: Tatiana Bilbao
                    - button "Thom Mayne (Morphosis)" [ref=e394]:
                      - generic [ref=e396]: Thom Mayne (Morphosis)
                    - button "Toyo Ito" [ref=e397]:
                      - generic [ref=e399]: Toyo Ito
                    - button "UNStudio" [ref=e400]:
                      - generic [ref=e402]: UNStudio
                    - button "Wang Shu" [ref=e403]:
                      - generic [ref=e405]: Wang Shu
                    - button "WOHA" [ref=e406]:
                      - generic [ref=e408]: WOHA
                    - button "Zaha Hadid" [ref=e409]:
                      - generic [ref=e411]: Zaha Hadid
                    - button "Álvaro Siza" [ref=e412]:
                      - generic [ref=e414]: Álvaro Siza
                - generic [ref=e415]:
                  - generic [ref=e416]:
                    - generic [ref=e417]: Espacio / Habitación
                    - generic [ref=e418]:
                      - combobox [ref=e419] [cursor=pointer]:
                        - option "—" [selected]
                        - option "Baño principal"
                        - option "Biblioteca/Estudio"
                        - option "Cocina gourmet"
                        - option "Comedor formal"
                        - option "Cuarto de juegos"
                        - option "Dormitorio principal"
                        - option "Gimnasio privado"
                        - option "Home Cinema"
                        - option "Pasillo/Galería"
                        - option "Recibidor/Entryway"
                        - option "Sala de estar/Living room"
                        - option "Terraza/Deck interior"
                        - option "Vestidor/Walk-in closet"
                      - generic:
                        - img
                  - generic [ref=e420]:
                    - generic [ref=e421]: Atmósfera / Mood
                    - generic [ref=e422]:
                      - combobox [ref=e423] [cursor=pointer]:
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
                - group [ref=e424]:
                  - generic [ref=e425]:
                    - generic [ref=e426]: Estilo Decorativo
                    - paragraph [ref=e427]: Lenguaje estético interior.
                  - generic [ref=e428]:
                    - button "Africano vernáculo" [ref=e429]:
                      - generic [ref=e431]: Africano vernáculo
                    - button "Alpino/Chalet" [ref=e432]:
                      - generic [ref=e434]: Alpino/Chalet
                    - button "Andaluz" [ref=e435]:
                      - generic [ref=e437]: Andaluz
                    - button "Antebellum" [ref=e438]:
                      - generic [ref=e440]: Antebellum
                    - button "Art Deco" [ref=e441]:
                      - generic [ref=e443]: Art Deco
                    - button "Art Nouveau" [ref=e444]:
                      - generic [ref=e446]: Art Nouveau
                    - button "Australiano contemporáneo" [ref=e447]:
                      - generic [ref=e449]: Australiano contemporáneo
                    - button "Balinés" [ref=e450]:
                      - generic [ref=e452]: Balinés
                    - button "Barroco" [ref=e453]:
                      - generic [ref=e455]: Barroco
                    - button "Bauhaus" [ref=e456]:
                      - generic [ref=e458]: Bauhaus
                    - button "Beaux-Arts" [ref=e459]:
                      - generic [ref=e461]: Beaux-Arts
                    - button "Biofílico" [ref=e462]:
                      - generic [ref=e464]: Biofílico
                    - button "Blob Architecture" [ref=e465]:
                      - generic [ref=e467]: Blob Architecture
                    - button "Bohemio de lujo" [ref=e468]:
                      - generic [ref=e470]: Bohemio de lujo
                    - button "Brasileño moderno" [ref=e471]:
                      - generic [ref=e473]: Brasileño moderno
                    - button "Brownstone" [ref=e474]:
                      - generic [ref=e476]: Brownstone
                    - button "Brutalista" [ref=e477]:
                      - generic [ref=e479]: Brutalista
                    - button "California Modern" [ref=e480]:
                      - generic [ref=e482]: California Modern
                    - button "Cape Cod" [ref=e483]:
                      - generic [ref=e485]: Cape Cod
                    - button "Caribeño" [ref=e486]:
                      - generic [ref=e488]: Caribeño
                    - button "Coastal Modern" [ref=e489]:
                      - generic [ref=e491]: Coastal Modern
                    - button "Colonial" [ref=e492]:
                      - generic [ref=e494]: Colonial
                    - button "Container" [ref=e495]:
                      - generic [ref=e497]: Container
                    - button "Contemporáneo" [ref=e498]:
                      - generic [ref=e500]: Contemporáneo
                    - button "Craftsman/Bungalow" [ref=e501]:
                      - generic [ref=e503]: Craftsman/Bungalow
                    - button "De Stijl" [ref=e504]:
                      - generic [ref=e506]: De Stijl
                    - button "Deconstructivista" [ref=e507]:
                      - generic [ref=e509]: Deconstructivista
                    - button "Desert Modern" [ref=e510]:
                      - generic [ref=e512]: Desert Modern
                    - button "Earthship" [ref=e513]:
                      - generic [ref=e515]: Earthship
                    - button "Escandinavo" [ref=e516]:
                      - generic [ref=e518]: Escandinavo
                    - button "Español Colonial" [ref=e519]:
                      - generic [ref=e521]: Español Colonial
                    - button "Farmhouse moderno" [ref=e522]:
                      - generic [ref=e524]: Farmhouse moderno
                    - button "Floating/Sobre agua" [ref=e525]:
                      - generic [ref=e527]: Floating/Sobre agua
                    - button "Florida/Miami Deco" [ref=e528]:
                      - generic [ref=e530]: Florida/Miami Deco
                    - button "Futurista" [ref=e531]:
                      - generic [ref=e533]: Futurista
                    - button "Georgian" [ref=e534]:
                      - generic [ref=e536]: Georgian
                    - button "Greek Revival" [ref=e537]:
                      - generic [ref=e539]: Greek Revival
                    - button "Griego isleño" [ref=e540]:
                      - generic [ref=e542]: Griego isleño
                    - button "Gótico Revival" [ref=e543]:
                      - generic [ref=e545]: Gótico Revival
                    - button "Hacienda moderna" [ref=e546]:
                      - generic [ref=e548]: Hacienda moderna
                    - button "Hanok (Coreano)" [ref=e549]:
                      - generic [ref=e551]: Hanok (Coreano)
                    - button "High-Tech" [ref=e552]:
                      - generic [ref=e554]: High-Tech
                    - button "Industrial" [ref=e555]:
                      - generic [ref=e557]: Industrial
                    - button "Japandi" [ref=e558]:
                      - generic [ref=e560]: Japandi
                    - button "Japonés tradicional" [ref=e561]:
                      - generic [ref=e563]: Japonés tradicional
                    - button "Loft" [ref=e564]:
                      - generic [ref=e566]: Loft
                    - button "Marroquí/Morisco" [ref=e567]:
                      - generic [ref=e569]: Marroquí/Morisco
                    - button "Mediterráneo" [ref=e570]:
                      - generic [ref=e572]: Mediterráneo
                    - button "Metabolista" [ref=e573]:
                      - generic [ref=e575]: Metabolista
                    - button "Mexicano contemporáneo" [ref=e576]:
                      - generic [ref=e578]: Mexicano contemporáneo
                    - button "Mid-Century Modern" [ref=e579]:
                      - generic [ref=e581]: Mid-Century Modern
                    - button "Minimalista" [ref=e582]:
                      - generic [ref=e584]: Minimalista
                    - button "Moderno" [ref=e585]:
                      - generic [ref=e587]: Moderno
                    - button "Mountain Modern" [ref=e588]:
                      - generic [ref=e590]: Mountain Modern
                    - button "Neo-brutalista" [ref=e591]:
                      - generic [ref=e593]: Neo-brutalista
                    - button "Neoclásico" [ref=e594]:
                      - generic [ref=e596]: Neoclásico
                    - button "Net-Zero/Passivhaus" [ref=e597]:
                      - generic [ref=e599]: Net-Zero/Passivhaus
                    - button "Orgánico" [ref=e600]:
                      - generic [ref=e602]: Orgánico
                    - button "Pacific Northwest" [ref=e603]:
                      - generic [ref=e605]: Pacific Northwest
                    - button "Palladiano" [ref=e606]:
                      - generic [ref=e608]: Palladiano
                    - button "Paramétrico" [ref=e609]:
                      - generic [ref=e611]: Paramétrico
                    - button "Persa" [ref=e612]:
                      - generic [ref=e614]: Persa
                    - button "Postmoderno" [ref=e615]:
                      - generic [ref=e617]: Postmoderno
                    - button "Prairie" [ref=e618]:
                      - generic [ref=e620]: Prairie
                    - button "Provenzal" [ref=e621]:
                      - generic [ref=e623]: Provenzal
                    - button "Pueblo Revival" [ref=e624]:
                      - generic [ref=e626]: Pueblo Revival
                    - button "Pueblo/Adobe" [ref=e627]:
                      - generic [ref=e629]: Pueblo/Adobe
                    - button "Ranch" [ref=e630]:
                      - generic [ref=e632]: Ranch
                    - button "Resort Modern" [ref=e633]:
                      - generic [ref=e635]: Resort Modern
                    - button "Shingle Style" [ref=e636]:
                      - generic [ref=e638]: Shingle Style
                    - button "Sustentable/Eco" [ref=e639]:
                      - generic [ref=e641]: Sustentable/Eco
                    - button "Tiny House" [ref=e642]:
                      - generic [ref=e644]: Tiny House
                    - button "Toscano" [ref=e645]:
                      - generic [ref=e647]: Toscano
                    - button "Treehouse/Árbol" [ref=e648]:
                      - generic [ref=e650]: Treehouse/Árbol
                    - button "Tropical" [ref=e651]:
                      - generic [ref=e653]: Tropical
                    - button "Tudor" [ref=e654]:
                      - generic [ref=e656]: Tudor
                    - button "Underground/Tierra" [ref=e657]:
                      - generic [ref=e659]: Underground/Tierra
                    - button "Victoriano" [ref=e660]:
                      - generic [ref=e662]: Victoriano
                    - button "Wabi-sabi" [ref=e663]:
                      - generic [ref=e665]: Wabi-sabi
                    - button "Wine Country" [ref=e666]:
                      - generic [ref=e668]: Wine Country
                    - button "Árabe contemporáneo" [ref=e669]:
                      - generic [ref=e671]: Árabe contemporáneo
          - generic [ref=e672]:
            - button "06 Equipamiento y Luz" [ref=e673]:
              - generic [ref=e674]:
                - generic [ref=e675]: "06"
                - heading "Equipamiento y Luz" [level=3] [ref=e678]:
                  - img [ref=e680]
                  - text: Equipamiento y Luz
              - img [ref=e684]
            - generic [ref=e685]:
              - paragraph [ref=e687]: Configura los muebles y la iluminación ambiental.
              - generic [ref=e688]:
                - group [ref=e689]:
                  - generic [ref=e690]:
                    - generic [ref=e691]: Mobiliario
                    - paragraph [ref=e692]: Piezas y acabados de muebles.
                  - generic [ref=e693]:
                    - button "Bespoke / Hecho a medida" [ref=e694]:
                      - generic [ref=e696]: Bespoke / Hecho a medida
                    - button "Bohemio" [ref=e697]:
                      - generic [ref=e699]: Bohemio
                    - button "Clásico/Tradicional" [ref=e700]:
                      - generic [ref=e702]: Clásico/Tradicional
                    - button "Diseño de autor (Iconic Designers)" [ref=e703]:
                      - generic [ref=e705]: Diseño de autor (Iconic Designers)
                    - button "Escandinavo" [ref=e706]:
                      - generic [ref=e708]: Escandinavo
                    - button "Industrial" [ref=e709]:
                      - generic [ref=e711]: Industrial
                    - button "Maximalista" [ref=e712]:
                      - generic [ref=e714]: Maximalista
                    - button "Mid-Century Modern" [ref=e715]:
                      - generic [ref=e717]: Mid-Century Modern
                    - button "Minimalista" [ref=e718]:
                      - generic [ref=e720]: Minimalista
                    - button "Rústico moderno" [ref=e721]:
                      - generic [ref=e723]: Rústico moderno
                - group [ref=e724]:
                  - generic [ref=e725]:
                    - generic [ref=e726]: Iluminación Interior
                    - paragraph [ref=e727]: Fuentes de luz artificial y natural.
                  - generic [ref=e728]:
                    - button "Candelabro/Lámpara colgante" [ref=e729]:
                      - generic [ref=e731]: Candelabro/Lámpara colgante
                    - button "Iluminación de riel (Track lighting)" [ref=e732]:
                      - generic [ref=e734]: Iluminación de riel (Track lighting)
                    - button "Iluminación indirecta (Cove lighting)" [ref=e735]:
                      - generic [ref=e737]: Iluminación indirecta (Cove lighting)
                    - button "LED empotrados (Recessed)" [ref=e738]:
                      - generic [ref=e740]: LED empotrados (Recessed)
                    - button "Luz natural cenital (Skylight)" [ref=e741]:
                      - generic [ref=e743]: Luz natural cenital (Skylight)
                    - button "Luz natural lateral (Grandes ventanales)" [ref=e744]:
                      - generic [ref=e746]: Luz natural lateral (Grandes ventanales)
                    - button "Lámparas de pie/diseño" [ref=e747]:
                      - generic [ref=e749]: Lámparas de pie/diseño
          - generic [ref=e750]:
            - button "07 Detalle Funcional" [ref=e751]:
              - generic [ref=e752]:
                - generic [ref=e753]: "07"
                - heading "Detalle Funcional" [level=3] [ref=e756]:
                  - img [ref=e758]
                  - text: Detalle Funcional
              - img [ref=e764]
            - generic [ref=e766]:
              - generic [ref=e767]:
                - generic [ref=e768]:
                  - generic [ref=e769]: Tipo de Cocina
                  - generic [ref=e770]:
                    - combobox [ref=e771] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Abierta (Americana)"
                      - option "Cerrada tradicional"
                      - option "Con isla central"
                      - option "En L"
                      - option "En U"
                      - option "Gourmet exterior"
                    - generic:
                      - img
                - generic [ref=e772]:
                  - generic [ref=e773]: Área Social
                  - generic [ref=e774]:
                    - combobox [ref=e775] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Con mezzanine"
                      - option "Concepto abierto"
                      - option "Conexión directa jardín"
                      - option "Doble altura"
                      - option "Zonificado/Dividido"
                    - generic:
                      - img
              - generic [ref=e776]:
                - generic [ref=e777]:
                  - generic [ref=e778]: Dormitorios
                  - spinbutton [ref=e779]: "0"
                - generic [ref=e780]:
                  - generic [ref=e781]: Baños
                  - spinbutton [ref=e782]: "0"
          - generic [ref=e783]:
            - button "08 Materialidad y Superficies" [ref=e784]:
              - generic [ref=e785]:
                - generic [ref=e786]: "08"
                - heading "Materialidad y Superficies" [level=3] [ref=e789]:
                  - img [ref=e791]
                  - text: Materialidad y Superficies
              - img [ref=e796]
            - generic [ref=e798]:
              - generic [ref=e799]:
                - generic [ref=e800]:
                  - generic [ref=e801]: Suelo / Pavimento
                  - generic [ref=e802]:
                    - combobox [ref=e803] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Concreto pulido"
                      - option "Madera de nogal oscuro"
                      - option "Madera de roble claro"
                      - option "Microcemento"
                      - option "Mármol de Carrara"
                      - option "Piedra natural"
                      - option "Terrazzo"
                    - generic:
                      - img
                - generic [ref=e804]:
                  - generic [ref=e805]: Techo / Cielorraso
                  - generic [ref=e806]:
                    - combobox [ref=e807] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Artesonado (Coffered)"
                      - option "Concreto expuesto"
                      - option "Falso techo con foseado LED"
                      - option "Liso/Minimalista"
                      - option "Techo con vigas de madera expuestas"
                      - option "Techo de doble altura"
                    - generic:
                      - img
              - group [ref=e808]:
                - generic [ref=e809]:
                  - generic [ref=e810]: Revestimientos
                  - paragraph [ref=e811]: Materiales de muros y superficies.
                - generic [ref=e812]:
                  - button "Acero" [ref=e813]:
                    - generic [ref=e815]: Acero
                  - button "Acero corten" [ref=e816]:
                    - generic [ref=e818]: Acero corten
                  - button "Adobe" [ref=e819]:
                    - generic [ref=e821]: Adobe
                  - button "Bambú" [ref=e822]:
                    - generic [ref=e824]: Bambú
                  - button "Cobre" [ref=e825]:
                    - generic [ref=e827]: Cobre
                  - button "Concreto" [ref=e828]:
                    - generic [ref=e830]: Concreto
                  - button "Concreto expuesto" [ref=e831]:
                    - generic [ref=e833]: Concreto expuesto
                  - button "Estuco" [ref=e834]:
                    - generic [ref=e836]: Estuco
                  - button "Ladrillo" [ref=e837]:
                    - generic [ref=e839]: Ladrillo
                  - button "Ladrillo visto" [ref=e840]:
                    - generic [ref=e842]: Ladrillo visto
                  - button "Madera" [ref=e843]:
                    - generic [ref=e845]: Madera
                  - button "Madera oscura" [ref=e846]:
                    - generic [ref=e848]: Madera oscura
                  - button "Mármol" [ref=e849]:
                    - generic [ref=e851]: Mármol
                  - button "Piedra natural" [ref=e852]:
                    - generic [ref=e854]: Piedra natural
                  - button "Terracota" [ref=e855]:
                    - generic [ref=e857]: Terracota
                  - button "Vidrio" [ref=e858]:
                    - generic [ref=e860]: Vidrio
                  - button "Zinc" [ref=e861]:
                    - generic [ref=e863]: Zinc
              - generic [ref=e864]:
                - generic [ref=e865]: Nivel de Acabado
                - generic [ref=e866]:
                  - combobox [ref=e867] [cursor=pointer]:
                    - option "—" [selected]
                    - option "Económico/Funcional"
                    - option "Estándar/Medio"
                    - option "Premium/Alto"
                    - option "Ultra lujo/Bespoke"
                  - generic:
                    - img
          - generic [ref=e868]:
            - button "09 Paleta de Color" [ref=e869]:
              - generic [ref=e870]:
                - generic [ref=e871]: "09"
                - heading "Paleta de Color" [level=3] [ref=e874]:
                  - img [ref=e876]
                  - text: Paleta de Color
              - img [ref=e883]
            - group [ref=e885]:
              - generic [ref=e886]:
                - generic [ref=e887]: Colores Dominantes
                - paragraph [ref=e888]: Gama cromática interior.
              - generic [ref=e889]:
                - button "Alto contraste" [ref=e890]:
                  - generic [ref=e892]: Alto contraste
                - button "Blanco puro" [ref=e893]:
                  - generic [ref=e895]: Blanco puro
                - button "Colores cálidos" [ref=e896]:
                  - generic [ref=e898]: Colores cálidos
                - button "Colores fríos" [ref=e899]:
                  - generic [ref=e901]: Colores fríos
                - button "Grises" [ref=e902]:
                  - generic [ref=e904]: Grises
                - button "Madera natural" [ref=e905]:
                  - generic [ref=e907]: Madera natural
                - button "Monocromático" [ref=e908]:
                  - generic [ref=e910]: Monocromático
                - button "Negro/Carbón" [ref=e911]:
                  - generic [ref=e913]: Negro/Carbón
                - button "Tonos neutros" [ref=e914]:
                  - generic [ref=e916]: Tonos neutros
                - button "Tonos tierra" [ref=e917]:
                  - generic [ref=e919]: Tonos tierra
          - generic [ref=e920]:
            - button "10 Configuración de Cámara" [ref=e921]:
              - generic [ref=e922]:
                - generic [ref=e923]: "10"
                - heading "Configuración de Cámara" [level=3] [ref=e926]:
                  - img [ref=e928]
                  - text: Configuración de Cámara
              - img [ref=e932]
            - generic [ref=e934]:
              - generic [ref=e935]:
                - generic [ref=e936]: Dirección de Fotografía
                - generic [ref=e937]:
                  - combobox [ref=e938] [cursor=pointer]:
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
              - generic [ref=e939]:
                - generic [ref=e940]:
                  - generic [ref=e941]: Distancia Focal
                  - generic [ref=e942]:
                    - combobox [ref=e943] [cursor=pointer]:
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
                - generic [ref=e944]:
                  - generic [ref=e945]: Apertura
                  - generic [ref=e946]:
                    - combobox [ref=e947] [cursor=pointer]:
                      - option "—" [selected]
                      - option "f/11"
                      - option "f/2"
                      - option "f/2.8"
                      - option "f/4"
                      - option "f/5.6"
                      - option "f/8"
                    - generic:
                      - img
              - generic [ref=e948]:
                - generic [ref=e949]:
                  - generic [ref=e950]: Ángulo
                  - generic [ref=e951]:
                    - combobox [ref=e952] [cursor=pointer]:
                      - option "—" [selected]
                      - option "3/4 frontal"
                      - option "Aéreo/Drone"
                      - option "Frontal"
                      - option "Lateral"
                      - option "Nivel de calle"
                      - option "Perspectiva dramática"
                    - generic:
                      - img
                - generic [ref=e953]:
                  - generic [ref=e954]: Composición
                  - generic [ref=e955]:
                    - combobox [ref=e956] [cursor=pointer]:
                      - option "—" [selected]
                      - option "Encuadre natural (árboles)"
                      - option "Líneas guía dramáticas"
                      - option "Reflejo en agua"
                      - option "Regla de tercios"
                      - option "Silueta contra cielo"
                      - option "Simétrica centrada"
                    - generic:
                      - img
          - generic [ref=e957]:
            - button "11 Output Final" [ref=e958]:
              - generic [ref=e959]:
                - generic [ref=e960]: "11"
                - heading "Output Final" [level=3] [ref=e963]:
                  - img [ref=e965]
                  - text: Output Final
              - img [ref=e970]
            - generic [ref=e972]:
              - generic [ref=e973]:
                - generic [ref=e974]: Estilo de Imagen
                - generic [ref=e975]:
                  - combobox [ref=e976] [cursor=pointer]:
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
              - generic [ref=e977]:
                - generic [ref=e978]: Aspect Ratio
                - generic [ref=e979]:
                  - combobox [ref=e980] [cursor=pointer]:
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
              - generic [ref=e981]:
                - generic [ref=e982]: Resolución
                - generic [ref=e983]:
                  - combobox [ref=e984] [cursor=pointer]:
                    - option "—" [selected]
                    - option "1K"
                    - option "2K"
                    - option "4K"
                    - option "512"
                  - generic:
                    - img
          - generic [ref=e985]:
            - button "12 Dirección Creativa" [ref=e986]:
              - generic [ref=e987]:
                - generic [ref=e988]: "12"
                - heading "Dirección Creativa" [level=3] [ref=e991]:
                  - img [ref=e993]
                  - text: Dirección Creativa
              - img [ref=e996]
            - textbox "Notas sobre el estilismo o la luz..." [ref=e998]
        - button "Generate interior render" [ref=e1000]:
          - text: Generate interior
          - img [ref=e1001]
        - generic [ref=e1008]:
          - generic [ref=e1010]:
            - img [ref=e1012]
            - generic [ref=e1015]:
              - heading "Design Spec" [level=3] [ref=e1016]
              - paragraph [ref=e1017]: 6 PARAMS ACTIVE
          - generic [ref=e1022]:
            - generic [ref=e1023]:
              - generic [ref=e1024]:
                - generic [ref=e1025]: "03"
                - img [ref=e1027]
                - generic [ref=e1032]: Modo de Trabajo
              - generic [ref=e1034]:
                - generic [ref=e1035]: MODO
                - generic [ref=e1036]: interior
            - generic [ref=e1037]:
              - generic [ref=e1038]:
                - generic [ref=e1039]: "11"
                - img [ref=e1041]
                - generic [ref=e1044]: Parámetros Fotográficos
              - generic [ref=e1045]:
                - generic [ref=e1046]:
                  - generic [ref=e1047]: CÁMARA
                  - generic [ref=e1048]: Fujifilm X100 VI
                - generic [ref=e1049]:
                  - generic [ref=e1050]: FOCAL
                  - generic [ref=e1051]: 35mm (documental natural)
                - generic [ref=e1052]:
                  - generic [ref=e1053]: APERTURA
                  - generic [ref=e1054]: f/5.6 (punto dulce arquitectónico)
                - generic [ref=e1055]:
                  - generic [ref=e1056]: PELÍCULA
                  - generic [ref=e1057]: Classic Chrome
            - generic [ref=e1058]:
              - generic [ref=e1059]:
                - generic [ref=e1060]: "12"
                - img [ref=e1062]
                - generic [ref=e1065]: Configuración de Salida
              - generic [ref=e1067]:
                - generic [ref=e1068]: RATIO
                - generic [ref=e1069]: 16:9
    - contentinfo [ref=e1071]:
      - generic [ref=e1072]:
        - generic [ref=e1073]:
          - heading "DreamHouse AI" [level=2] [ref=e1074]
          - generic [ref=e1075]:
            - link "Terms" [ref=e1076] [cursor=pointer]:
              - /url: "#"
            - link "Privacy" [ref=e1077] [cursor=pointer]:
              - /url: "#"
            - link "Contact" [ref=e1078] [cursor=pointer]:
              - /url: "#"
        - generic [ref=e1079]:
          - paragraph [ref=e1080]: Architecture Studio
          - paragraph [ref=e1081]: © 2025 DreamHouse Inc.
  - button "Open Next.js Dev Tools" [ref=e1087] [cursor=pointer]:
    - img [ref=e1088]
  - alert [ref=e1091]
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
> 49 |     await expect(page.getByText('Tipo de Espacio')).toBeVisible();
     |                                                     ^ Error: expect(locator).toBeVisible() failed
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
  65 |     await expect(page.getByText('Sube la imagen que deseas editar')).toBeVisible();
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
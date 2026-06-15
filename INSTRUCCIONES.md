# POSTECSA — Cierre de OT · PWA

## ¿Qué hay en este paquete?

| Archivo | Descripción |
|---|---|
| `index.html` | La app completa (formulario + PDF) |
| `manifest.json` | Metadatos de la PWA (nombre, ícono, colores) |
| `sw.js` | Service Worker — permite uso offline |
| `icon-192.png` | Ícono 192×192 px |
| `icon-512.png` | Ícono 512×512 px |

---

## PASO 1 — Subir a GitHub Pages (GRATIS)

### 1.1 Crear cuenta GitHub (si no tienes)
→ https://github.com/signup  
Elige un nombre de usuario, correo y contraseña.

### 1.2 Crear repositorio
1. En GitHub, clic en **"New"** (botón verde arriba a la izquierda)
2. Nombre del repositorio: `postecsa-ot`
3. Marcar: ✅ **Public**
4. Clic en **"Create repository"**

### 1.3 Subir los archivos
1. En la página del repositorio, clic en **"uploading an existing file"**
2. Arrastra los 5 archivos de este paquete:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. Abajo, clic en **"Commit changes"** (botón verde)

### 1.4 Activar GitHub Pages
1. En el repositorio → pestaña **Settings**
2. Menú izquierdo → **Pages**
3. En "Source" selecciona: **Deploy from a branch**
4. Branch: **main** / Folder: **/ (root)**
5. Clic en **Save**
6. Espera 2–3 minutos → aparecerá la URL:  
   `https://TU-USUARIO.github.io/postecsa-ot`

---

## PASO 2 — Instalar en el Samsung S25 Ultra

1. Abre **Chrome** en el celular
2. Ve a la URL de GitHub Pages de arriba
3. Espera a que cargue completamente
4. Aparecerá automáticamente un banner o botón **"📲 Instalar app"**
5. Si no aparece: toca el menú **⋮** (tres puntos) → **"Instalar app"** o **"Añadir a pantalla de inicio"**
6. ¡Listo! Queda en el cajón de apps con ícono propio

---

## Uso offline

Una vez instalada y abierta al menos una vez con conexión, la app **funciona sin internet**:
- Rellenas el formulario completo
- Generas y descargas el PDF localmente
- Cuando tengas señal, usas "Enviar al servidor"

---

## Configurar el servidor Google Apps Script (GAS_URL)

Para que el botón "Enviar OT al servidor" funcione, edita `index.html`:

Busca esta línea:
```
var GAS_URL = "PEGA_AQUÍ_LA_URL_/exec_DEL_GAS";
```
Y reemplaza con tu URL real de Google Apps Script.

---

## Actualizar la app

Si haces cambios, sube el nuevo `index.html` a GitHub (reemplaza el existente).  
La próxima vez que el celular tenga internet, se actualizará automáticamente.

---

*Generado para POSTEC DE OCCIDENTE S.A.S. — Gestión de Mantenimiento y Confiabilidad*

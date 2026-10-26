# QuizDAW – Los 15 fallos y la función nueva

## Parte 1 · Los 15 fallos (qué era, cómo se encuentra, cómo se arregla)

| # | Archivo | Qué pasaba | Cómo lo encuentras | Arreglo |
|---|---------|-----------|--------------------|---------|
| 1 | cookies.js | `max-age` en minutos, no segundos (`dias*24*60`) | Application → Cookies: caduca en 30 días/60 = 12 h | `dias * 24 * 60 * 60` |
| 2 | cookies.js | `borrarCookie` usa `path=/quiz`, pero se creó con `path=/` | "Borrar datos" no borra nada en Application | `path=/` |
| 3 | partida.js | `getMonth()` empieza en 0 | La fecha sale con un mes menos | `getMonth() + 1` |
| 4 | partida.js | `getYear()` obsoleto (devuelve 126 en 2026) | La fecha sale "26/10/126" | `getFullYear()` |
| 5 | partida.js | `cargarPartidas` devuelve objetos planos (JSON.parse no recrea la clase) | Consola: `p.resumen is not a function` | `datos.map(d => new Partida(...))` |
| 6 | partida.js | `slice(0, 5)` conserva las 5 PRIMERAS, no las últimas | Tras 6 partidas la lista no cambia | `slice(-5)` |
| 7 | partida.js | `reduce` sin valor inicial: suma el objeto entero | La media sale `NaN` | `reduce(..., 0)` |
| 8 | app.js | `prompt()` devuelve `null` al cancelar → `.trim()` falla | Pulsar Cancelar: error en consola, la página queda a medias | `(prompt(...) \|\| "").trim()` |
| 9 | app.js | `document.body.class` no existe (es `className`) | El tema oscuro nunca se aplica | `document.body.className` |
| 10 | app.js | `document.innerWidth` no existe (es de `window`) | Pie: "undefined × undefined" | `window.innerWidth` |
| 11 | app.js | `window.title` no existe (es `document.title`) | Pie: "Página: undefined" | `document.title` |
| 12 | app.js | `Math.random()*length + 1` → posición fuera de rango, `splice` devuelve `undefined` | Error al empezar o preguntas repetidas/vacías | quitar el `+ 1` |
| 13 | app.js | `dataset.i` es texto ("1") y se compara con `===` con un número | Nunca cuenta acierto (siempre "Incorrecto") | `responder(Number(dato))` |
| 14 | app.js | `abrirResultados()` con paréntesis: se ejecuta al cargar, no al pulsar | Se abre el popup solo al entrar; el botón no hace nada | `addEventListener("click", abrirResultados)` |
| 15 | app.js | El archivo se llama `resultados.html`, no `resultado.html` | El popup da 404 | `"resultados.html"` |

Extra (robustez, no es de los 15): las cookies ahora se guardan con `encodeURIComponent` y `leerCookie` usa `try/catch` por si la cookie está corrupta.

## Parte 2 · Función nueva: RANKING (top 3)

- **Botón nuevo:** "Ranking" (index.html) → muestra/oculta la sección con las 3 mejores partidas.
- **Cookie con JSON:** `quiz_ranking` (array de objetos `{nombre, puntos, total, segundos}`), 30 días.
- **Array/objeto:** se hace `push`, `sort` (más puntos primero; si empatan, menos segundos) y `slice(0, 3)`.
- **Texto/etiquetas con código:** `pintarRanking()` crea `<li>` y `<strong>` con `createElement` y `textContent`.
- "Borrar datos" también borra el ranking.

Dónde está: `actualizarRanking` / `cargarRanking` en partida.js; `pintarRanking` / `alternarRanking` en app.js.
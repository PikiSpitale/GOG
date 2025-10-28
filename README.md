# Guía: Consumir la API de RAWG con Zod

Este proyecto usa React + Vite como base, y la idea es integrar la API pública de RAWG para poder buscar videojuegos, mostrarlos en la aplicación y permitir que cada usuario cree una lista personal donde asigne una nota y las horas jugadas.

La siguiente guía explica cómo:

- Configurar credenciales y dependencias necesarias.
- Validar las respuestas de RAWG con [Zod](https://github.com/colinhacks/zod).
- Exponer funciones de búsqueda que devuelvan datos tipados.
- Persistir juegos seleccionados con nota y horas jugadas en el front.

## Requisitos previos

- Node.js 18+ y npm.
- Cuenta en [RAWG](https://rawg.io/apidocs) para generar una API key gratuita.
- Este repositorio clonado y dependencias instaladas con `npm install`.

## Configuración de credenciales

1. Crea un archivo `.env` en la raíz del proyecto (Vite solo expone variables que empiezan con `VITE_`):

   ```bash
   cp .env.example .env # si existe; de lo contrario crea uno nuevo
   ```

2. Agrega tu clave:

   ```bash
   echo "VITE_RAWG_API_KEY=tu_api_key_aquí" >> .env
   ```

3. Reinicia el servidor de desarrollo si ya estaba corriendo (`npm run dev`).

## Instalación de dependencias

Zod no viene preinstalado. Añádelo junto con un cliente HTTP (puedes usar `fetch`, pero `axios` simplifica interceptores y baseURL):

```bash
npm install zod axios
```

## Cliente RAWG tipado con Zod

1. Crea `src/api/rawgClient.js` para encapsular la llamada HTTP:

   ```js
   import axios from "axios";

   export const rawgClient = axios.create({
     baseURL: "https://api.rawg.io/api",
     params: {
       key: import.meta.env.VITE_RAWG_API_KEY,
     },
   });
   ```

2. Define los esquemas Zod en `src/api/rawgSchemas.js`:

   ```js
   import { z } from "zod";

   export const rawgGameSchema = z.object({
     id: z.number(),
     name: z.string(),
     background_image: z.string().url().nullable(),
     released: z.string().nullable(),
     metacritic: z.number().nullable(),
     rating: z.number().min(0),
     playtime: z.number().min(0),
   });

   export const rawgSearchResponseSchema = z.object({
     count: z.number(),
     results: z.array(rawgGameSchema),
   });
   ```

3. Expón funciones reutilizables en `src/api/rawgService.js`:

   ```js
   import { rawgClient } from "./rawgClient";
   import { rawgSearchResponseSchema } from "./rawgSchemas";

   export const fetchGames = async ({ search, page = 1 }) => {
     const params = {
       search,
       page,
       page_size: 20,
     };

     const { data } = await rawgClient.get("/games", { params });
     const parsed = rawgSearchResponseSchema.parse(data);
     return parsed.results;
   };
   ```

4. Maneja errores de validación para mostrar mensajes útiles en la UI:

   ```js
   try {
     const games = await fetchGames({ search: term });
     // ...
   } catch (error) {
     if (error.name === "ZodError") {
       console.error("Respuesta inesperada de RAWG", error.issues);
     } else {
       console.error("Error consultando RAWG", error);
     }
   }
   ```

## Integración en componentes React

Un patrón sencillo es envolver la lógica en un hook. Crea `src/hooks/useRawgSearch.js`:

```js
import { useCallback, useState } from "react";
import { fetchGames } from "../api/rawgService";

export const useRawgSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  const searchGames = useCallback(async (term) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await fetchGames({ search: term });
      setGames(results);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { games, isLoading, error, searchGames };
};
```

En tu componente de búsqueda puedes consumir el hook para poblar una tabla o cards.

## Lista personal con nota y horas jugadas

Se puede comenzar guardando el estado en memoria y, opcionalmente, sincronizarlo con `localStorage`:

```js
import { useState } from "react";

const usePersonalList = () => {
  const [entries, setEntries] = useState([]);

  const addGame = (game, { score, hours }) => {
    setEntries((prev) => [
      ...prev,
      {
        id: game.id,
        name: game.name,
        backgroundImage: game.background_image,
        score,
        hours,
      },
    ]);
  };

  const updateEntry = (id, updates) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updates } : entry))
    );
  };

  const removeEntry = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return { entries, addGame, updateEntry, removeEntry };
};
```

Integra `useRawgSearch` con `usePersonalList` para que los usuarios seleccionen un juego de la búsqueda, asignen una nota (`score`) y horas (`hours`), y luego lo visualicen en su lista.

## Buenas prácticas

- Los esquemas Zod viven cerca de las llamadas a la API; actualízalos cuando consultes nuevos endpoints.
- Usa `safeParse` si prefieres manejar errores manualmente sin lanzar excepciones.
- RAWG impone límites de peticiones, cachea resultados en memoria si el mismo término se repite.
- Considera persistir la lista personal en `localStorage` o backend más adelante.

## Próximos pasos sugeridos

1. Añadir validación de formularios (React Hook Form + Zod).
2. Crear componentes de UI reutilizables para mostrar tarjetas de juegos.
3. Añadir filtros adicionales (plataformas, género) usando parámetros de RAWG.

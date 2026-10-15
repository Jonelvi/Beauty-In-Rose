# Beauty in Rose - Frontend (React)

Versión 2 de la tienda: migrada a **React + Bootstrap**, con archivo de datos (CRUD), panel de administración y pruebas con **Jasmine y Karma**.

## Cómo correrlo

```bash
cd frontend
npm install
npm run dev     # abre la tienda en http://localhost:5173
npm test        # corre las pruebas con Karma + Jasmine
```

Para entrar como administrador: `admin@beautyinrose.cl` / `Admin1234`.

## Carpetas

- `src/components`: componentes reutilizables (tarjeta de producto, lista, buscador, filtros, carrito, etc.)
- `src/pages`: vistas de la tienda y `pages/admin` para el panel
- `src/context`: estado global (sesión, carrito y tienda)
- `src/data`: `baseDatos.js` con los datos y las funciones CRUD
- `src/utils`: validaciones, formato de precios y filtros
- `src/tests`: pruebas unitarias

## Pruebas

`npm test` ejecuta las pruebas en Chrome headless y genera el reporte de cobertura en `coverage/html/index.html`.
`node resumen-cobertura.cjs` muestra la cobertura por archivo en consola.

Los documentos de la entrega (ERS V2 y cobertura de testing) están en la carpeta `documentos` de la raíz del repositorio.

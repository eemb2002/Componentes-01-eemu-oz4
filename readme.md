## Link de NPMJS
https://www.npmjs.com/settings/eemb2002/packages
## Link de GitHab

# Stencil Component Starter

# Componente `serie-table`

El componente `serie-table` es un componente web reutilizable desarrollado con Stencil. Obtiene datos de la API de Rick and Morty y los muestra en un formato de tabla. Además, incluye un modal que muestra información detallada sobre un personaje al hacer clic en él.

## Características

- Obtiene y muestra datos de la API de Rick and Morty.
- Muestra una lista de personajes en una tabla con detalles como ID, Nombre, Especie, Género, Estado, Ubicación e Imagen.
- Permite a los usuarios hacer clic en el nombre o la imagen de un personaje para ver información detallada en un modal.
- El modal incluye una lista de episodios en los que el personaje ha aparecido.

## Instalación

1. Asegúrate de tener Stencil y sus dependencias instaladas. Si no lo tienes, sigue la [guía de instalación de Stencil](https://stenciljs.com/docs/getting-started).

2. Añade el componente `serie-table` a tu proyecto Stencil:

   ```sh
   npm install --save your-component-package-name

Importa y usa el componente en tu aplicación:
import { Component, h } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.css',
  shadow: true,
})
export class MyApp {
  render() {
    return (
      <div>
        <serie-table apiUrl="https://rickandmortyapi.com/api/character"></serie-table>
      </div>
    );
  }

}

## Propiedades
apiUrl (string): La URL del endpoint de la API de la que se obtendrán los datos. Por defecto, es https://rickandmortyapi.com/api/character.
Métodos
fetchData(): Obtiene datos de la URL de la API proporcionada, los procesa y llena la tabla.
showModal(character): Muestra un modal con información detallada sobre el personaje seleccionado.
closeModal(): Cierra el modal.
Uso
Añade el componente <serie-table> a tu HTML:

## html

<serie-table apiUrl="https://rickandmortyapi.com/api/character"></serie-table>

El componente obtendrá datos de la apiUrl proporcionada y los mostrará en una tabla. Al hacer clic en el nombre o la imagen de un personaje, se abrirá un modal que muestra más información detallada sobre el personaje, incluyendo una lista de episodios en los que ha aparecido.


import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'serie-table',
  styleUrl: 'serie-table.css',
  shadow: true,
})
export class SerieTable {
  // Propiedad para recibir la URL de la API
  @Prop() apiUrl: string = 'https://rickandmortyapi.com/api/character';
  @State() data: any[] = [];  // Estado para almacenar los datos de la API
  @State() error: string;  // Estado para manejar errores
  @State() selectedCharacter: any = null;  // Estado para manejar el modal
  async componentWillLoad() {
    await this.fetchData();
  }

  // Método para obtener datos de la API
  async fetchData() {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Error en la obtención de los datos');
      }
      const result = await response.json();
      // Agregar información de los episodios
      const characters = await Promise.all(result.results.map(async (character) => {
        const episodes = await Promise.all(character.episode.map(async (episodeUrl) => {
          const episodeResponse = await fetch(episodeUrl);
          if (!episodeResponse.ok) {
            throw new Error('Error al obtener los episodios');
          }
          return episodeResponse.json();
        }));
        return { ...character, episodes };
      }));
      this.data = characters;
    } catch (error) {
      this.error = error.message;
    }
  }

  // Método para mostrar el modal
  showModal(character) {
    this.selectedCharacter = character;
  }

  // Método para cerrar el modal
  closeModal() {
    this.selectedCharacter = null;
  }

  // Renderización de la tabla, el modal y el encabezado
  render() {
    if (this.error) {
      return <div>Error: {this.error}</div>;
    }

    if (this.data.length === 0) {
      return <div>Cargando datos...</div>;
    }

    return (
      <div>
        <header class="header">
          <h1>Personajes de Rick and Morty</h1>
          <p>Explora personajes del universo Rick y Morty y mira sus episodios.</p>
        </header>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Género</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {this.data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  <a href="#" onClick={() => this.showModal(item)}>{item.name}</a>
                </td>
                <td>{item.species}</td>
                <td>{item.gender}</td>
                <td>{item.status}</td>
                <td>{item.location.name}</td>
                <td>
                  <img src={item.image} alt={item.name} width="50" height="50" onClick={() => this.showModal(item)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.selectedCharacter && (
          <div class="modal">
            <div class="modal-content">
              <span class="close" onClick={() => this.closeModal()}>&times;</span>
              <h2>{this.selectedCharacter.name}</h2>
              <img src={this.selectedCharacter.image} alt={this.selectedCharacter.name} width="100" height="100" />
              <p><strong>Especie:</strong> {this.selectedCharacter.species}</p>
              <p><strong>Género:</strong> {this.selectedCharacter.gender}</p>
              <p><strong>Estado:</strong> {this.selectedCharacter.status}</p>
              <p><strong>Ubicación:</strong> {this.selectedCharacter.location.name}</p>
              <h3>Episodios:</h3>
              <ul>
                {this.selectedCharacter.episodes.map((episode: any) => (
                  <li key={episode.id}>
                    {episode.name} (Season {episode.episode.split('S')[1].split('E')[0]}, Episode {episode.episode.split('E')[1]})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

import { Mesa } from './Mesa';
import { Categoria } from './Categoria';
import { Juego } from './Juego';
import { Anotador } from './Anotador';

// Definir relaciones
Categoria.hasMany(Juego, { foreignKey: 'categoria_id', as: 'juegos' });
Juego.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

Mesa.hasMany(Anotador, { foreignKey: 'mesa_id', as: 'anotadores' });
Anotador.belongsTo(Mesa, { foreignKey: 'mesa_id', as: 'mesa' });

Juego.hasMany(Anotador, { foreignKey: 'juego_id', as: 'anotadores' });
Anotador.belongsTo(Juego, { foreignKey: 'juego_id', as: 'juego' });

export {
  Mesa,
  Categoria,
  Juego,
  Anotador
};

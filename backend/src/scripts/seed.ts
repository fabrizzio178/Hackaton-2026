import { sequelize } from '../config/database';
import { Mesa } from '../models/Mesa';
import { Mozo } from '../models/Mozo';
import { Juego } from '../models/Juego';
import { Producto } from '../models/Producto';
import { Sesion } from '../models/Sesion';
import { DetalleMesa } from '../models/DetalleMesa';

const seedDatabase = async () => {
  try {
    console.log('⏳ Iniciando proceso de poblado de la base de datos...');

    await sequelize.sync({ force: true });
    console.log('✅ Base de datos reiniciada y sincronizada correctamente.');

    console.log('🎲 Creando juegos...');
    const juegos = await Juego.bulkCreate([
      { nombre: 'Catan' },
      { nombre: 'Truco' },
      { nombre: 'Chinchón' },
      { nombre: 'Carcassonne' },
      { nombre: 'Dixit' }
    ], { returning: true });

    console.log('🤵 Creando mozos...');
    const mozos = await Mozo.bulkCreate([
      { nombre: 'Carlos', apellido: 'García' },
      { nombre: 'María', apellido: 'Fernández' },
      { nombre: 'Lionel', apellido: 'Messi' }
    ], { returning: true });

    console.log('🪑 Creando mesas...');
    const mesas = await Mesa.bulkCreate([
      { numero: 1, total: 0, ocupado: true, estado: 'JUGANDO' },
      { numero: 2, total: 0, ocupado: false, estado: 'LIBRE' },
      { numero: 3, total: 0, ocupado: true, estado: 'JUGANDO' },
      { numero: 4, total: 0, ocupado: false, estado: 'LIBRE' }
    ], { returning: true });

    console.log('🍻 Creando productos...');
    const productos = await Producto.bulkCreate([
      { nombre: 'Pinta IPA', precioUnitario: 3500, marca: 'Patagonia', descripcion: 'Cerveza artesanal IPA bien fría' },
      { nombre: 'Pinta Honey', precioUnitario: 3500, marca: 'Antares', descripcion: 'Cerveza artesanal Honey' },
      { nombre: 'Papas Cheddar', precioUnitario: 5000, descripcion: 'Porción grande de papas con cheddar y lluvia de panceta' },
      { nombre: 'Hamburguesa Completa', precioUnitario: 7500, descripcion: 'Doble carne, queso, lechuga, tomate y huevo' },
      { nombre: 'Alquiler Catan', precioUnitario: 2000, descripcion: 'Uso de juego Catan por sesión', idJuego: juegos[0].idJuego },
      { nombre: 'Alquiler Truco', precioUnitario: 500, descripcion: 'Mazo de cartas españolas', idJuego: juegos[1].idJuego }
    ], { returning: true });

    console.log('⏱️ Creando sesiones...');
    const sesiones = await Sesion.bulkCreate([
      { horaFechaInicio: new Date(), mesaId: mesas[0].id }, // Sesión en la mesa 1
      { horaFechaInicio: new Date(), mesaId: mesas[2].id }  // Sesión en la mesa 3
    ], { returning: true });

    console.log('📝 Creando detalles de mesa...');
    await DetalleMesa.bulkCreate([
      { cantidadItem: 2, monto: 7000, idSesion: sesiones[0].idSesion, idProducto: productos[0].idProducto }, // 2x Pinta IPA
      { cantidadItem: 1, monto: 5000, idSesion: sesiones[0].idSesion, idProducto: productos[2].idProducto }, // 1x Papas Cheddar
      { cantidadItem: 1, monto: 2000, idSesion: sesiones[0].idSesion, idProducto: productos[4].idProducto }, // 1x Alquiler Catan
      
      { cantidadItem: 4, monto: 14000, idSesion: sesiones[1].idSesion, idProducto: productos[1].idProducto }, // 4x Pinta Honey
      { cantidadItem: 1, monto: 500, idSesion: sesiones[1].idSesion, idProducto: productos[5].idProducto } // 1x Alquiler Truco
    ]);

    await mesas[0].update({ total: 7000 + 5000 + 2000 });
    await mesas[2].update({ total: 14000 + 500 });

    console.log('🎉 ¡Base de datos poblada exitosamente con datos iniciales! 🎮🍻');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error crítico al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();

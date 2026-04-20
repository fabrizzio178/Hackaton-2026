import { sequelize } from '../config/database';
import { Mesa } from '../models/Mesa';
import { Mozo } from '../models/Mozo';
import { Juego } from '../models/Juego';
import { Producto } from '../models/Producto';
import { Sesion } from '../models/Sesion';
import { DetalleMesa } from '../models/DetalleMesa';
import { Categoria } from '../models/Categoria';

const seedDatabase = async () => {
  try {
    console.log('⏳ Iniciando proceso de poblado de la base de datos...');

    await sequelize.sync({ force: true });
    console.log('✅ Base de datos reiniciada y sincronizada correctamente.');

    console.log('📦 Creando categorias...');
    const categorias = await Categoria.bulkCreate([
      { nombre: 'Entradas', descripcion: 'Para empezar', emoji: '🧆' },
      { nombre: 'Pizzas', descripcion: 'Nuestras pizzas', emoji: '🍕' },
      { nombre: 'Sándwiches', descripcion: 'Sándwiches especiales', emoji: '🍔' },
      { nombre: 'Bebidas', descripcion: 'Bebidas refrescantes', emoji: '🍺' },
      { nombre: 'Postres', descripcion: 'Para terminar', emoji: '🍰' }
    ], { returning: true });

    console.log('🎲 Creando juegos...');
    const juegos = await Juego.bulkCreate([
      { nombre: 'Truco', emoji: '🃏', soon: false },
      { nombre: 'Poker', emoji: '♠️', soon: false },
      { nombre: 'Ajedrez', emoji: '♟️', soon: false },
      { nombre: 'Juego 4', emoji: '🎲', soon: true },
      { nombre: 'Juego 5', emoji: '🎲', soon: true },
      { nombre: 'Juego 6', emoji: '🎲', soon: true },
      { nombre: 'Dados', emoji: '🎯', soon: false },
      { nombre: 'Sorteo', emoji: '🎰', soon: true }
    ], { returning: true });

    console.log('🤵 Creando mozos...');
    const mozos = await Mozo.bulkCreate([
      { nombre: 'Juan Jose', apellido: 'Alonso' },
      { nombre: 'Carlos', apellido: 'García' },
      { nombre: 'María', apellido: 'Fernández' }
    ], { returning: true });

    console.log('🪑 Creando mesas...');
    const mesas = await Mesa.bulkCreate([
      { numero: 10, total: 0, ocupado: true, estado: 'JUGANDO' },
      { numero: 1, total: 0, ocupado: false, estado: 'LIBRE' },
      { numero: 2, total: 0, ocupado: true, estado: 'JUGANDO' },
      { numero: 3, total: 0, ocupado: false, estado: 'LIBRE' }
    ], { returning: true });

    console.log('🍻 Creando productos...');
    const productos = await Producto.bulkCreate([
      // Entradas
      { nombre: 'Nachos con Cheddar', precioUnitario: 4500, descripcion: 'Nachos crocantes con cheddar fundido, jalapeños y crema agria', emoji: '🧀', idCategoria: categorias[0].id },
      { nombre: 'Empanadas (x3)', precioUnitario: 3800, descripcion: 'Empanadas de carne cortada a cuchillo', emoji: '🥟', idCategoria: categorias[0].id },
      { nombre: 'Papas Fritas', precioUnitario: 3200, descripcion: 'Papas fritas caseras con salsa especial de la casa', emoji: '🍟', idCategoria: categorias[0].id },
      { nombre: 'Tabla de Quesos', precioUnitario: 6500, descripcion: 'Selección de quesos con frutos secos y miel', emoji: '🧀', idCategoria: categorias[0].id },
      // Pizzas
      { nombre: 'Muzzarella', precioUnitario: 7000, descripcion: 'Pizza clásica con muzzarella y aceitunas', emoji: '🍕', idCategoria: categorias[1].id },
      { nombre: 'Napolitana', precioUnitario: 7500, descripcion: 'Muzzarella, tomate en rodajas y ajo', emoji: '🍅', idCategoria: categorias[1].id },
      { nombre: 'Fugazzeta', precioUnitario: 8000, descripcion: 'Rellena de muzzarella con cebolla caramelizada', emoji: '🧅', idCategoria: categorias[1].id },
      // Sandwiches
      { nombre: 'Hamburguesa Clásica', precioUnitario: 6500, descripcion: 'Carne 200g, cheddar, lechuga, tomate y aderezos', emoji: '🍔', idCategoria: categorias[2].id },
      { nombre: 'Lomito Completo', precioUnitario: 7500, descripcion: 'Lomo, jamón, queso, lechuga, tomate y huevo', emoji: '🥩', idCategoria: categorias[2].id },
      { nombre: 'Club Sándwich', precioUnitario: 5800, descripcion: 'Triple de pollo, panceta, queso, lechuga y mayo', emoji: '🥪', idCategoria: categorias[2].id },
      // Bebidas
      { nombre: 'Cerveza Artesanal', precioUnitario: 3500, descripcion: 'Pinta de cerveza artesanal del día (500ml)', emoji: '🍺', idCategoria: categorias[3].id },
      { nombre: 'Fernet con Coca', precioUnitario: 4000, descripcion: 'Fernet Branca con Coca-Cola', emoji: '🥃', idCategoria: categorias[3].id },
      { nombre: 'Gin Tonic', precioUnitario: 5500, descripcion: 'Gin con tónica, pepino y botánicos', emoji: '🍸', idCategoria: categorias[3].id },
      { nombre: 'Gaseosa', precioUnitario: 1800, descripcion: 'Coca-Cola, Sprite o Fanta (500ml)', emoji: '🥤', idCategoria: categorias[3].id },
      { nombre: 'Agua Mineral', precioUnitario: 1200, descripcion: 'Con o sin gas (500ml)', emoji: '💧', idCategoria: categorias[3].id },
      // Postres
      { nombre: 'Brownie con Helado', precioUnitario: 4200, descripcion: 'Brownie de chocolate con helado de vainilla', emoji: '🍫', idCategoria: categorias[4].id },
      { nombre: 'Flan Casero', precioUnitario: 3500, descripcion: 'Flan con dulce de leche y crema', emoji: '🍮', idCategoria: categorias[4].id },
      
      // Alquiler
      { nombre: 'Alquiler Truco', precioUnitario: 500, descripcion: 'Mazo de cartas españolas', emoji: '🃏', idJuego: juegos[0].idJuego }
    ], { returning: true });

    console.log('⏱️ Creando sesiones...');
    const sesiones = await Sesion.bulkCreate([
      { horaFechaInicio: new Date(), mesaId: mesas[0].id }, // Mesa 10
      { horaFechaInicio: new Date(), mesaId: mesas[2].id }  // Mesa 2
    ], { returning: true });

    console.log('📝 Creando detalles de mesa...');
    await DetalleMesa.bulkCreate([
      { cantidadItem: 2, monto: 7000, idSesion: sesiones[0].idSesion, idProducto: productos[10].idProducto }, // 2x Cerveza
      { cantidadItem: 1, monto: 4500, idSesion: sesiones[0].idSesion, idProducto: productos[0].idProducto },  // 1x Nachos
      
      { cantidadItem: 4, monto: 16000, idSesion: sesiones[1].idSesion, idProducto: productos[11].idProducto }, // 4x Fernet
      { cantidadItem: 1, monto: 500, idSesion: sesiones[1].idSesion, idProducto: productos[17].idProducto }    // 1x Truco
    ]);

    await mesas[0].update({ total: 7000 + 4500 });
    await mesas[2].update({ total: 16000 + 500 });

    console.log('🎉 ¡Base de datos poblada exitosamente con datos mapeados de la UI! 🎮🍻');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error crítico al poblar la base de datos:', error);
    process.exit(1);
  }
};

seedDatabase();

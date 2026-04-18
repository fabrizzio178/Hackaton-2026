import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Juego } from './Juego';

export interface ProductoAttributes {
  idProducto?: string;
  nombre: string;
  precioUnitario: number;
  marca?: string;
  descripcion?: string;
  idJuego?: string; // FK, opcional
}

export class Producto extends Model<ProductoAttributes> implements ProductoAttributes {
  public idProducto!: string;
  public nombre!: string;
  public precioUnitario!: number;
  public marca!: string;
  public descripcion!: string;
  public idJuego!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Producto.init(
  {
    idProducto: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precioUnitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    idJuego: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Juego,
        key: 'idJuego',
      },
    },
  },
  {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos',
    timestamps: true,
  }
);

Juego.hasMany(Producto, { foreignKey: 'idJuego', as: 'productos' });
Producto.belongsTo(Juego, { foreignKey: 'idJuego', as: 'juego' });

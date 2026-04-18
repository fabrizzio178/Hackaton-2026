import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Sesion } from './Sesion';
import { Producto } from './Producto';

export interface DetalleMesaAttributes {
  idItem?: string;
  cantidadItem: number;
  monto: number;
  idSesion: string;
  idProducto: string;
}

export class DetalleMesa extends Model<DetalleMesaAttributes> implements DetalleMesaAttributes {
  public idItem!: string;
  public cantidadItem!: number;
  public monto!: number;
  public idSesion!: string;
  public idProducto!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DetalleMesa.init(
  {
    idItem: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    cantidadItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    monto: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    idSesion: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Sesion,
        key: 'idSesion',
      },
    },
    idProducto: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Producto,
        key: 'idProducto',
      },
    },
  },
  {
    sequelize,
    modelName: 'DetalleMesa',
    tableName: 'detalles_mesa',
    timestamps: true,
  }
);

Sesion.hasMany(DetalleMesa, { foreignKey: 'idSesion', as: 'detalles' });
DetalleMesa.belongsTo(Sesion, { foreignKey: 'idSesion', as: 'sesion' });

Producto.hasMany(DetalleMesa, { foreignKey: 'idProducto', as: 'detalles' });
DetalleMesa.belongsTo(Producto, { foreignKey: 'idProducto', as: 'producto' });

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { Mesa } from './Mesa';

export interface SesionAttributes {
  idSesion?: string;
  horaFechaInicio: Date;
  horaFechaFin?: Date;
  mesaId?: string;
}

export class Sesion extends Model<SesionAttributes> implements SesionAttributes {
  public idSesion!: string;
  public horaFechaInicio!: Date;
  public horaFechaFin!: Date;
  public mesaId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sesion.init(
  {
    idSesion: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    horaFechaInicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    horaFechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    mesaId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Mesa,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Sesion',
    tableName: 'sesiones',
    timestamps: true,
  }
);

// Establecemos la relación 1 a 1: Una Mesa tiene UNA Sesión
Mesa.hasOne(Sesion, { foreignKey: 'mesaId', as: 'sesion' });
Sesion.belongsTo(Mesa, { foreignKey: 'mesaId', as: 'mesa' });

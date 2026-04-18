import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface MozoAttributes {
  id?: string;
  nombre: string;
  apellido: string;
}

export class Mozo extends Model<MozoAttributes> implements MozoAttributes {
  public id!: string;
  public nombre!: string;
  public apellido!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Mozo.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Mozo',
    tableName: 'mozos',
    timestamps: true,
  }
);

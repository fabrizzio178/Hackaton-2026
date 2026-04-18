import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Categoria } from './Categoria';

export interface JuegoAttributes {
  id: string;
  nombre: string;
  descripcion?: string;
  min_jugadores: number;
  max_jugadores: number;
  categoria_id?: string;
}

export type JuegoCreationAttributes = Optional<JuegoAttributes, 'id'>;

export class Juego extends Model<JuegoAttributes, JuegoCreationAttributes> implements JuegoAttributes {
  public id!: string;
  public nombre!: string;
  public descripcion!: string;
  public min_jugadores!: number;
  public max_jugadores!: number;
  public categoria_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Juego.init(
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
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    min_jugadores: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    max_jugadores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categorias',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Juego',
    tableName: 'juegos',
    timestamps: true,
  }
);

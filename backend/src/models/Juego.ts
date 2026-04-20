import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export interface JuegoAttributes {
  idJuego?: string;
  nombre: string;
  descripcion?: string;
  emoji?: string;
  soon?: boolean;
}

export type JuegoCreationAttributes = Optional<JuegoAttributes, 'idJuego'>;

export class Juego extends Model<JuegoAttributes, JuegoCreationAttributes> implements JuegoAttributes {
  public idJuego!: string;
  public nombre!: string;
  public descripcion!: string;
  public emoji!: string;
  public soon!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Juego.init(
  {
    idJuego: {
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
    emoji: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    soon: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Juego',
    tableName: 'juegos',
    timestamps: true,
  }
);

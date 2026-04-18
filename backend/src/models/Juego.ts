import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface JuegoAttributes {
  idJuego?: string;
  nombre: string;
}

export class Juego extends Model<JuegoAttributes> implements JuegoAttributes {
  public idJuego!: string;
  public nombre!: string;

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
  },
  {
    sequelize,
    modelName: 'Juego',
    tableName: 'juegos',
    timestamps: true,
  }
);

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import { Mesa } from './Mesa';
import { Juego } from './Juego';

export interface AnotadorAttributes {
  id: string;
  mesa_id: string;
  juego_id: string;
  puntajes: any;
  estado?: 'EN_CURSO' | 'FINALIZADO';
  ganador?: string;
}

export type AnotadorCreationAttributes = Optional<AnotadorAttributes, 'id'>;

export class Anotador extends Model<AnotadorAttributes, AnotadorCreationAttributes> implements AnotadorAttributes {
  public id!: string;
  public mesa_id!: string;
  public juego_id!: string;
  public puntajes!: any;
  public estado!: 'EN_CURSO' | 'FINALIZADO';
  public ganador!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Anotador.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    mesa_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'mesas',
        key: 'id',
      },
    },
    juego_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'juegos',
        key: 'id',
      },
    },
    puntajes: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
    },
    estado: {
      type: DataTypes.ENUM('EN_CURSO', 'FINALIZADO'),
      allowNull: false,
      defaultValue: 'EN_CURSO',
    },
    ganador: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Anotador',
    tableName: 'anotadores',
    timestamps: true,
  }
);

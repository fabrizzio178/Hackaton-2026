import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface MesaAttributes {
  id?: string;
  numero: number;
  token_sesion?: string;
  total?: number;
  ocupado?: boolean;
  codigo_seguridad?: string;
  estado?: 'LIBRE' | 'JUGANDO';
}

export class Mesa extends Model<MesaAttributes> implements MesaAttributes {
  public id!: string;
  public numero!: number;
  public token_sesion!: string;
  public total!: number;
  public ocupado!: boolean;
  public codigo_seguridad!: string;
  public estado!: 'LIBRE' | 'JUGANDO';

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Mesa.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token_sesion: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ocupado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    codigo_seguridad: {
      type: DataTypes.STRING(4),
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('LIBRE', 'JUGANDO'),
      defaultValue: 'LIBRE',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Mesa',
    tableName: 'mesas',
    timestamps: true,
  }
);

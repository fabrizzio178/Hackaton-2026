import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export interface MesaAttributes {
  id?: string;
  numero: number;
  total?: number;
  ocupado?: boolean;
  estado?: 'LIBRE' | 'JUGANDO';
}

export class Mesa extends Model<MesaAttributes> implements MesaAttributes {
  public id!: string;
  public numero!: number;
  public total!: number;
  public ocupado!: boolean;
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
    total: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ocupado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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

import { DataTypes, Model } from "sequelize"
import { sequelize } from "./index"

export class Config extends Model {
  public id!: number
  public key!: string
  public value!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Config.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Config",
    tableName: "configs",
  },
)

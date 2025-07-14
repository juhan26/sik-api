import { DataTypes, Model } from 'sequelize';
import sequelize from './index';

class User extends Model {
  public id!: number;
  public nama!: string;
  // Tambahkan field lain sesuai kebutuhan
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Tambahkan field lain sesuai kebutuhan
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users', // sesuaikan dengan nama tabel di DB
  timestamps: false, // ubah jika tabel ada created_at/updated_at
});

export default User; 
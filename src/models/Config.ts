import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

interface ConfigAttributes {
  id: number;
  nama_desa: string;
  kode_desa: string;
  nama_kepala_desa: string;
  nip_kepala_desa?: string;
  phone_kepala_desa?: string;
  kode_pos: string;
  nama_kecamatan: string;
  kode_kecamatan: string;
  nama_kepala_camat: string;
  nip_kepala_camat?: string;
  nama_kabupaten: string;
  kode_kabupaten: string;
  kode_propinsi: string;
  logo?: string;
  ttd?: string;
  banner?: string;
  lat?: string;
  lng?: string;
  path?: string;
  alamat_kantor?: string;
  email_desa?: string;
  telepon?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  updated_by?: number;
}

interface ConfigCreationAttributes extends Optional<ConfigAttributes, 'id'> {}

class Config extends Model<ConfigAttributes, ConfigCreationAttributes> implements ConfigAttributes {
  public id!: number;
  public nama_desa!: string;
  public kode_desa!: string;
  public nama_kepala_desa!: string;
  public nip_kepala_desa?: string;
  public phone_kepala_desa?: string;
  public kode_pos!: string;
  public nama_kecamatan!: string;
  public kode_kecamatan!: string;
  public nama_kepala_camat!: string;
  public nip_kepala_camat?: string;
  public nama_kabupaten!: string;
  public kode_kabupaten!: string;
  public kode_propinsi!: string;
  public logo?: string;
  public ttd?: string;
  public banner?: string;
  public lat?: string;
  public lng?: string;
  public path?: string;
  public alamat_kantor?: string;
  public email_desa?: string;
  public telepon?: string;
  public website?: string;
  public facebook?: string;
  public instagram?: string;
  public twitter?: string;
  public youtube?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public deleted_at?: Date;
  public updated_by?: number;
}

Config.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nama_desa: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  kode_desa: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nama_kepala_desa: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nip_kepala_desa: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  phone_kepala_desa: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  kode_pos: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  nama_kecamatan: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  kode_kecamatan: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nama_kepala_camat: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  nip_kepala_camat: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  nama_kabupaten: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  kode_kabupaten: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  kode_propinsi: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  logo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  ttd: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  banner: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  lat: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  lng: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  path: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  alamat_kantor: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  email_desa: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  telepon: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  facebook: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  instagram: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  twitter: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  youtube: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Config',
  tableName: 'config',
  timestamps: false,
});

export default Config; 
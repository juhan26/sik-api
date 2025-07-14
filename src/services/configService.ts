import Config from '../models/Config';

export const getAllConfigs = async () => {
  return await Config.findAll();
};

export const getConfigById = async (id: number) => {
  return await Config.findByPk(id);
};

export const createConfig = async (data: any) => {
  return await Config.create(data);
};

export const updateConfig = async (id: number, data: any) => {
  const config = await Config.findByPk(id);
  if (!config) return null;
  return await config.update(data);
};

export const deleteConfig = async (id: number) => {
  const config = await Config.findByPk(id);
  if (!config) return null;
  await config.destroy();
  return true;
}; 
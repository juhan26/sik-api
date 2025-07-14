import { Request, Response } from 'express';
import * as configService from '../services/configService';

export const getAllConfigs = async (req: Request, res: Response) => {
  try {
    const configs = await configService.getAllConfigs();
    res.json(configs);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getConfigById = async (req: Request, res: Response) => {
  try {
    const config = await configService.getConfigById(Number(req.params.id));
    if (!config) return res.status(404).json({ error: 'Config not found' });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createConfig = async (req: Request, res: Response) => {
  try {
    const config = await configService.createConfig(req.body);
    res.status(201).json(config);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  try {
    const config = await configService.updateConfig(Number(req.params.id), req.body);
    if (!config) return res.status(404).json({ error: 'Config not found' });
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteConfig = async (req: Request, res: Response) => {
  try {
    const deleted = await configService.deleteConfig(Number(req.params.id));
    if (!deleted) return res.status(404).json({ error: 'Config not found' });
    res.json({ message: 'Config deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}; 
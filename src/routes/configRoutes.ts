import { Router } from 'express';
import { getAllConfigs, getConfigById, createConfig, updateConfig, deleteConfig } from '../controllers/configController';

const router = Router();

router.get('/', getAllConfigs);
router.get('/:id', getConfigById);
router.post('/', createConfig);
router.put('/:id', updateConfig);
router.delete('/:id', deleteConfig);

export default router; 
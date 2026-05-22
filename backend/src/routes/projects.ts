import express, { Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Projects
router.get('/', async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({ include: { members: true, tasks: true } });
  res.json(projects);
});

router.post('/', async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const project = await prisma.project.create({
    data: { name, description },
  });
  res.json(project);
});

// Tasks
router.get('/:projectId/tasks', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const tasks = await prisma.task.findMany({
    where: { projectId },
    include: { assignedTo: true },
  });
  res.json(tasks);
});

router.post('/:projectId/tasks', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { title, description, status, assignedToId } = req.body;
  const task = await prisma.task.create({
    data: { title, description, status, projectId, assignedToId },
  });
  res.json(task);
});

router.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const task = await prisma.task.update({ where: { id }, data });
  res.json(task);
});

export default router;

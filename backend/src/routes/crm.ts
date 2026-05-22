import express, { Request, Response } from 'express';
import { prisma } from '../index';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

// Leads
router.get('/leads', async (req: Request, res: Response) => {
  const leads = await prisma.lead.findMany({ include: { assignedTo: true } });
  res.json(leads);
});

router.post('/leads', async (req: Request, res: Response) => {
  const { name, email, phone, company, status, assignedToId } = req.body;
  const lead = await prisma.lead.create({
    data: { name, email, phone, company, status, assignedToId },
  });
  res.json(lead);
});

router.put('/leads/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const lead = await prisma.lead.update({ where: { id }, data });
  res.json(lead);
});

// Deals
router.get('/deals', async (req: Request, res: Response) => {
  const deals = await prisma.deal.findMany({ include: { assignedTo: true } });
  res.json(deals);
});

router.post('/deals', async (req: Request, res: Response) => {
  const { title, value, stage, assignedToId } = req.body;
  const deal = await prisma.deal.create({
    data: { title, value, stage, assignedToId },
  });
  res.json(deal);
});

router.put('/deals/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const deal = await prisma.deal.update({ where: { id }, data });
  res.json(deal);
});

export default router;

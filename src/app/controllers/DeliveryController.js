import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    const { id, name, email } = req.body;

    if (id !== req.userId) {
      return res.status(401).json({ error: 'Invalid id' });
    }

    const nameExists = await Courier.findOne({
      where: { id: req.userId, name },
    });

    if (!nameExists) {
      return res.status(401).json({ error: 'Invalid name' });
    }

    const emailExists = await Courier.findOne({
      where: { id: req.userId, email },
    });

    if (!emailExists) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    const orders = await Order.findAll({
      where: { deliveryman_id: req.userId },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
        'recipient_id',
        'deliveryman_id',
      ],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(orders);
  }
}

export default new DeliveryController();

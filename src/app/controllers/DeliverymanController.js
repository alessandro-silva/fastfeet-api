import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Courier from '../models/Courier';
import Order from '../models/Order';
import Recipient from '../models/Recipient';

import Mail from '../../lib/Mail';

class DeliverymanController {
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
      where: {
        deliveryman_id: req.userId,
        canceled_at: null,
        start_date: null,
      },
      attributes: ['id', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Courier,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (order.deliveryman_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to start this order." });
    }

    order.start_date = new Date();

    await order.save();

    return res.json(order);
  }

  async update(req, res) {
    const { signature_id } = req.body;

    const isDeliveryman = await Courier.findOne({
      where: { id: req.userId },
    });

    if (!isDeliveryman) {
      return res
        .status(401)
        .json({ error: 'this deliveryman does not exists' });
    }

    const order = await Order.findByPk(req.params.id);

    if (order.deliveryman_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to start this order." });
    }

    order.signature_id = signature_id;

    order.end_date = new Date();

    await order.save();

    return res.json(order);
  }

  async delete(req, res) {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'city'],
        },
        {
          model: Courier,
          as: 'deliveryman',
          attributes: ['name'],
        },
      ],
    });

    if (order.deliveryman_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel this order." });
    }

    order.canceled_at = new Date();

    await order.save();

    await Mail.sendMail({
      to: `${order.recipient.name} <${order.recipient.city}>`,
      subject: 'Encomenda cancelada',
      template: 'cancellation',
      context: {
        recipient: order.recipient.name,
        deliveryman: order.deliveryman.name,
        canceled: format(order.canceled_at, "'dia' dd 'de' MMMM', às' H:mm'h", {
          locale: pt,
        }),
      },
    });

    return res.json(order);
  }
}

export default new DeliverymanController();

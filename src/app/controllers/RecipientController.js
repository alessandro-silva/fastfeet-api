import User from '../models/User';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

class RecipientController {
  async index(req, res) {
    const IsAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!IsAdmin) {
      return res.status(401).json({ error: 'You are not administrador' });
    }

    const recipients = await Recipient.findAll();

    return res.json(recipients);
  }

  async store(req, res) {
    const IsAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!IsAdmin) {
      return res.status(401).json({ error: 'You are not administrador' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not administrador' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = req.body;

    const recipient = await Recipient.findByPk(id);

    await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async delete(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(401).json({ error: 'You are not administrador' });
    }

    const { id } = req.params;

    const order = await Order.findOne({
      where: { recipient_id: id },
    });

    if (order) {
      return res.status(401).json({ error: 'Recipient bound some order' });
    }

    const recipient = await Recipient.findByPk(id);

    recipient.destroy();

    return res.json(recipient);
  }
}

export default new RecipientController();

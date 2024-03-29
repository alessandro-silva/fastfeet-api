import User from '../models/User';
import Courier from '../models/Courier';
import File from '../models/File';
import Order from '../models/Order';

class CourierController {
  async index(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const couriers = await Courier.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(couriers);
  }

  async store(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const courierExists = await Courier.findOne({
      where: { email: req.body.email },
    });

    if (courierExists) {
      return res.status(401).json({ error: 'Deliveryman already exists' });
    }

    const avatarExists = await File.findOne({
      where: { id: req.body.avatar_id },
    });

    if (!avatarExists) {
      return res.status(401).json({ error: 'This avatar does not exist' });
    }

    const { id, name, avatar_id, email } = await Courier.create(req.body);

    return res.json(id, name, avatar_id, email);
  }

  async update(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: true },
    });

    if (!isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const { id, name, avatar_id, email } = req.body;

    const deliveryman = await Courier.findByPk(id);

    if (name && name !== deliveryman.name) {
      const nameExists = await Courier.findOne({
        where: { name },
      });

      if (nameExists) {
        return res.status(400).json({ error: 'This name already exists' });
      }
    }

    if (avatar_id && avatar_id !== deliveryman.avatar_id) {
      const avatarExists = await Courier.findOne({
        where: { avatar_id },
      });

      if (avatarExists) {
        return res.status(400).json({ error: 'This avatar already exists' });
      }
    }

    if (email && email !== deliveryman.email) {
      const emailExists = await Courier.findOne({
        where: { email },
      });

      if (emailExists) {
        return res.status(400).json({ error: 'This email already exists' });
      }
    }

    await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      avatar_id,
      email,
    });
  }

  async delete(req, res) {
    const isAdmin = await User.findOne({
      where: { id: req.userId, admin: false },
    });

    if (isAdmin) {
      return res.status(400).json({ error: 'You are not is administrador' });
    }

    const { id } = req.params;

    const deliveryman = await Courier.findByPk(id);

    const order = await Order.findOne({
      where: { deliveryman_id: id },
    });

    if (order) {
      return res.status(401).json({ error: 'Deliveryman bound some order' });
    }

    await deliveryman.destroy();

    return res.json(deliveryman);
  }
}

export default new CourierController();

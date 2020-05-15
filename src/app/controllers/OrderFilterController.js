import Recipient from '../models/Recipient';
import Courier from '../models/Courier';
import Order from '../models/Order';
import File from '../models/File';

const { Op } = require('sequelize');

class OrderFilterController {
  async index(req, res) {
    const { product } = req.query;

    const products = await Order.findAll({
      where: {
        product: {
          [Op.iLike]: product ? `%${product}%` : '%%',
        },
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
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
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(products);
  }
}

export default new OrderFilterController();

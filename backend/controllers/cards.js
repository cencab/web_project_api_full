const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Datos inválidos al crear la tarjeta');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        const error = new Error('No tienes permisos para borrar esta tarjeta');
        error.statusCode = 403;
        throw error;
      }

      return Card.findByIdAndDelete(req.params.cardId).then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Tarjeta no encontrada');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new Error('ID de tarjeta inválido');
        error.statusCode = 400;
        return next(error);
      }
      return next(err);
    });
};

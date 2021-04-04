exports.verifyPostBookRequest = (req, res, next) => {
  if (!req.body.name || !req.body.description || !req.body.count || !req.body.author) {
    const err = new Error('One or more required params missing.');
    err.status = 400;
    next(err);
  } else {
    if (typeof req.body.name === 'string' && typeof req.body.description === 'string' && typeof req.body.author === 'string' && typeof req.body.count === 'number') {
      next();
    } else {
      const err = new Error('One or more required params incorrect.');
      err.status = 400;
      next(err);
    }
  }
}

exports.verifyGetBookRequest = (req, res, next) => {
  if (!req.params.bookId) {
    const err = new Error('Required param "bookId" missing.');
    err.status = 400;
    next(err);
  } else {
    next();
  }
}

exports.verifyPutBookRequest = (req, res, next) => {
  if (!req.params.bookId || !req.body.name || !req.body.description || !req.body.count || !req.body.author) {
    const err = new Error('One or more required params missing.');
    err.status = 400;
    next(err);
  } else {
    if (typeof req.body.name === 'string' && typeof req.body.description === 'string' && typeof req.body.author === 'string' && typeof req.body.count === 'number') {
      next();
    } else {
      const err = new Error('One or more required params incorrect.');
      err.status = 400;
      next(err);
    }
  }
}

exports.verifyDeleteBookRequest = (req, res, next) => {
  if (!req.params.bookId) {
    const err = new Error('Required param "bookId" missing.');
    err.status = 400;
    next(err);
  } else {
    next();
  }
}

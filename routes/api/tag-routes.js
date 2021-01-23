const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    // which columns we want
    attributes: [
        'id', 
        'tag_name', 
    ],
    include: [
      {
        model: Product,
      attributes: ['product_name'],
      through: ProductTag,
      as: 'tagged_products'
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    // which columns we want
    attributes: [
        'id', 
        'tag_name', 
    ],
    include: [
      {
        model: Product,
      attributes: ['product_name'],
      through: ProductTag,
      as: 'tagged_products'
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
        res.status(404).json({ message: 'No category found with this id'});
        return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a tag by its `id` value
  Tag.update(req.body, {
    individualHooks: true,
    where: {
    id: req.params.id
  }
})
  .then(dbTagData => {
    if (!dbTagData[0]) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags, including its association to the product model
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one tag by id, including its association to the Product model
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Not tag found with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      product_id: req.body.product_id, // Unsure if product_id is the correct choice here, might need the tag id instead
    });

    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag by id
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,
    },
      {
        where: {
          id: req.params.id,
        },
      })

    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag by id
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const CategoryRepository = require('../repositories/CategoryRepository')

class CategoryController {
  async index(req, res) {
    const categories = await CategoryRepository.findAll()
    res.json(categories)
  }

  async store(req, res) {
    const { name } = req.body;

    if(!name){
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.create({ name })

    res.json(category)
  }

  async update(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    if(!name){
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.update(id, { name })

    res.json(category)
  }

  async delete(req, res) {
    const { id } = req.params;

    await CategoryRepository.delete(id);
    //No Content
    res.sendStatus(204);
  }

}

module.exports = new CategoryController();

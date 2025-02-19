const ContactsRepository = require('../repositories/ContactsRepository');
class ContactController {
  //Listar todos os registros
  async index (req, res){
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    res.json(contacts);
  }

  //Listar apenas um dos registros
  async show (req, res){
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if(!contact){
      //Not Found
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json(contact);
  }

  //Criar um registro
  async store(req, res){
    const { name, email, phone, category_id } = req.body;

    if(!name){
      return res.status(400).json({ error: 'Name is required' });
    }
    if(!email){
      return res.status(400).json({ error: 'Email is required' });
    }

    const contactExist = await ContactsRepository.findByEmail(email);

    if(contactExist){
      return res.status(400).json({ error: 'This email is already in use' });
    }

    const contact = await ContactsRepository.create({ name, email, phone, category_id })
    res.json(contact);
  }

  //Editar um registro
  async update(req, res){
    const { id } = req.params;
    const { name, email, phone, category_id } = req.body;

    const contactExist = await ContactsRepository.findById(id);

    if(!contactExist){
      return res.status(400).json({ error: 'Contact not found' });
    }

    if(!name){
      return res.status(400).json({ error: 'Name is required' });
    }
    if(!email){
      return res.status(400).json({ error: 'Email is required' });
    }

    const contactByEmail = await ContactsRepository.findByEmail(email);
    if(contactByEmail && contactByEmail.id !== id){
      return res.status(400).json({ error: 'This email is already in use' });
    }
    const contact = await ContactsRepository.update(id, { name, email, phone, category_id })

    res.json(contact);
  }

  //Deletar um registro
  async delete(req, res){
    const { id } = req.params;

    await ContactsRepository.delete(id);
    //No Content
    res.sendStatus(204);
  }

}

//Singleton
module.exports = new ContactController();

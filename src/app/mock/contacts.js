const { v4 } = require('uuid');

module.exports = [
  {
    id: v4(),
    name: 'João',
    email: 'V9l6b@example.com',
    phone: '999999999',
    category_id: v4()
  },
  {
    id: v4(),
    name: 'Pedro',
    email: 'V9l6b@example.com',
    phone: '999999999',
    category_id: v4()
  }
]

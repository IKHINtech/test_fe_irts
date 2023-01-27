import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Sarikhin',
    email: 'ikhin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Axel',
    email: 'axel@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users

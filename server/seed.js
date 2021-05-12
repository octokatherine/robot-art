const prisma = require('../prismaConnection')

const seedData = async () => {
  await prisma.user
    .create({
      data: {
        fullname: 'Admin',
        username: 'Admin',
        password: '$2b$10$oIYkfRhecEk9tYoa5fdS8eVgpDCAPlbrWV/QzpxyEqnVxzZsyM7bi',
        isAdmin: true,
      },
    })
    .catch((err) => console.log(err))
  console.log('Seeded admin user')

  process.exit()
}

seedData()

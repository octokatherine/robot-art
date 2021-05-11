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

  await prisma.robot
    .createMany({
      data: [
        { name: 'Rosie', image: 'https://robot-art.s3.amazonaws.com/rosie' },
        { name: 'Megazord', image: 'https://robot-art.s3.amazonaws.com/megazord' },
        { name: 'Wall-E', image: 'https://robot-art.s3.amazonaws.com/walle' },
        { name: 'Bender', image: 'https://robot-art.s3.amazonaws.com/Bender' },
        { name: 'Voltron', image: 'https://robot-art.s3.amazonaws.com/voltron' },
      ],
      skipDuplicates: true,
    })
    .catch((err) => console.log(err))
  console.log('Seeded robots')

  process.exit()
}

seedData()

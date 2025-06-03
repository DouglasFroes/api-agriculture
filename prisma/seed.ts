import { faker } from '@faker-js/faker';
import { PrismaClient, Producer, Property } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  const producers: Producer[] = [];
  for (let i = 0; i < 50; i++) {
    const producer = await prisma.producer.create({
      data: {
        cpfCnpj: faker.string.numeric({ length: 11 }),
        name: faker.person.fullName(),
      },
    });

    producers.push(producer);
  }

  const properties: Property[] = [];
  for (const producer of producers) {
    const numProperties = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < numProperties; i++) {
      const totalArea = faker.number.int({ min: 50, max: 1000 });
      const arableArea = faker.number.int({ min: 20, max: totalArea - 10 });
      const vegetationArea = totalArea - arableArea;
      const property = await prisma.property.create({
        data: {
          name: `Fazenda ${faker.word.adjective()} ${faker.word.noun()}`,
          city: faker.location.city(),
          state: faker.location.state({ abbreviated: true }),
          totalArea,
          arableArea,
          vegetationArea,
          producerId: producer.id,
        },
      });
      properties.push(property);
    }
  }

  const cropNames = [
    'Soja',
    'Milho',
    'Café',
    'Algodão',
    'Trigo',
    'Cana-de-açúcar',
    'Feijão',
    'Arroz',
  ];
  for (const property of properties) {
    const numCrops = faker.number.int({ min: 1, max: 4 });
    for (let i = 0; i < numCrops; i++) {
      await prisma.crop.create({
        data: {
          name: faker.helpers.arrayElement(cropNames),
          year: faker.number.int({ min: 2020, max: 2025 }),
          propertyId: property.id,
        },
      });
    }
  }

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

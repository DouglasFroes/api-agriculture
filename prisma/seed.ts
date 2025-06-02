import { faker } from '@faker-js/faker';
import { PrismaClient, Producer, Property } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Gera produtores
  const producers: Producer[] = [];
  for (let i = 0; i < 50; i++) {
    const isCpf = faker.datatype.boolean();
    const cpfCnpj = isCpf ? faker.string.numeric(11) : faker.string.numeric(14);
    producers.push(
      await prisma.producer.create({
        data: {
          cpfCnpj,
          name: faker.person.fullName(),
        },
      }),
    );
  }

  // Gera propriedades
  const properties: Property[] = [];
  for (let i = 0; i < 200; i++) {
    const producerIdx = Math.floor(Math.random() * producers.length);
    const producer = producers[producerIdx];
    const totalArea = faker.number.int({ min: 50, max: 1000 });
    const arableArea = faker.number.int({ min: 10, max: totalArea - 10 });
    const vegetationArea = totalArea - arableArea;
    const property = await prisma.property.create({
      data: {
        name: faker.company.name(),
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

  // Gera culturas
  const cropNames = [
    'Soja',
    'Milho',
    'Café',
    'Algodão',
    'Trigo',
    'Feijão',
    'Arroz',
  ];

  for (let i = 0; i < 500; i++) {
    const propertyIdx = Math.floor(Math.random() * properties.length);
    const property = properties[propertyIdx];
    await prisma.crop.create({
      data: {
        name: faker.helpers.arrayElement(cropNames),
        year: faker.number.int({ min: 2020, max: 2025 }),
        propertyId: property.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

import chalk from 'chalk';
import {QueryInterface} from 'sequelize';
import {pivotSeeds, seeds} from '../seeds';
import {Seeds} from '../seeds/Seeds';

module.exports = {
  up: async (queryInterface: QueryInterface, _Sequelize) => {
    try {
      console.log(chalk.yellow('initial.seeder:up - seed core tables'));
      await seedTables(queryInterface, seeds);

      console.log(chalk.yellow('initial.seeder:up - seed pivot tables'));
      await seedTables(queryInterface, pivotSeeds);

      console.log(chalk.yellow('initial.seeder:up - post seed updates'));
      await seedUpdates(queryInterface, seeds.concat(pivotSeeds));

      console.log(chalk.green('initial.seeder:up - success'));
    } catch (e) {
      console.log(chalk.red('initial.seeds:up - fail'));
      if (e.errors && e.original && e.sql) {
        console.log(
          '\n',
          chalk.red('ERROR: ' + e.errors && e.errors[0].message), '\n',
          chalk.yellow(e.original && e.original.sqlMessage), '\n',
          chalk.green(e.sql));
      } else {
        console.error(e);
      }
    }
  },

  down: async (queryInterface: QueryInterface, _Sequelize) => {
    try {
      await Promise.all(pivotSeeds.map(seed => queryInterface.bulkDelete(seed.tableName, undefined)));
      await Promise.all(seeds.map(seed => queryInterface.bulkDelete(seed.tableName, undefined)));
    } catch (e) {
      console.error(e);
    }
  },
};


async function seedTables(queryInterface: QueryInterface, seeds: Seeds[]) {
  for (let i = 0, seed; i < seeds.length; i++) {
    seed = seeds[i];
    const data = await seed.getData();
    console.log(seed.tableName, data.length);

    for (let i = 0, maxInserts = 5000; data.length > 0 && i * maxInserts < data.length; i++) {
      await queryInterface.bulkInsert(seed.tableName, data.slice(i * maxInserts, (i + 1) * maxInserts));
    }
  }
}


async function seedUpdates(queryInterface: QueryInterface, seeds: Seeds[]) {
  for (let i = 0, seed: Seeds; i < seeds.length; i++) {
    seed = seeds[i];
    for (let o = 0, update; o < seed.postSeedUpdates.length; o++) {
      update = seed.postSeedUpdates[o];
      if (update.where && update.data) {
        await queryInterface.bulkUpdate(seed.tableName, update.data, update.where);
      }
    }
  }
}

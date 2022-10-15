import chalk from 'chalk';
import {QueryInterface} from 'sequelize';
import {constraints, tables} from '../tables';

export async function up(queryInterface: QueryInterface, _Sequelize) {
  try {
    console.log(chalk.yellow('initial.migrations:up - create tables'));
    for (let i = 0, table; i < tables.length; i++) {
      table = tables[i];
      await queryInterface.createTable(table.name, table.fields, table.options);
    }

    console.log(chalk.yellow('initial.migrations:up - add constraints'));
    for (let i = 0, constraint; i < constraints.length; i++) {
      constraint = constraints[i];
      await queryInterface.addConstraint(constraint.tableName, constraint.options);
    }

    console.log(chalk.green('initial.migrations:up - success'));
  } catch (e) {
    console.log(chalk.red('initial.migrations:up - fail'));
    console.error(e);
  }
}

export async function down(queryInterface: QueryInterface, _Sequelize) {
  try {
    await queryInterface.dropAllTables();
  } catch (e) {
    console.error(e);
  }
}

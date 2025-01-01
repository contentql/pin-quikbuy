import * as migration_20250101_111849_init_migration from './20250101_111849_init_migration';

export const migrations = [
  {
    up: migration_20250101_111849_init_migration.up,
    down: migration_20250101_111849_init_migration.down,
    name: '20250101_111849_init_migration'
  },
];

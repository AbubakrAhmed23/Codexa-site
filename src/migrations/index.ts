import * as migration_20260603_233601_initial from './20260603_233601_initial';

export const migrations = [
  {
    up: migration_20260603_233601_initial.up,
    down: migration_20260603_233601_initial.down,
    name: '20260603_233601_initial'
  },
];

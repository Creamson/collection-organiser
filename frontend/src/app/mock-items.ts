import { Item } from './item';
import {BOOKS, MOVIES} from './mock-categories';

export const ITEMS: Item[] = [
  {id: 10, name: 'Locke', stars: 5, todo: false, category: BOOKS},
  { id: 11, name: 'Mr. Nice', stars: 3, todo: true, category: MOVIES},
  { id: 12, name: 'Narco', stars: 3, todo: false, category: BOOKS},
  { id: 13, name: 'Bombasto', stars: 3, todo: true, category: MOVIES },
  { id: 14, name: 'Celeritas', stars: 3, todo: true, category: MOVIES },
  { id: 15, name: 'Magneta', stars: 3, todo: false, category: MOVIES },
  { id: 16, name: 'RubberMan', stars: 3, todo: false, category: BOOKS },
  { id: 17, name: 'Dynama', stars: 3, todo: false, category: BOOKS },
  { id: 18, name: 'Dr IQ', stars: 3, todo: false, category: BOOKS },
  { id: 19, name: 'Magma', stars: 3, todo: false, category: BOOKS },
  { id: 20, name: 'Tornado', stars: 3, todo: false, category: BOOKS }
];


import {describe, expect, test} from '@jest/globals';

import {pagesRange} from './pagesRange';

describe('pagesRange function', () => { 
  test('should return array of numbers', () => {
    expect(pagesRange(1, 5)).toEqual([1, 2, 3, 4]);
  });
});
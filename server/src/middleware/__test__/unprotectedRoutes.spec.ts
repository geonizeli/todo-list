import { signInPath, createPath } from '../../controller/users.controller';
import { UNPROTECTED_ROUTES } from '../session.middleware'

describe('Unprotected Routes', () => {
  it('check content', () => {
    expect(UNPROTECTED_ROUTES.sort()).toEqual([createPath, signInPath].sort());
  })
})
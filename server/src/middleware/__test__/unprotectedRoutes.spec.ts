import {isRouteUnprotected} from '../session.middleware'
describe('isRouteUnprotected', () => {
  it('validate unprotected routes', () => {
    expect(isRouteUnprotected('/users')).toBeTruthy()
    expect(isRouteUnprotected('/users/sign_in')).toBeTruthy()
    expect(isRouteUnprotected('/users/sign_out')).toBeTruthy()
    expect(isRouteUnprotected('/projects')).toBeFalsy()
  })
})
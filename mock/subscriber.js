export default [
  {
    url: '/login',
    method: 'post',
    statusCode: 200,
    response: () => {
      return {
        flag: 0,
        data: 'MOCK_TOKEN',
        msg: null
      }
    }
  },
  {
    url: '/profile/info',
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        flag: 0,
        data: {
          sid: 'admin',
          nickname: 'Administrator',
          username: 'admin',
          params: {},
          perms: ['SUPER_ADMIN'],
          roles: [{ roleId: 'mock_role_1', roleName: 'Super Admin', menus: [], perms: ['SUPER_ADMIN'] }],
          source: 'MOCK'
        },
        msg: null
      }
    }
  }
]

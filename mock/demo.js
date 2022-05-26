export default [
  {
    url: `/demo/api`,
    method: 'get',
    statusCode: 200,
    response: () => {
      return {
        flag: 0,
        data: null,
        msg: 'Nothing is true, everything is permitted!'
      }
    }
  }
]

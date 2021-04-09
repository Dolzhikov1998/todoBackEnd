module.exports = {
  [process.env.NODE_ENV || 'development']: {
    'url': process.env.DATABASE_URL,
    'ssl': true,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'require': true,
        'rejectUnauthorized': false
      }
    }
  }
}

const { Redis } = require('ioredis');

const client = new Redis({
    host: '192.168.0.2',
    port: 6379,
  });

module.exports = client;
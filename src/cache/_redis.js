// @ts-nocheck
const redis = require("redis");
const { REDIS_PORT, SERVER_IP } = require("../config/config.default");
const redisStore = require("koa-redis");
const client = redis.createClient(REDIS_PORT, '127.0.0.1');
const options = { client: client, db: 1 };

const store = redisStore(options);

const setRedis = (key, val, timeout = 60 * 60) => {
  if (typeof val == "object") {
    //

    val = JSON.stringify(val);
  }

  client.set(key, val);

  client.expire(key, timeout);
};

const getRedis = (key) => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, val) => {
      if (err) {
        reject(err);

        return;
      }

      if (val == null) {
        resolve(null);

        return;
      }

      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });
};

module.exports = {
  store,
  setRedis,
  getRedis,
};

import redisClient from "./connection";

const methods = {
  addObject(key, obj): Promise<string> {
    return new Promise((resolve, reject) => {
      redisClient.set(key, JSON.stringify(obj), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Success");
        }
      });
    });
  },

  getObject(key): Promise<any> {
    return new Promise((resolve, reject) => {
      redisClient.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  },
};

export default methods;

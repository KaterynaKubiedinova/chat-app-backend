const redis = require('redis');

const initializeRedis = async () => {
	let redisClient = null;

	if (!redisClient) {
		redisClient = redis.createClient();
		redisClient.on('error', (err) => {
			console.error('Redis client error:', err);
		});
		await redisClient.connect();
		console.log('redis connected');
		return redisClient;
	}
};

module.exports = initializeRedis;
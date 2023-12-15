const redis = require('redis');

const initializeRedis = async () => {
	let redisClient = null;

	if (!redisClient) {
		redisClient = redis.createClient({
			password: '6KWQTIWyYmPJJFzaz4aD1rEtt6xOehVh',
			socket: {
				host: 'redis-17336.c55.eu-central-1-1.ec2.cloud.redislabs.com',
				port: 17336
			}
		});
		redisClient.on('error', (err) => {
			console.error('Redis client error:', err);
		});
		await redisClient.connect();
		console.log('redis connected');
		return redisClient;
	}
};

module.exports = initializeRedis;
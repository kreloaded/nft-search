const { Client } = require('@elastic/elasticsearch');

// Configure Elasticsearch client
const client = new Client({ node: 'http://localhost:9200' }); // Use HTTPS if Elasticsearch uses SSL

module.exports = client;

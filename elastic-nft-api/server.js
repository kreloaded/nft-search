const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require('./elasticsearchClient');

const app = express();
const PORT = 5001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Health Check
app.get('/', (req, res) => {
    res.send('Elasticsearch API is running');
});

// Search Endpoint
app.post('/search', async (req, res) => {
    console.log('Request received with body: ', req.body);

    const { term } = req.body;

    console.log('term: -->', term);


    try {
        const response = await client.search({
            index: 'nfts', // Replace with your index name
            query: {
                multi_match: {
                    query: term,
                    fields: ['Name', 'Category', 'Website'], // Fields to search
                },
            },
        });

        res.json(response.hits.hits); // Return search results
    } catch (error) {
        console.error('Error performing search:', error);
        res.status(500).json({ error: 'Search failed' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

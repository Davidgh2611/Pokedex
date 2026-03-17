const axios = require('axios');

const evolutionController = {
    getEvolutionChain: async (req, res) => {
        const { id } = req.params;

        try {
            // 1. Get species data to find the evolution chain URL
            const speciesRes = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
            const chainUrl = speciesRes.data.evolution_chain.url;

            // 2. Get the actual evolution chain
            const chainRes = await axios.get(chainUrl);
            const chain = chainRes.data.chain;

            // 3. Flatten the chain into a simple linear/branching list with sprites
            const evolutions = [];

            const traverseChain = async (currentNode) => {
                const name = currentNode.species.name;
                const pokemonRes = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

                evolutions.push({
                    name,
                    id: pokemonRes.data.id,
                    image: pokemonRes.data.sprites.other['official-artwork'].front_default || pokemonRes.data.sprites.front_default,
                    types: pokemonRes.data.types.map(t => t.type.name)
                });

                if (currentNode.evolves_to.length > 0) {
                    for (const nextEvolution of currentNode.evolves_to) {
                        await traverseChain(nextEvolution);
                    }
                }
            };

            await traverseChain(chain);
            res.json(evolutions);

        } catch (error) {
            console.error('Evolution Error:', error.message);
            res.status(500).json({ error: 'Error al obtener la cadena de evolución' });
        }
    }
};

module.exports = evolutionController;

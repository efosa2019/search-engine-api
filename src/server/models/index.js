const { esclient, index, type } = require("../../elastic")

async function getNames(req) {
	const query = {
		query: {
			match: {
				name: {
					query: req.text,
					operator: "and",
					fuzziness: "auto",
				},
			},
		},
	}

	const {
		body: { hits },
	} = await esclient.search({
		from: req.page || 0,
		size: req.limit || 100,
		index: index,
		type: type,
		body: query,
	})

	const totalHits = hits.total.value
	const results = hits.hits.map((hit) => {
		return {
			id: hit._id,
			name: hit._source.name,
			position: hit._source.position,
			score: hit._score,
		}
	})

	return {
		totalHits,
		results,
	}
}

module.exports = {
	getNames,
}

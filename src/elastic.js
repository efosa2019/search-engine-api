const { Client } = require("@elastic/elasticsearch")
require("dotenv").config()
const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200"
const esclient = new Client({ node: elasticUrl })
const index = "names"
const type = "names"
/**
 * @function createIndex
 * @returns {void}
 * @description Creates an index in ElasticSearch.
 */
async function createIndex(index) {
	try {
		await esclient.indices.create({ index })
		console.log(`Created index ${index}`)
	} catch (err) {
		console.error(`An error occurred while creating the index ${index}:`)
		console.error(err)
	}
}
/**
 * @function setNamesMapping,
 * @returns {void}
 * @description Sets the names mapping to the database.
 */
async function setNamesMapping() {
	try {
		const schema = {
			name: {
				type: "text",
			},
			position: {
				type: "text",
			},
		}

		await esclient.indices.putMapping({
			index,
			type,
			include_type_name: true,
			body: {
				properties: schema,
			},
		})

		console.log("Names mapping created successfully")
	} catch (err) {
		console.error("An error occurred while setting the names mapping:")
		console.error(err)
	}
}
/**
 * @function checkConnection
 * @returns {Promise}
 * @description Checks if the client is connected to ElasticSearch
 */
function checkConnection() {
	return new Promise(async (resolve) => {
		console.log("Checking connection to ElasticSearch...")
		let isConnected = false
		while (!isConnected) {
			try {
				await esclient.cluster.health({})
				console.log("Successfully connected to ElasticSearch")
				isConnected = true
				// eslint-disable-next-line no-empty
			} catch (_) {}
		}
		resolve(true)
	})
}
module.exports = {
	esclient,
	setNamesMapping,
	checkConnection,
	createIndex,
	index,
	type,
}

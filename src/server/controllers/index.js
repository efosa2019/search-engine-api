const model = require("../models")

async function getNames(req, res) {
	const query = req.query
	if (!query.text) {
		res.status(422).json({
			error: true,
			data: "Missing required parameter: text",
		})
		return
	}
	try {
		const result = await model.getNames(req.query)
		res.json({ success: true, data: result })
	} catch (err) {
		res.status(500).json({ success: false, error: "Unknown error." })
	}
}

module.exports = {
	getNames,
}

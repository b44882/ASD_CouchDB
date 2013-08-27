function (doc) {
	if(doc._id.substr(0, 5) === "user:"){
		emit(doc._id.substr(9), {
			"id": doc._id,
			"rev" : doc._rev,
			"name": doc.name,
			"burn": doc.burn,
			"type": doc.type,
			"length": doc.length,
			"measure": doc.measure
		});
	}
}
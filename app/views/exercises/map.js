function (doc) {
	if(doc._id.substr(0, 9) === "exercise:"){
		emit(doc._id.substr(9), {
			"name": doc.name,
			"burn": doc.burn,
			"type": doc.type,
			"length": doc.length,
			"measure": doc.measure
		});
	}
}
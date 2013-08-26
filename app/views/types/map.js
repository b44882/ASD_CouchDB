function (doc) {
	if(doc._id.substr(0, 5) === "type:"){
		emit(doc._id.substr(9), {
			"name": doc.name
		});
	}
}
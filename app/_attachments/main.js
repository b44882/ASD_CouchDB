/*$(function(){*/

	$(document).on('pageinit', '#home', function(){
		$.couch.db("asd_couchdb").view("asd_project3/exercises", {
			success: function(data){
			$('#exlist').empty();
			$.each(data.rows, function(index, exercise){
				var item = (exercise.value || exercise.doc);
					$('<div data-role="collapsible">' +
					  '<h2>' + item.name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + item.burn + '</li>' +
					  '<li>' + "Type: " + item.type + '</li>' +
					  '<li>' + "Measurement: " + item.length + ' ' + item.measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			}
		});
	});
	
	$(document).on('pageinit', '#create', function(){
		var validate = function(key){
			console.log("Validate Var loaded.");
			if(key == 0){
				console.log("Key = 0");
				var id = Math.floor(Math.random()*10000000001);
			} else {
				console.log("Loading ID " + key);
				var id = key
				var value = localStorage.getItem(key);
				var obj = JSON.parse(value);
				$('#name').val(obj.name);
				$('#burn').val(obj.burn);
				$('#type').val(obj.type);
				$('#length').val(obj.length);
				$('#measure').val(obj.measure);
			};
	
			var myForm = $("#exeform");
			console.log("Form: " + myForm);
			
			myForm.validate({
				rules: {
					name: "required",
					burned: "required",
					type: "required",
					length: "required",
					measure: "required"
				},
				messages: {
					name: "",
					burned: "",
					type: "",
					length: "",
					measure: ""
				},
				invalidHandler: function(form, validator) {
					alert("There are empty fields.  Please fill all fields.");
				},
				submitHandler: function() {
					console.log("Submit successful.");
					var data = myForm.serializeArray();
					storeData(id, data);
					$('#name').val('');
					$('#burn').val('');
					$('#type').val('Cardio');
					$('#length').val('');
					$('#measure').val('');
					window.location = "index.html";
				}
			});
		}
	
		var storeData = function(id, data){
		console.log(data);
		var exercise       = {};
			exercise.name     = [data[0].value];
			exercise.burn     = [data[1].value];
			exercise.type     = [data[2].value];
			exercise.length   = [data[3].value];
			exercise.measure  = [data[4].value];
			localStorage.setItem(id, JSON.stringify(exercise));
			alert("Exercise Saved!");
		};
			var key = 0;
			validate(key);
	});
					
					


	/*var genList = function(){
		$("#storage").empty();
		for(var i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
				value  = localStorage.getItem(key)
				obj = JSON.parse(value);
					$('<div data-role="collapsible">' +
					  '<h2>' + obj.name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + obj.burn + '</li>' +
					  '<li>' + "Type: " + obj.type + '</li>' +
					  '<li>' + "Measurement: " + obj.length + ' ' + obj.measure +'</li>' +
					  '<li>' +'<a href="#" class="delete_ex" data-key="'+key+'">' + 'Delete Exercise' + '</a>' + '</li>' +
			  		  '<li>' + '<a href="#create" class="edit_ex" data-key="'+key+'">' + 'Edit Exercise' + '</a>' + '</li>' +
			  		  '</ul>' +
			  		  '</div>').appendTo("#storage");
				}
				$('#storage div').collapsible();
	}
	
	var validate = function(key){
		if(key == 0){
			var id = Math.floor(Math.random()*10000000001);
		} else {
			var id = key
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			$('#name').val(obj.name);
			$('#burn').val(obj.burn);
			$('#type').val(obj.type);
			$('#length').val(obj.length);
			$('#measure').val(obj.measure);
		};
		var myForm = $("#exeform");
		myForm.validate({
			rules: {
				name: "required",
				burned: "required",
				type: "required",
				length: "required",
				measure: "required"
			},
			messages: {
				name: "",
				burned: "",
				type: "",
				length: "",
				measure: ""
			},
			invalidHandler: function(form, validator) {
				alert("There are empty fields.  Please fill all fields.");
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
				storeData(id, data);
				$('#name').val('');
				$('#burn').val('');
				$('#type').val('Cardio');
				$('#length').val('');
				$('#measure').val('');
				window.location = "index.html";
			}
		});
	}
	
	genList();
	
	$("#get_json").on("click", function(){
		$("#exlist").empty();
		$('<h1> JSON Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: "data.json",
			type: "GET",
			dataType: "json",
			success: function(data){
				for(var i=0, j=data.exercise.length; i<j; i++){
					var name    = data.exercise[i].name;
					    burn    = data.exercise[i].burn;
					    type    = data.exercise[i].type;
					    length  = data.exercise[i].length;
					    measure = data.exercise[i].measure;
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				}
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	
	});
	
	$("#get_xml").on("click", function(){
		$("#exlist").empty();
		$('<h1> XML Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: "data.xml",
			type: "GET",
			dataType: "xml",
			success: function(data){
				$(data).find("exercise").each(function() {
					var name    = $(this).find('name').text()
					    burn    = $(this).find('burned').text()
					    type    = $(this).find('type').text()
					    length  = $(this).find('length').text()
					    measure = $(this).find('measure').text()
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#get_couch").on("click", function(){
		$("#exlist").empty();
		$('<h1> Couch Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: '/asd_couchdb/_all_docs?include_docs=true&start_key="exercise:"&end_key="exercise:zzzz"',
			dataType: "json",
			success: function(data){
				$.each(data.rows, function(index, exercise){
					var name    = exercise.doc.name;
					    burn    = exercise.doc.burn;
					    type    = exercise.doc.type;
					    length  = exercise.doc.length;
					    measure = exercise.doc.measure;
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#get_couch_cardio").on("click", function(){
		$("#exlist").empty();
		$('<h1> Couch Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: '/asd_couchdb/_all_docs?include_docs=true&start_key="exercise:cardio:"&end_key="exercise:cardio:zzzz"',
			dataType: "json",
			success: function(data){
				$.each(data.rows, function(index, exercise){
					var name    = exercise.doc.name;
					    burn    = exercise.doc.burn;
					    type    = exercise.doc.type;
					    length  = exercise.doc.length;
					    measure = exercise.doc.measure;
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#get_couch_arms").on("click", function(){
		$("#exlist").empty();
		$('<h1> Couch Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: '/asd_couchdb/_all_docs?include_docs=true&start_key="exercise:arms:"&end_key="exercise:arms:zzzz"',
			dataType: "json",
			success: function(data){
				$.each(data.rows, function(index, exercise){
					var name    = exercise.doc.name;
					    burn    = exercise.doc.burn;
					    type    = exercise.doc.type;
					    length  = exercise.doc.length;
					    measure = exercise.doc.measure;
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#get_couch_core").on("click", function(){
		$("#exlist").empty();
		$('<h1> Couch Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: '/asd_couchdb/_all_docs?include_docs=true&start_key="exercise:core:"&end_key="exercise:core:zzzz"',
			dataType: "json",
			success: function(data){
				$.each(data.rows, function(index, exercise){
					var name    = exercise.doc.name;
					    burn    = exercise.doc.burn;
					    type    = exercise.doc.type;
					    length  = exercise.doc.length;
					    measure = exercise.doc.measure;
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#get_couch_legs").on("click", function(){
		$("#exlist").empty();
		$('<h1> Couch Listing </h1>').appendTo("#exlist");
		$.ajax({
			url: '/asd_couchdb/_all_docs?include_docs=true&start_key="exercise:legs:"&end_key="exercise:legs:zzzz"',
			dataType: "json",
			success: function(data){
				$.each(data.rows, function(index, exercise){
					var name    = exercise.doc.name;
					    burn    = exercise.doc.burn;
					    type    = exercise.doc.type;
					    length  = exercise.doc.length;
					    measure = exercise.doc.measure;
					$('<div data-role="collapsible">' +
					  '<h2>' + name + '</h2>'+
					  '<ul>' +
					  '<li>' + "Burned: " + burn + '</li>' +
					  '<li>' + "Type: " + type + '</li>' +
					  '<li>' + "Measurement: " + length + ' ' + measure +'</li>' +
					  '</ul>' +
					  '</div>').appendTo("#exlist");
				});
				$('#exlist div').collapsible();
			},
			error: function(error, perror){
				console.log("Error:" + error + "\n" + "Parse Error: " + perror);
			}
		});
	});
	
	$("#clear_ls").on("click", function(){
		if(localStorage.length === 0){
			alert("There are no exercises in the database!");
		} else {
			if(confirm("This will CLEAR the database!!  Are you sure?")){
				localStorage.clear();
				alert("The exercise database has been cleared!");
				window.location.reload();
			}
		}
	});
	
	$(".delete_ex").on("click",function(){
		console.log(this.id);
		if(confirm("Are you sure you want to delete this exercise?")){
			var itemKey = $(this).data('key');
			localStorage.removeItem(itemKey);
			window.location.reload();
		}
	});
	
	$(".edit_ex").on("click", function(){
		var key = $(this).data('key');
		validate(key);
	});
	
	
	$('#create_exercise').on("click", function(){
		var key = 0;
		validate(key);
	});
	
		
	var storeData = function(id, data){
	console.log(data);
	var exercise       = {};
		exercise.name     = [data[0].value];
		exercise.burn     = [data[1].value];
		exercise.type     = [data[2].value];
		exercise.length   = [data[3].value];
		exercise.measure  = [data[4].value];
		localStorage.setItem(id, JSON.stringify(exercise));
		alert("Exercise Saved!");
	};
	

}); */




        
        	
    
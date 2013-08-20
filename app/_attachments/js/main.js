$(function(){

	var genList = function(){
		$("#storage").empty();
		for(var i=0, j=localStorage.length; i<j; i++){
			var key = localStorage.key(i);
				value  = localStorage.getItem(key)
				obj = JSON.parse(value);
			$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
			  '<h3 class="ui-li-heading">' + obj.name +'</h3>' +
			  '<p class="ui-li-desc">' + 'Calories Burned: ' + obj.burn + '</p>' +
			  '<p class="ui-li-desc">' + 'Type: ' + obj.type + '</p>' +
			  '<p class="ui-li-desc">' + 'Measurement: ' + obj.length + ' ' + obj.measure + '</p>' +
			  '<a href="#" class="delete_ex" data-key="'+key+'"> Delete Exercise </a>' + ' ' +
			  '<a href="#create" class="edit_ex" data-key="'+key+'"> Edit Exercise </a>').appendTo("#storage");
		}
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
			url: "js/data.json",
			type: "GET",
			dataType: "json",
			success: function(data){
				for(var i=0, j=data.exercise.length; i<j; i++){
					var obj = data.exercise[i];
					$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
					  '<h3 class="ui-li-heading">' + obj.name +'</h3>' +
					  '<p class="ui-li-desc">' + 'Calories Burned: ' + obj.burn + '</p>' +
					  '<p class="ui-li-desc">' + 'Type: ' + obj.type + '</p>' +
					  '<p class="ui-li-desc">' + 'Measurement: ' + obj.length + ' ' + obj.measure + '</p>' +
					  '</li>').appendTo("#exlist");
				}
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
			url: "js/data.xml",
			type: "GET",
			dataType: "xml",
			success: function(data){
				$(data).find("exercise").each(function() {
					$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
					  '<h3 class="ui-li-heading">' + $(this).find('name').text() +'</h3>' +
					  '<p class="ui-li-desc">' + 'Calories Burned: ' + $(this).find('burned').text() + '</p>' +
					  '<p class="ui-li-desc">' + 'Type: ' + $(this).find('type').text() + '</p>' +
					  '<p class="ui-li-desc">' + 'Measurement: ' + $(this).find('length').text() + ' ' + $(this).find('measure').text() + '</p>' +
					  '</li>').appendTo("#exlist");
				});
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
			url: "_view/exercises",
			dataType: "json",
			success: function(data){
				$.each(data.rows, function(index, exercise){
					var name = exercise.value.name;
					var burn = exercise.value.burn;
					var type = exercise.value.type;
					var length = exercise.value.length;
					var measure = exercise.value.measure;
					$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
					  '<h3 class="ui-li-heading">' + name +'</h3>' +
					  '<p class="ui-li-desc">' + 'Calories Burned: ' + burn + '</p>' +
					  '<p class="ui-li-desc">' + 'Type: ' + type + '</p>' +
					  '<p class="ui-li-desc">' + 'Measurement: ' + length + ' ' + measure + '</p>' +
					  '</li>').appendTo("#exlist");
				});
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
	

});




        
        	
    
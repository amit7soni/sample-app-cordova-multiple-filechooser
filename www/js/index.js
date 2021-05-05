/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
	var permissions = cordova.plugins.permissions;
	var filter = { 
	  "mime": "image/*", // text/plain, image/png, image/jpeg, audio/wav etc
	  "multiple": true // choose single or multiple files, default value false
	};

	var success = function(data){
	  if(data.length > 0){
	  	var _imgHtml = "",
	  		_count = data.length;

	  	for(i = 1; i <= _count; i++){
	  		var _img = "<img src='" + data[i-1] + "' />";
	  		_imgHtml+= _img;
	  		console.log(_count,i);
	  		if(_count == i){
	  			document.querySelector(".img-list").innerHTML = _imgHtml;
	  		}
	  	}
	  	
	  }
	}

	var failure = function(err){
	  console.log(err);
	}
    
    document.querySelector(".btn-open").addEventListener("click", function(){

    	permissions.checkPermission(permissions.READ_EXTERNAL_STORAGE, function(status){
    		console.log(status);
    		if(status.hasPermission){
    			window.MultipleFileChooser.select(filter, success, failure);
    		}
    		else{
    			permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE, function(action){
    				console.log(action);
    				if(action.hasPermission){
    					window.MultipleFileChooser.select(filter, success, failure);
    				}
    			}, function(err){
    				console.log("Error : " + err);
    			});
    		}
    	}, function(e){
    		alert("Error: " + e);
    	});

    });

}

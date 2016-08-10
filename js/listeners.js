// This file is where we handle all the motion responses
var loopers = document.getElementsByClassName('loop');
var allPaused = false;
var allMotion =[];
var initialState =[];
var standard =[];
var attempt=0
var dynamicAttempt=4;
var timer = document.getElementById("timer");
var newElement = document.createElement('p');
var counter = 0

function ready(){
	unbind();
	setTimer('ready',initialState)
}

function start(){	
	unbind();
	attempt = prompt("How many push up do you want to do this time?");
	setTimer('start',allMotion)
}

function tryOne(){
	unbind();
	setTimer('tryOne',standard)
	
}

function setTimer(state,stateArr){
	counter = 3
	var id;
	newElement.innerHTML = "Start in 3 sec"
	timer.parentNode.replaceChild(newElement, timer);
	id = setInterval(function() {
	    counter--;
	    if(counter < 0) {
	    	registerListeners(state,stateArr);
	    	newElement.parentNode.replaceChild(timer, newElement);
	        clearInterval(id);
	    } else {
	        newElement.innerHTML = "Start in " + counter.toString() + " sec";
	    }
	}, 1000);
}


function checkInitial(arr){
	var incorrect = 0;
	arr.forEach(function(position){
		if(initialState.indexOf(position)===-1) incorrect++;
	})
	if(incorrect<=1) return true;
	else return false;
}

function checkEveryMotion(arr){
	var incorrect =0;
	for(var i=0; i<arr.length; i++){
		if(initialState.indexOf(arr[i])!==-1) arr.splice(i,1);
		else if(standard.indexOf(arr[i])===-1||Math.abs(standard.indexOf(arr[i])-i)>1){
			incorrect++;
		}
	}
	if(incorrect<=1) return true;
	else return false;
}

//unbind all the censor
function unbind(state){
		$('.loop').unbind('motion');
		if(state==='ready'){
			return finish(initialState,state)
		}else if(state==='tryOne'){
			return finish(standard,state)
		}else if(state==='tryAgain'){
			alert('Please try again')
		}
}

function unbindAll(){
	$('.loop').unbind('motion');
}

function finish(arr,type){
	var name = prompt("Please enter your name");
	var obj = {arr:arr,name:name,type:type}
	$.ajax({
		url:'/',
		type:'POST',
		data: obj,
		success: function(){
            console.log('Saved!!!');
        }
	});
}

function registerListeners(state,arr){

	// consider using a debounce utility if you get too many consecutive events
	$(window).on('motion', function(ev, data){
		// console.log('detected motion at', new Date(), 'with data:', data);
		var spot = $(data.spot.el);
		spot.addClass('active');	
		setTimeout(function(){
			spot.removeClass('active');
		}, 1000);	
	});

	function sendToLoop(element, theRightOne) {
		if(state==='ready'){
			if (window[theRightOne]) return;
			if(arr.indexOf(theRightOne)!==-1) return;
				arr.push(theRightOne);			
				window[theRightOne] = true;
				if(arr.length>=4){
					unbind(state);
				}
				setTimeout(function() {
					window[theRightOne] = false;
				}, 1000);
		}else if(state==='tryOne'){
			if (window[theRightOne]) return;
			arr.push(theRightOne)
			if(arr.length>=7&&checkInitial(arr.slice(-initialState.length))){
				unbind(state);
			}else if(arr.length>15){
				console.log(arr);
				unbind('tryAgain')
				standard=[];
			}	
			window[theRightOne] = true;
			setTimeout(function() {
				window[theRightOne] = false;
			}, 1000);		
		}else if(state==='start'){
			timer.innerHTML = 'Great! '+ attempt + ' left!'
			if (window[theRightOne]) return;
			arr.push(theRightOne)
			if(arr.length>dynamicAttempt+10) {
				alert("Dont be lazy!");	
				unbindAll();
				setTimeout(function(){
					registerListeners(state,allMotion);
				},1500)	
				dynamicAttempt=arr.length;			
			}else if(arr.length>=(dynamicAttempt+5)&&checkInitial(arr.slice(-initialState.length))){
				if(dynamicAttempt===4||checkEveryMotion(arr.slice(dynamicAttempt))) {
					attempt--;
					if(attempt===0){
						timer.innerHTML = 'Congradulation! you finished!'
						alert('Count!! Congradulation you finished!');
						dynamicAttempt=4;
						allMotion=[];
						unbind(state);
					}else {
						timer.innerHTML = 'Great! '+ attempt + ' left!';
						alert('Great! '+ attempt + ' left!');
						unbindAll();
						setTimeout(function(){
							registerListeners(state,allMotion);
						},1500)	
					}

				}
				else {
					alert("Dont be lazy!")
					unbindAll();	
					setTimeout(function(){
						registerListeners(state,allMotion);
					},1500)	
				}	
				dynamicAttempt=arr.length;					
			}
			
			window[theRightOne] = true;
			setTimeout(function() {
				window[theRightOne] = false;
			}, 1000);
		}	
	}
		// examples for id usage (can use a class as well, if want multiple elements to respond)
		$('#one').bind('motion', function(){
			sendToLoop(this, 1);
		});


		$('#two').bind('motion', function(){
			sendToLoop(this, 2);
		});

		$('#three').bind('motion', function(){
			sendToLoop(this, 3);
		});

		$('#four').bind('motion', function(){
			sendToLoop(this, 4);
		});

		$('#five').bind('motion', function(){
			sendToLoop(this, 5);
		});

		$('#six').bind('motion', function(){
			sendToLoop(this, 6);
		});

		$('#seven').bind('motion', function(){
			sendToLoop(this, 7);
		});

		$('#eight').bind('motion', function(){
			sendToLoop(this, 8);
		});

		$('#nine').bind('motion', function(){
			sendToLoop(this, 9);
		});

		$('#ten').bind('motion', function(){
			sendToLoop(this, 10);
		});

		$('#eleven').bind('motion', function(){
			sendToLoop(this, 11);
		});

		$('#twelve').bind('motion', function(){
			sendToLoop(this, 12);
		});

		$('#thirteen').bind('motion', function(){
			sendToLoop(this, 13);
		});

		$('#fourteen').bind('motion', function(){
			sendToLoop(this, 14);
		});

		$('#fifteen').bind('motion', function(){
			sendToLoop(this, 15);
		});

		// $('#sixteen').bind('motion', function(){
		// 	sendToLoop(this, 16);
		// });

		// $('#seventeen').bind('motion', function(){
		// 	sendToLoop(this, 17);
		// });

		// $('#eighteen').bind('motion', function(){
		// 	sendToLoop(this, 18);
		// });

		// $('#nineteen').bind('motion', function(){
		// 	sendToLoop(this, 19);
		// });

		// $('#twenty').bind('motion', function(){
		// 	sendToLoop(this, 20);
		// });

		// $('#twentyOne').bind('motion', function(){
		// 	sendToLoop(this, 21);
		// });

		// $('#twentyTwo').bind('motion', function(){
		// 	sendToLoop(this, 22);
		// });

		// $('#twentyThree').bind('motion', function(){
		// 	sendToLoop(this, 23);
		// });

		// $('#twentyFour').bind('motion', function(){
		// 	sendToLoop(this, 24);
		// });

		// $('#twentyFifth').bind('motion', function(){
		// 	sendToLoop(this, 25);
		// });

		// $('#twentySix').bind('motion', function(){
		// 	sendToLoop(this, 26);
		// });

		// $('#twentySeven').bind('motion', function(){
		// 	sendToLoop(this, 27);
		// });

		// $('#twentyEight').bind('motion', function(){
		// 	sendToLoop(this, 28);
		// });

		// $('#twentyNine').bind('motion', function(){
		// 	sendToLoop(this, 29);
		// });

		// $('#thirty').bind('motion', function(){
		// 	sendToLoop(this, 30);
		// });

		// $('#thirtyOne').bind('motion', function(){
		// 	sendToLoop(this, 31);
		// });

		// $('#thirtyTwo').bind('motion', function(){
		// 	sendToLoop(this, 32);
		// });

		// $('#thirtyThree').bind('motion', function(){
		// 	sendToLoop(this, 33);
		// });

		// $('#thirtyFour').bind('motion', function(){
		// 	sendToLoop(this, 34);
		// });

		// $('#thirtyfifth').bind('motion', function(){
		// 	sendToLoop(this, 35);
		// });

		// $('#thirtySix').bind('motion', function(){
		// 	sendToLoop(this, 36);
		// });

		// $('#thirtySeven').bind('motion', function(){
		// 	sendToLoop(this, 37);
		// });

		// $('#thirtyEight').bind('motion', function(){
		// 	sendToLoop(this, 38);
		// });

		// $('#thirtyNine').bind('motion', function(){
		// 	sendToLoop(this, 39);
		// });

		// $('#fourty').bind('motion', function(){
		// 	sendToLoop(this, 40);
		// });

		// $('#fourtyOne').bind('motion', function(){
		// 	sendToLoop(this, 41);
		// });

		// $('#fourtyTwo').bind('motion', function(){
		// 	sendToLoop(this, 42);
		// });

		// $('#fourtyThree').bind('motion', function(){
		// 	sendToLoop(this, 43);
		// });

		// $('#fourtyFour').bind('motion', function(){
		// 	sendToLoop(this, 44);
		// });

		// $('#fourtyFifth').bind('motion', function(){
		// 	sendToLoop(this, 45);
		// });

		// $('#fourtySix').bind('motion', function(){
		// 	sendToLoop(this, 46);
		// });

		// $('#fourtySeven').bind('motion', function(){
		// 	sendToLoop(this, 47);
		// });

		// $('#fourtyEight').bind('motion', function(){
		// 	sendToLoop(this, 48);
		// });

		// $('#fourtyNine').bind('motion', function(){
		// 	sendToLoop(this, 49);
		// });
}

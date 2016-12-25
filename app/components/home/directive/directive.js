angular.module('home').directive('smartInput',smartInputFunction);

function smartInputFunction(){
	return{
		scope:{
			checkList:"=",
			// ngModel:"=",
		},
		restrict:'E',
		replace:'true',
		templateUrl:'./app/components/home/directive/template.html',
		link:function(scope,elem,attrs){
			if (attrs.highlight===undefined){
				attrs.highlight="#64FFDA";
			}
			
			if (attrs.normal===undefined){
				attrs.normal="#FFFFFF";
			}

			// scope.ngModel=scope.input;
			var oldList=[];
			
			//Watching for change in input box 
			scope.$watch('input',function(){
				var changeIndex=0;
				var popList=[]; //empty pop list declared
				scope.color=[];	//empty color list
				if(scope.input===undefined){
					scope.output=[];
					oldList=[""];
					console.log(oldList);	
				}
				else{
					scope.output=scope.input.split(" "); //spliting the input
				}

				for(var item in scope.output){	//Setting default colors
					if (scope.checkList.includes(scope.output[item])){
						scope.color[item]=attrs.highlight;
					}
					else{
						scope.color[item]=attrs.normal;
					}
				}
				
				// Find word number is being edited

				if(scope.output[scope.output.length-1]!==undefined){ 
					if(scope.output.length!=oldList.length){	// If a word has been added
						changeIndex=0;
						console.log(scope.output+"  "+oldList);
						for(var i=scope.output.length-1;i>0;i--){
							if(scope.output[i]!=oldList[i-1]){
								changeIndex=i;
								break;
							}
						}
						console.log("word added at "+i);
						oldList=scope.output;
					}
					else{								// If a word has been edited
						for(var i=scope.output.length-1;i>=0;i--){
							if(scope.output[i].length!=oldList[i].length){
								changeIndex=i;
								break;
							}
						}
						console.log("word number "+i+" changed");
						oldList=scope.output;
					}

					if(scope.output[changeIndex].length>=3){	//inititate if current word is greater than 3
						for(var item in scope.checkList){
							if(scope.checkList[item].indexOf(scope.output[changeIndex])!==-1){
								popList.push(scope.checkList[item]);	// Pop up with options of the matching words
								scope.color[changeIndex]=attrs.highlight;
							}
						}
					}
				}
				else{
					scope.color=[];
				}
				console.log(popList);
			});
		}
	};
}
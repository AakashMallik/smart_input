angular.module('home').directive('smartInput',smartInputFunction);

function smartInputFunction(){
	return{
		scope:{
			checkList:"=",
			ngModel:"=",
		},
		restrict:'AE',
		replace:'true',
		templateUrl:'./app/components/home/directive/template.html',
		link:function(scope,elem,attrs){
			if (attrs.highlight===undefined){
				attrs.highlight="#64FFDA";
			}
			
			if (attrs.normal===undefined) {
				attrs.normal="#FFFFFF";
			}

			scope.ngModel=scope.input;
			
			//Watching for change in input box 
			scope.$watch('input',function(){
				var popList=[]; //empty pop list declared
				scope.color=[];	//empty color list
				if(scope.input===undefined){
					scope.output=[];	
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
				
				if(scope.output[scope.output.length-1]!==undefined){ 
					if(scope.output[scope.output.length-1].length>=3){	//inititate if current word is greater than 3
						for(var item in scope.checkList){
							if(scope.checkList[item].indexOf(scope.output[scope.output.length-1])!==-1){
								popList.push(scope.checkList[item]);	// Pop up with options of the matching words
								scope.color[scope.output.length-1]=attrs.highlight;
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
function compare () {

    $.when(
        $.getJSON('compare/Astella_edit.json'), $.getJSON('compare/Astella_old.json'))
        .then(function (a,b) {

            function recursiveIteration(object) {
                for (var property in object) {
                    if (object.hasOwnProperty(property)) {
                        if (typeof object[property] == "object"){
                            recursiveIteration(object[property]);
                        }
                        //else{
                        //    //found a property which is not an object, check for your conditions here
                        //   //console.log(object[property]);
                        //}
                    }
                }
            }
            recursiveIteration(a, b);

            var arr3 = [];
            for (var i in a) {
                var shared = false;
                for (var j in b)
                    if (b[j].children == a[i].children) {
                        shared = true;
                        break;
                    }
                if (!shared) arr3.push(a[i])
            }
            arr3 = arr3.concat(b);
            console.log(arr3);
            //return arr3;
        })
                .then(function (data) {

                    var json = JSON.stringify(data);

                    var blob = new Blob([json], {type: "application/json"});
                    var url = URL.createObjectURL(blob);

                    var a = document.createElement('a');
                    a.download = "compare.json";
                    a.href = url;
                    a.textContent = "get compare";

                    var elem = document.getElementById('content').appendChild(a);
                    elem.style.visibility = 'visible';
                });
}
//
//
//////arr2 will be merged into arr1, arr1 will be extended as needed.
////
////var arr1 = [{name: "lang", value: "English"}, {name: "age", value: "18"}];
////var arr2 = [{name : "childs", value: '5'}, {name: "lang", value: "German"}];
////
////function mergeByProperty(arr1, arr2, prop) {
////    _.each(arr2, function(arr2obj) {
////        var arr1obj = _.find(arr1, function(arr1obj) {
////            return arr1obj[prop] === arr2obj[prop];
////        });
////
////        //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
////        arr1obj ? _.extend(arr1obj, arr2obj) : arr1.push(arr2obj);
////    });
////}
////
////mergeByProperty(arr1, arr2, 'name');
////
////console.log(arr1);
//////[{name: "lang", value: "German"}, {name: "age", value: "18"}, {name : "childs", value: '5'}]

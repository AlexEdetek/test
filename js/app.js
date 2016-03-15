var app = angular.module("app", ['ngAnimate', 'ui.bootstrap', 'jsTree.directive']);

app.controller("Main",function ($scope, $http, $window) {

    $scope.dnd = false;
    $scope.compare = function () {
        $scope.dnd = !$scope.dnd;
    };

    // ===== Begin Callback Functions for Tree =====

    $scope.callback = function (e, data) {
        // ===== Click event on node for Industry =====
        for (var i = 0; i < data.selected.length; i++) {

            var parentNodeId = data.instance.get_node(data.selected[i]).parent;
            var parentNodeText = data.instance.get_node(parentNodeId).text;
            var node = data.instance.get_node(data.selected[i]).text;
            console.log(node);

            if (node == "SDTM 3.1.1") {
                $('#table').bootstrapTable('refreshOptions', {
                    url: 'data/Astella_v1.json',
                    columns: [{
                        field: 'name',
                        title: 'name',
                        sortable: true

                    }, {
                        field: 'text',
                        title: 'text',
                        sortable: true
                    }, {
                        field: 'structure',
                        title: 'structure',
                        sortable: true
                    }, {
                        field: 'class',
                        title: 'class',
                        sortable: true
                    }, {
                        field: 'description',
                        title: 'description',
                        sortable: true
                    },
                        //    {
                        //    field: 'children',
                        //    title: 'description',
                        //    sortable: true
                        //
                        //},
                        {
                            field: 'Actions',
                            title: 'Item Operate',
                            align: 'center',
                            events: operateEvents,
                            formatter: operateFormatter
                        }
                    ]
                });
            }
            else if (node == "Events") {

                $('#table').bootstrapTable('refreshOptions', {
                    url: 'data-tree/events.json',
                    columns: [{
                        field: 'STUDY NAME',
                        title: 'STUDY',
                        sortable: true

                    }, {
                        field: 'SITE NAME',
                        title: 'SITE NAME',
                        sortable: true
                    }, {
                        field: 'PATIENT ID',
                        title: 'PATIENT ID',
                        sortable: true
                    }, {
                        field: 'STATUS',
                        title: 'STATUS',
                        sortable: true
                    }, {
                        field: 'EVENT TEXT',
                        title: 'EVENT TEXT',
                        sortable: true
                    }, {
                        field: 'TYPE',
                        title: 'TYPE',
                        sortable: true
                    }, {
                        field: 'PRIORITY',
                        title: 'PRIORITY',
                        sortable: true
                    }, {
                        field: 'OPENED ON',
                        title: 'OPENED ON',
                        sortable: true
                    }, {
                        field: 'Actions',
                        title: 'Item Operate',
                        align: 'center',
                        events: operateEvents,
                        formatter: operateFormatter
                    }
                    ]
                })
            }
            else if (node == "Standards") {
                load();
            }
            else if (node == "Workflows") {
                window.open('extensions/BPMN.html', '', 'resizable=1,scrollbars=1');
            }


            $('#tree').jstree({
                core: {
                    check_callback: true,
                    data: ["root 1", "root 2"]
                },

                'plugins': ['dnd']
            }).on("copy_node.jstree", function () {
                alert("copy_node fires");
            }).on("move_node.jstree", function () {
                alert("move_node fires");
            });

            $('.drag')
                .on('mousedown', function (e) {
                    return $.vakata.dnd.start(e, {
                        'jstree': true,
                        'obj': $(this),
                        'nodes': [{
                            id: true,
                            text: $(this).text()
                        }]
                    }, '<div id="jstree-dnd" class="jstree-default"><i class="jstree-icon jstree-er"></i>' + $(this).text() + '</div>');
                });
            $(document)
                .on('dnd_move.vakata', function (e, data) {
                    var t = $(data.event.target);
                    if (!t.closest('.jstree').length) {
                        if (t.closest('.drop').length) {
                            data.helper.find('.jstree-icon').removeClass('jstree-er').addClass('jstree-ok');
                        } else {
                            data.helper.find('.jstree-icon').removeClass('jstree-ok').addClass('jstree-er');
                        }
                    }
                })
                .on('dnd_stop.vakata', function (e, data) {
                    var t = $(data.event.target);
                    if (!t.closest('.jstree').length) {
                        if (t.closest('.drop').length) {
                            alert("foreign drop fires");
                            $(data.element).clone().appendTo(t.closest('.drop'));
                            // node data:
                            // if(data.data.jstree && data.data.origin) { console.log(data.data.origin.get_node(data.element); }
                        }
                    }
                });
        }
    };

    // ===== End Callback Functions for Tree =====

    // ===== Begin FileReader =====

    $scope.leftWindow = function readSingleLeftFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var leftcontent = e.target.result;
            displayLeftContents(leftcontent);
        };
        reader.readAsText(file);
    };
    function displayLeftContents(leftcontent) {

        $scope.leftContent = JSON.parse(leftcontent);
        $scope.$apply();

    }
    document.getElementById('left-input')
        .addEventListener('change', $scope.leftWindow, false);

    $scope.rightWindow = function readSingleRightFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function (e) {
            var rightcontent = e.target.result;
            displayRightContents(rightcontent)

        };
        reader.readAsText(file);
    };
    function displayRightContents(rightcontent) {

        $scope.rightContent = JSON.parse(rightcontent);
        $scope.$apply();

    }
    document.getElementById('right-input')
        .addEventListener('change', $scope.rightWindow, false);

    // ===== End FileReader =====

    // ===== Begin Comparing =====

    $scope.getResults = function () {
        $scope.result = deepDiffMapper.map($scope.leftContent, $scope.rightContent);
    };

    var deepDiffMapper = function () {
        return {
            VALUE_CREATED: 'green',
            VALUE_UPDATED: 'yellow',
            VALUE_DELETED: 'red',
            VALUE_UNCHANGED: 'blue',
            map: function(obj1, obj2) {
                if (this.isFunction(obj1) || this.isFunction(obj2)) {
                    throw 'Invalid argument. Function given, object expected.';
                }
                if (this.isValue(obj1) || this.isValue(obj2)) {

                    return {
                        level: this.compareValues(obj1, obj2),
                        text: obj1
                    };
                }

                var diff = {};
                for (var key in obj1) {
                    if (this.isFunction(obj1[key])) {
                        continue;
                    }

                    var value2 = undefined;
                    if ('undefined' != typeof(obj2[key])) {
                        value2 = obj2[key];
                    }

                    diff[key] = this.map(obj1[key], value2);
                }
                for (var key in obj2) {
                    if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
                        continue;
                    }

                    diff[key] = this.map(undefined, obj2[key]);
                }

                return diff;

            },
            compareValues:
                function(value1, value2) {
                if (value1 === value2) {
                        return this.VALUE_UNCHANGED;
                    }
                if ('undefined' == typeof(value1)) {
                    return this.VALUE_CREATED;
                }
                if ('undefined' == typeof(value2)) {
                    return this.VALUE_DELETED;
                }

                return this.VALUE_UPDATED;
            },
            isFunction: function(obj) {
                return 'function' == typeof(obj);
            },
            isValue: function(obj) {
                return ('object' != typeof(obj)) && ('array' != typeof(obj));
            }
        }
    }();

    // ===== End Comparing =====

    $scope.saveAs = function () {
        var saveName = prompt("Save file as...") + ".json";
        var saveData = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (data, fileName) {
                var json = JSON.stringify(data),
                    blob = new Blob([ json], {type: "octet/stream"}),
                    url = window.URL.createObjectURL(blob);
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());
        var data = $scope.result,
            fileName = saveName;
        saveData(data, fileName);
    };
});

app.controller('Datepicker', function ($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function() {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
});


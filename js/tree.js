var $clinical = $('#clinical');
$clinical.jstree({
    "core" : {
        "animation" : 0,
        "check_callback" : true,
        "themes" : {
            "stripes" : true,
            "responsive": true
        },
        'data' : {
            'url' : function (node) {
                return node.id === '#' ?
                    'data-tree/clinical.json' : 'data/clinical.json';
            },
            'data' : function (node) {
                return { 'id' : node.id };
            }
        }
    },
    "types" : {
        "#" : {
            "max_children" : 1,
            "max_depth" : 4,
            "valid_children" : ["root"]
        },
        "root" : {
            "icon" : "../icons/tree.png",
            "valid_children" : ["default"]
        },
        "default" : {
            "valid_children" : ["default","file"]
        },
        "file" : {
            "icon" : "glyphicon glyphicon-file",
            "valid_children" : []
        }
    },
    "plugins" : [
        "contextmenu", "dnd", "search",
        "state", "types", "wholerow"
    ]
});


//$('#tree').jstree({
//    'core' : {
//        'data' : {
//            'url': function (node) {
//                return node.id === '#' ?
//                    'ajax_roots.json' :
//                    'ajax_children.json';
//            },
//            'data': function (node) {
//                return {'id': node.id};
//            }
//        }    }
//    });

var $industry = $('#industry');
$industry.jstree({
    "core" : {
        "animation" : 0,
        "check_callback" : true,
        "themes" : {
            "dot": true,
            "stripes" : true,
            "responsive": false
        },
        //"json_data" : {
        //    "ajax" : {
        //        url : "http://localhost/WebstormProjects/edetek/data",
        //        type: "json"
        //    }
        //}
        'data' : {
            'url' : function (node) {
                return node.id === '#' ?
                    'data/industry.json' :
                    'data/Astellas_SDTM.json';
            },
            'data' : function (node) {
                return { 'id' : node.id };
                //console.log(node.id);
            }
        }
    },
    "types" : {
        "#" : {
            "max_children" : 5,
            "max_depth" : 5,
            "valid_children" : ["default"]
        },
        "root" : {
            "icon" : "../icons/tree.png",
            "valid_children" : ["default"]
        },
        "default" : {
            "valid_children" : ["default","file"]
        },
        "file" : {
            "icon" : "glyphicon glyphicon-file",
            "valid_children" : []
        }
    },
    "plugins" : [
        "contextmenu", "dnd", "search",
        "state", "types", "wholerow", "themes", "json_data", "ui"
    ]
});

$industry.on ('select_node.jstree', function (evt, data) {

        // ===== Click event on node =====
        for(var i = 0; i < data.selected.length; i++) {

            var parentNodeId = data.instance.get_node(data.selected[i]).parent;
            var parentNodeText = data.instance.get_node(parentNodeId).text;
            var node = data.instance.get_node(data.selected[i]).text;
            if (node == "SDTM 3.1.1"){

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
                        },{
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
                    })
            }
        }
    })
    .jstree();




var $study = $('#study');
$study.jstree({
    "core" : {
        "animation" : 0,
        "check_callback" : true,
        "themes" : {
            "stripes" : true,
            "responsive": true
        },
        'data' : {
            'url' : function (node) {
                return node.id === '#' ?
                    'data/study.json' : 'data/study.json';
            },
            'data' : function (node) {
                return { 'id' : node.id };
            }
        }
    },
    "types" : {
        "#" : {
            "max_children" : 1,
            "max_depth" : 4,
            "valid_children" : ["root"]
        },
        "root" : {
            "icon" : "../icons/tree.png",
            "valid_children" : ["default"]
        },
        "default" : {
            "valid_children" : ["default","file"]
        },
        "file" : {
            "icon" : "glyphicon glyphicon-file",
            "valid_children" : []
        }
    },
    "plugins" : [
        "contextmenu", "dnd", "search",
        "state", "types", "wholerow"
    ]
});


// ========

$study.on('select_node.jstree', function (evt, data) {
        // ===== Click event on node =====
        for(var i = 0; i < data.selected.length; i++) {
            var node = data.instance.get_node(data.selected[i]).text;
            if (node == "Events") {

                $('#table').bootstrapTable('refreshOptions', {
                    url: 'data/events.json',
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

            //else if (node == "Files") {
            //
            //    $('#table').bootstrapTable('refreshOptions', {
            //        url: 'compare/test.json',
            //        columns: [{
            //            field: 'text',
            //            title: 'STUDY',
            //            sortable: true
            //
            //        }, {
            //            field: 'children',
            //            title: 'SITE NAME',
            //            sortable: true
            //        }, {
            //            field: 'Actions',
            //            title: 'Item Operate',
            //            align: 'center',
            //            events: operateEvents,
            //            formatter: operateFormatter
            //        }
            //        ]
            //    })
            //}
        }
    })
    .jstree();

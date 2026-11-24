{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 2,
            "revision": 2,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 34.0, 126.0, 1130.0, 646.0 ],
        "boxes": [
            {
                "box": {
                    "id": "obj-188",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 2,
                    "outlettype": [ "", "" ],
                    "patching_rect": [ 315.0, 173.0, 77.0, 22.0 ],
                    "text": "route symbol"
                }
            },
            {
                "box": {
                    "coll_data": {
                        "count": 11,
                        "data": [
                            {
                                "key": 13,
                                "value": [ "return" ]
                            },
                            {
                                "key": 9,
                                "value": [ "tab" ]
                            },
                            {
                                "key": 27,
                                "value": [ "escape" ]
                            },
                            {
                                "key": 29,
                                "value": [ "left" ]
                            },
                            {
                                "key": 30,
                                "value": [ "right" ]
                            },
                            {
                                "key": 31,
                                "value": [ "up" ]
                            },
                            {
                                "key": 32,
                                "value": [ "down" ]
                            },
                            {
                                "key": 43,
                                "value": [ "adddevice" ]
                            },
                            {
                                "key": 45,
                                "value": [ "removedevice" ]
                            },
                            {
                                "key": 115,
                                "value": [ "save" ]
                            },
                            {
                                "key": 114,
                                "value": [ "recall" ]
                            }
                        ]
                    },
                    "id": "obj-185",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 4,
                    "outlettype": [ "", "", "", "" ],
                    "patching_rect": [ 314.0, 137.0, 115.0, 22.0 ],
                    "saved_object_attributes": {
                        "embed": 1,
                        "precision": 6
                    },
                    "text": "coll keymappings -1"
                }
            },
            {
                "box": {
                    "id": "obj-184",
                    "maxclass": "number",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "bang" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 314.0, 96.0, 50.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-172",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 178.0, 273.0, 160.0, 22.0 ],
                    "text": "\"device 1 added.\""
                }
            },
            {
                "box": {
                    "id": "obj-148",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 222.5, 145.0, 63.0, 22.0 ],
                    "text": "adddevice"
                }
            },
            {
                "box": {
                    "id": "obj-146",
                    "maxclass": "newobj",
                    "numinlets": 0,
                    "numoutlets": 0,
                    "patcher": {
                        "fileversion": 1,
                        "appversion": {
                            "major": 9,
                            "minor": 2,
                            "revision": 2,
                            "architecture": "x64",
                            "modernui": 1
                        },
                        "classnamespace": "box",
                        "rect": [ 0.0, 0.0, 1000.0, 780.0 ],
                        "boxes": [
                            {
                                "box": {
                                    "id": "obj-26",
                                    "maxclass": "message",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 353.0, 309.0, 37.0, 22.0 ],
                                    "text": "iclear"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-112",
                                    "maxclass": "message",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 213.0, 308.0, 41.0, 22.0 ],
                                    "text": "oclear"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-23",
                                    "maxclass": "newobj",
                                    "numinlets": 4,
                                    "numoutlets": 4,
                                    "outlettype": [ "", "", "", "" ],
                                    "patching_rect": [ 132.0, 273.0, 128.0, 22.0 ],
                                    "text": "route append clear set"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-22",
                                    "maxclass": "newobj",
                                    "numinlets": 4,
                                    "numoutlets": 4,
                                    "outlettype": [ "", "", "", "" ],
                                    "patching_rect": [ 276.0, 273.0, 128.0, 22.0 ],
                                    "text": "route append clear set"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-20",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "bang" ],
                                    "patching_rect": [ 50.0, 189.0, 67.0, 22.0 ],
                                    "text": "delay 1000"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-19",
                                    "maxclass": "message",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 50.0, 232.0, 40.0, 22.0 ],
                                    "text": "buildit"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-15",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "bang" ],
                                    "patching_rect": [ 174.0, 100.0, 58.0, 22.0 ],
                                    "text": "loadbang"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-114",
                                    "maxclass": "button",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "bang" ],
                                    "parameter_enable": 0,
                                    "patching_rect": [ 174.0, 140.0, 24.0, 24.0 ]
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-115",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 276.0, 309.0, 73.0, 22.0 ],
                                    "text": "prepend ilist"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-116",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 276.0, 232.0, 50.0, 22.0 ],
                                    "text": "midiinfo"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-117",
                                    "maxclass": "message",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 132.0, 189.0, 29.5, 22.0 ],
                                    "text": "1"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-118",
                                    "maxclass": "newobj",
                                    "numinlets": 1,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 132.0, 308.0, 77.0, 22.0 ],
                                    "text": "prepend olist"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-119",
                                    "maxclass": "message",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 276.0, 189.0, 64.0, 22.0 ],
                                    "text": "controllers"
                                }
                            },
                            {
                                "box": {
                                    "id": "obj-1",
                                    "maxclass": "newobj",
                                    "numinlets": 2,
                                    "numoutlets": 1,
                                    "outlettype": [ "" ],
                                    "patching_rect": [ 132.0, 232.0, 50.0, 22.0 ],
                                    "text": "midiinfo"
                                }
                            }
                        ],
                        "lines": [
                            {
                                "patchline": {
                                    "destination": [ "obj-23", 0 ],
                                    "source": [ "obj-1", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-117", 0 ],
                                    "order": 1,
                                    "source": [ "obj-114", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-119", 0 ],
                                    "order": 0,
                                    "source": [ "obj-114", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-20", 0 ],
                                    "order": 2,
                                    "source": [ "obj-114", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-22", 0 ],
                                    "source": [ "obj-116", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-1", 0 ],
                                    "source": [ "obj-117", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-116", 0 ],
                                    "source": [ "obj-119", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-114", 0 ],
                                    "source": [ "obj-15", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-19", 0 ],
                                    "source": [ "obj-20", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-115", 0 ],
                                    "source": [ "obj-22", 0 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-26", 0 ],
                                    "source": [ "obj-22", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-112", 0 ],
                                    "source": [ "obj-23", 1 ]
                                }
                            },
                            {
                                "patchline": {
                                    "destination": [ "obj-118", 0 ],
                                    "source": [ "obj-23", 0 ]
                                }
                            }
                        ]
                    },
                    "patching_rect": [ 127.75, 41.0, 59.0, 22.0 ],
                    "text": "p midishit"
                }
            },
            {
                "box": {
                    "id": "obj-129",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 170.0, 365.0, 214.0, 20.0 ],
                    "text": "return tab escape left right up down + -"
                }
            },
            {
                "box": {
                    "id": "obj-120",
                    "maxclass": "newobj",
                    "numinlets": 0,
                    "numoutlets": 4,
                    "outlettype": [ "int", "int", "int", "int" ],
                    "patching_rect": [ 314.0, 59.0, 50.5, 22.0 ],
                    "text": "key"
                }
            },
            {
                "box": {
                    "id": "obj-67",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 53.75, 213.0, 29.5, 22.0 ],
                    "text": "fb"
                }
            },
            {
                "box": {
                    "id": "obj-65",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "patching_rect": [ 53.75, 173.0, 56.0, 22.0 ],
                    "text": "freebang"
                }
            },
            {
                "box": {
                    "filename": "none",
                    "id": "obj-113",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 219.5, 213.0, 21.0, 22.0 ],
                    "saved_object_attributes": {
                        "embed": 1,
                        "parameter_enable": 0
                    },
                    "text": "v8",
                    "textfile": {
                        "text": "// multi midi testing\n// rld, 10.26\n\nvar thebs = []; // MIDItoSpeech config bpatcher things in the parent\n\nvar xi = 500;\nvar yi = 400;\nvar bw = 1020;\nvar bh = 30;\n\n\nvar moi = this.patcher; // the patcher\n\nfunction clear()\n{\n    // tail removal\n    for(let k = thebs.length-1;k>=0;k--)\n    {\n        moi.remove(thebs[k]);\n    }\n}\n\n\nfunction adddevice()\n{\n    let j = thebs.length;\n    thebs[j] = moi.newdefault(0, 0, \"bpatcher\");\n    thebs[j].setattr(\"name\", \"bconfig\");\n    thebs[j].rect = [xi, yi + (j*bh), xi+bw, yi+bh + (j*bh)];\n    thebs[j].varname = \"config\"+j;\n    outlet(0, \"device \" + j + \" added.\");    \n   \n}\n\nfunction fb() // it's [freebang], not [closebang]\n{\n    clear();\n}\n\nfunction anything(...args) // catch unmapped key\n{\n        post(\"unmapped: \" + this.messagename + \"\\n\");\n}",
                        "filename": "none",
                        "flags": 0,
                        "embed": 1,
                        "autowatch": 1
                    }
                }
            },
            {
                "box": {
                    "id": "obj-18",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 931.0, 378.0, 51.0, 20.0 ],
                    "text": "channel"
                }
            },
            {
                "box": {
                    "id": "obj-17",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 688.0, 378.0, 51.0, 20.0 ],
                    "text": "channel"
                }
            },
            {
                "box": {
                    "id": "obj-35",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 1431.0, 378.0, 57.0, 20.0 ],
                    "text": "slow rate"
                }
            },
            {
                "box": {
                    "id": "obj-34",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 1367.0, 378.0, 52.0, 20.0 ],
                    "text": "fast rate"
                }
            },
            {
                "box": {
                    "id": "obj-6",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 1180.0, 378.0, 41.0, 20.0 ],
                    "text": "voice"
                }
            },
            {
                "box": {
                    "id": "obj-25",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 1490.0, 378.0, 45.0, 20.0 ],
                    "text": "enable"
                }
            },
            {
                "box": {
                    "id": "obj-16",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 995.0, 378.0, 41.0, 20.0 ],
                    "text": "JSON"
                }
            },
            {
                "box": {
                    "id": "obj-14",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 749.0, 378.0, 80.0, 20.0 ],
                    "text": "output device"
                }
            },
            {
                "box": {
                    "id": "obj-8",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 504.0, 378.0, 73.0, 20.0 ],
                    "text": "input device"
                }
            },
            {
                "box": {
                    "id": "obj-13",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 1322.0, 267.0, 306.0, 22.0 ],
                    "text": "join"
                }
            },
            {
                "box": {
                    "id": "obj-12",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 1323.0, 173.0, 29.5, 22.0 ],
                    "text": "join"
                }
            },
            {
                "box": {
                    "id": "obj-11",
                    "maxclass": "newobj",
                    "numinlets": 7,
                    "numoutlets": 2,
                    "outlettype": [ "int", "" ],
                    "patching_rect": [ 1322.0, 215.0, 82.0, 22.0 ],
                    "text": "midiformat"
                }
            },
            {
                "box": {
                    "id": "obj-10",
                    "maxclass": "newobj",
                    "numinlets": 3,
                    "numoutlets": 2,
                    "outlettype": [ "float", "float" ],
                    "patching_rect": [ 1322.0, 141.0, 115.0, 22.0 ],
                    "text": "makenote 100 1000"
                }
            },
            {
                "box": {
                    "id": "obj-9",
                    "maxclass": "button",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1658.0, 24.0, 24.0, 24.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-7",
                    "items": [ "AU DLS Synth 1", ",", "Summit", ",", "Bass Station II", ",", "TEO-5", ",", "from Max 1", ",", "from Max 2" ],
                    "maxclass": "umenu",
                    "numinlets": 1,
                    "numoutlets": 3,
                    "outlettype": [ "int", "", "" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1656.0, 114.0, 169.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-4",
                    "maxclass": "newobj",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 1656.0, 65.0, 50.0, 22.0 ],
                    "text": "midiinfo"
                }
            },
            {
                "box": {
                    "id": "obj-3",
                    "maxclass": "kslider",
                    "numinlets": 2,
                    "numoutlets": 2,
                    "outlettype": [ "int", "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 1300.0, 46.0, 336.0, 53.0 ]
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-12", 1 ],
                    "source": [ "obj-10", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-12", 0 ],
                    "source": [ "obj-10", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-13", 0 ],
                    "source": [ "obj-11", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-172", 1 ],
                    "source": [ "obj-113", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-11", 0 ],
                    "source": [ "obj-12", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-184", 0 ],
                    "source": [ "obj-120", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-113", 0 ],
                    "source": [ "obj-148", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-185", 0 ],
                    "source": [ "obj-184", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-188", 0 ],
                    "source": [ "obj-185", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-113", 0 ],
                    "source": [ "obj-188", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-10", 0 ],
                    "source": [ "obj-3", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-7", 0 ],
                    "source": [ "obj-4", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-67", 0 ],
                    "source": [ "obj-65", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-113", 0 ],
                    "source": [ "obj-67", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-13", 1 ],
                    "source": [ "obj-7", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-4", 0 ],
                    "source": [ "obj-9", 0 ]
                }
            }
        ],
        "autosave": 0
    }
}
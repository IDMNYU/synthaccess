{
    "patcher": {
        "fileversion": 1,
        "appversion": {
            "major": 9,
            "minor": 2,
            "revision": 0,
            "architecture": "x64",
            "modernui": 1
        },
        "classnamespace": "box",
        "rect": [ 1050.0, 95.0, 602.0, 444.0 ],
        "boxes": [
            {
                "box": {
                    "id": "obj-21",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 431.0, 251.0, 154.0, 20.0 ],
                    "text": "^ only let last event through"
                }
            },
            {
                "box": {
                    "format": 6,
                    "id": "obj-18",
                    "maxclass": "flonum",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "bang" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 208.0, 313.0, 50.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-19",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 208.0, 350.0, 50.0, 22.0 ],
                    "text": "rate $1"
                }
            },
            {
                "box": {
                    "format": 6,
                    "id": "obj-16",
                    "maxclass": "flonum",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "bang" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 271.0, 313.0, 50.0, 22.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-11",
                    "maxclass": "dial",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 197.0, 167.0, 40.0, 40.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "dial4",
                            "parameter_modmode": 3,
                            "parameter_shortname": "dial4",
                            "parameter_type": 0
                        }
                    },
                    "varname": "dial4"
                }
            },
            {
                "box": {
                    "id": "obj-10",
                    "maxclass": "dial",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 146.0, 167.0, 40.0, 40.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "dial3",
                            "parameter_modmode": 3,
                            "parameter_shortname": "dial3",
                            "parameter_type": 0
                        }
                    },
                    "varname": "dial3"
                }
            },
            {
                "box": {
                    "id": "obj-8",
                    "maxclass": "dial",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 95.0, 167.0, 40.0, 40.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "dial2",
                            "parameter_modmode": 3,
                            "parameter_shortname": "dial2",
                            "parameter_type": 0
                        }
                    },
                    "varname": "dial2"
                }
            },
            {
                "box": {
                    "id": "obj-5",
                    "maxclass": "dial",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "float" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 44.0, 167.0, 40.0, 40.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "dial1",
                            "parameter_modmode": 3,
                            "parameter_shortname": "dial1",
                            "parameter_type": 0
                        }
                    },
                    "varname": "dial1"
                }
            },
            {
                "box": {
                    "id": "obj-12",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 403.0, 313.0, 88.0, 22.0 ],
                    "text": "prepend speak"
                }
            },
            {
                "box": {
                    "id": "obj-1",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 403.0, 222.0, 67.0, 22.0 ],
                    "text": "mousefilter"
                }
            },
            {
                "box": {
                    "color": [ 0.0, 0.5898008943, 1.0, 1.0 ],
                    "id": "obj-14",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "" ],
                    "patching_rect": [ 403.0, 403.0, 92.0, 22.0 ],
                    "text": "maxess.speech"
                }
            },
            {
                "box": {
                    "id": "obj-17",
                    "linecount": 3,
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 267.0, 222.0, 110.0, 49.0 ],
                    "text": "\"dial object dial3 has been set to 60\""
                }
            },
            {
                "box": {
                    "color": [ 1.0, 0.1491314173, 0.0, 1.0 ],
                    "filename": "none",
                    "id": "obj-9",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 403.0, 151.0, 68.33333333333331, 22.0 ],
                    "saved_object_attributes": {
                        "embed": 1,
                        "parameter_enable": 0
                    },
                    "text": "v8",
                    "textfile": {
                        "text": "outlets = 1;\n\n// array of callback functions listening to the UI objects.\n// when the named objects are changed, paramCallback() will run:\nconst listeners = [\n    new ParameterListener(\"dial1\", paramCallback),\n    new ParameterListener(\"dial2\", paramCallback),\n    new ParameterListener(\"dial3\", paramCallback),\n    new ParameterListener(\"dial4\", paramCallback),\n];\n\n// callback function for all objects:\nfunction paramCallback(data)\n{\n    let a = data.name;\n    let b = data.value;\n    let c = data.maxobject.maxclass;\n    \n    let outstr = c + \" object \" + a + \" has been set to \" + b;\n    \n    outlet(0, outstr);\n\n}\n\n",
                        "filename": "none",
                        "flags": 0,
                        "embed": 1,
                        "autowatch": 1
                    },
                    "varname": "v8_AA"
                }
            },
            {
                "box": {
                    "id": "obj-6",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 44.0, 137.0, 317.0, 20.0 ],
                    "text": "these sliders are called \"dial1\", \"dial2\", \"dial3\", and \"dial4\""
                }
            },
            {
                "box": {
                    "fontname": "Arial",
                    "id": "obj-2",
                    "linecount": 4,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 44.0, 28.0, 222.0, 60.0 ],
                    "text": "1 - download and install the MaxEss objects:\n\nhttps://www.if-tah.com/devices/maxess"
                }
            },
            {
                "box": {
                    "id": "obj-13",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 271.0, 350.0, 64.0, 22.0 ],
                    "text": "volume $1"
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-12", 0 ],
                    "source": [ "obj-1", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-14", 0 ],
                    "source": [ "obj-12", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-14", 0 ],
                    "source": [ "obj-13", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-13", 0 ],
                    "source": [ "obj-16", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-19", 0 ],
                    "source": [ "obj-18", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-14", 0 ],
                    "source": [ "obj-19", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-1", 0 ],
                    "order": 0,
                    "source": [ "obj-9", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-17", 1 ],
                    "order": 1,
                    "source": [ "obj-9", 0 ]
                }
            }
        ],
        "parameters": {
            "obj-10": [ "dial3", "dial3", 0 ],
            "obj-11": [ "dial4", "dial4", 0 ],
            "obj-5": [ "dial1", "dial1", 0 ],
            "obj-8": [ "dial2", "dial2", 0 ],
            "parameterbanks": {
                "0": {
                    "index": 0,
                    "name": "",
                    "parameters": [ "-", "-", "-", "-", "-", "-", "-", "-" ],
                    "buttons": [ "-", "-", "-", "-", "-", "-", "-", "-" ]
                }
            },
            "inherited_shortname": 1
        },
        "autosave": 0
    }
}
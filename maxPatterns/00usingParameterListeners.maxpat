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
        "rect": [ 976.0, 95.0, 596.0, 574.0 ],
        "boxes": [
            {
                "box": {
                    "id": "obj-13",
                    "maxclass": "toggle",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 0,
                    "patching_rect": [ 532.0, 148.0, 24.0, 24.0 ]
                }
            },
            {
                "box": {
                    "id": "obj-7",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 532.0, 185.0, 59.0, 22.0 ],
                    "text": "debug $1"
                }
            },
            {
                "box": {
                    "id": "obj-18",
                    "linecount": 5,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 388.0, 450.0, 150.0, 74.0 ],
                    "text": "< this button is called \"bbb\". Note its numerical behavior - instead of a \"bang\", it sends a quick 1 followed by a 0."
                }
            },
            {
                "box": {
                    "id": "obj-15",
                    "maxclass": "button",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "bang" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 355.0, 450.0, 24.0, 24.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_enum": [ "off", "on" ],
                            "parameter_longname": "bbb",
                            "parameter_mmax": 1,
                            "parameter_modmode": 0,
                            "parameter_shortname": "bbb",
                            "parameter_type": 2
                        }
                    },
                    "varname": "bbb"
                }
            },
            {
                "box": {
                    "id": "obj-11",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 151.0, 461.0, 150.0, 33.0 ],
                    "text": "< this multislider is called \"lotsofstuff\""
                }
            },
            {
                "box": {
                    "id": "obj-10",
                    "maxclass": "multislider",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 44.0, 450.0, 100.0, 69.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "lotsofstuff",
                            "parameter_modmode": 0,
                            "parameter_shortname": "lotsofstuff",
                            "parameter_type": 3
                        }
                    },
                    "size": 8,
                    "varname": "lotsofstuff"
                }
            },
            {
                "box": {
                    "id": "obj-5",
                    "linecount": 3,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 388.0, 392.0, 150.0, 47.0 ],
                    "text": "< this floating-point number box is called \"steve\""
                }
            },
            {
                "box": {
                    "format": 6,
                    "id": "obj-3",
                    "maxclass": "flonum",
                    "numinlets": 1,
                    "numoutlets": 2,
                    "outlettype": [ "", "bang" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 333.0, 391.0, 50.0, 22.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_invisible": 1,
                            "parameter_longname": "steve",
                            "parameter_modmode": 0,
                            "parameter_shortname": "steve",
                            "parameter_type": 3
                        }
                    },
                    "varname": "steve"
                }
            },
            {
                "box": {
                    "id": "obj-36",
                    "maxclass": "toggle",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "int" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 122.0, 390.0, 24.0, 24.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_enum": [ "off", "on" ],
                            "parameter_longname": "thetoggle",
                            "parameter_mmax": 1,
                            "parameter_modmode": 0,
                            "parameter_shortname": "thetoggle",
                            "parameter_type": 2
                        }
                    },
                    "varname": "thetoggle"
                }
            },
            {
                "box": {
                    "id": "obj-34",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 151.0, 390.0, 150.0, 33.0 ],
                    "text": "< this toggle box is called \"thetoggle\""
                }
            },
            {
                "box": {
                    "id": "obj-31",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 44.0, 351.0, 428.0, 20.0 ],
                    "text": "3 - you can use the same ParameterListener() for multiple objects in one script:"
                }
            },
            {
                "box": {
                    "id": "obj-29",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 311.0, 287.0, 84.0, 20.0 ],
                    "text": "object's class:"
                }
            },
            {
                "box": {
                    "id": "obj-27",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 229.0, 247.0, 142.0, 20.0 ],
                    "text": "object's output data type:"
                }
            },
            {
                "box": {
                    "id": "obj-26",
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 212.0, 202.0, 134.0, 20.0 ],
                    "text": "object's scripting name:"
                }
            },
            {
                "box": {
                    "id": "obj-21",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 397.0, 286.0, 110.0, 22.0 ],
                    "text": "toggle"
                }
            },
            {
                "box": {
                    "id": "obj-20",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 373.0, 246.0, 110.0, 22.0 ],
                    "text": "1"
                }
            },
            {
                "box": {
                    "id": "obj-17",
                    "maxclass": "message",
                    "numinlets": 2,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "patching_rect": [ 348.0, 201.0, 110.0, 22.0 ],
                    "text": "thetoggle"
                }
            },
            {
                "box": {
                    "color": [ 1.0, 0.1491314173, 0.0, 1.0 ],
                    "filename": "none",
                    "id": "obj-9",
                    "maxclass": "newobj",
                    "numinlets": 1,
                    "numoutlets": 3,
                    "outlettype": [ "", "", "" ],
                    "patching_rect": [ 439.0, 151.0, 68.33333333333331, 22.0 ],
                    "saved_object_attributes": {
                        "embed": 1,
                        "parameter_enable": 0
                    },
                    "text": "v8",
                    "textfile": {
                        "text": "outlets = 3;\n\nlet d = false;\n\n// array of callback functions listening to the UI objects.\n// when the named objects are changed, paramCallback() will run:\nconst listeners = [\n    new ParameterListener(\"theslider\", paramCallback),\n    new ParameterListener(\"thetoggle\", paramCallback),\n    new ParameterListener(\"steve\", paramCallback),\n    new ParameterListener(\"lotsofstuff\", paramCallback),\n    new ParameterListener(\"bbb\", paramCallback)\n];\n\n// callback function for all objects:\nfunction paramCallback(data)\n{\n    if(d) console.log(data); // print the entire callback JSON to the Max window\n    outlet(2, data.maxobject.maxclass); // what kind of (Max) object is it?\n    outlet(1, data.value); // what's its value?\n    outlet(0, data.name); // what is the object's scripting name\n}\n\n// debugger:\nfunction debug(_v)\n{\n    d = _v>0;\n}\n\n",
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
                    "id": "obj-8",
                    "linecount": 8,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 345.0, 28.0, 228.0, 114.0 ],
                    "text": "2 - create a ParameterListener() in a [v8] script, bound to a callback function. The function will be able to access a variety of things about the object, including its name, value, and Object class. Turn on 'debug' and look in the Max window to see the entire JSON payload that's returned by the callback."
                }
            },
            {
                "box": {
                    "id": "obj-6",
                    "linecount": 2,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 102.0, 146.0, 120.0, 33.0 ],
                    "text": "< this slider is called \"theslider\""
                }
            },
            {
                "box": {
                    "id": "obj-4",
                    "maxclass": "slider",
                    "numinlets": 1,
                    "numoutlets": 1,
                    "outlettype": [ "" ],
                    "parameter_enable": 1,
                    "patching_rect": [ 70.0, 126.0, 20.0, 140.0 ],
                    "saved_attribute_attributes": {
                        "valueof": {
                            "parameter_longname": "theslider",
                            "parameter_modmode": 3,
                            "parameter_shortname": "theslider",
                            "parameter_type": 0
                        }
                    },
                    "varname": "theslider"
                }
            },
            {
                "box": {
                    "fontname": "Arial",
                    "id": "obj-2",
                    "linecount": 5,
                    "maxclass": "comment",
                    "numinlets": 1,
                    "numoutlets": 0,
                    "patching_rect": [ 44.0, 28.0, 155.0, 74.0 ],
                    "text": "1 - in its Inspector, give a Max UI object a scripting name (under Name), and enable \"Parameter Mode Enable\" (under Parameter)."
                }
            }
        ],
        "lines": [
            {
                "patchline": {
                    "destination": [ "obj-7", 0 ],
                    "source": [ "obj-13", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-9", 0 ],
                    "midpoints": [ 541.5, 217.0, 520.87890625, 217.0, 520.87890625, 141.0, 448.5, 141.0 ],
                    "source": [ "obj-7", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-17", 1 ],
                    "source": [ "obj-9", 0 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-20", 1 ],
                    "source": [ "obj-9", 1 ]
                }
            },
            {
                "patchline": {
                    "destination": [ "obj-21", 1 ],
                    "source": [ "obj-9", 2 ]
                }
            }
        ],
        "parameters": {
            "obj-10": [ "lotsofstuff", "lotsofstuff", 0 ],
            "obj-15": [ "bbb", "bbb", 0 ],
            "obj-3": [ "steve", "steve", 0 ],
            "obj-36": [ "thetoggle", "thetoggle", 0 ],
            "obj-4": [ "theslider", "theslider", 0 ],
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
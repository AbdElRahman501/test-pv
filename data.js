const panels = [
    {
        "dimensions": {
            "width": 992,
            "height": 1645,
            "depth": 35
        },
        "_id": "641a84d69b85d80f40b79a92",
        "name": "OSP60-275W",
        "manufacturer": "OSP60-275W",
        "model": "OSP60-275W",
        "power": 275,
        "maxStringVoltage": 1000,
        "vmpp": 31.46,
        "impp": 8.85,
        "voc": 38.33,
        "isc": 9.235,
        "price": 2502.5,
        "efficiency": 16.9,
        "type": "Polycrystalline ",
        "__v": 0,
        "createdAt": "2023-03-22T04:32:22.780Z",
        "updatedAt": "2023-04-13T12:49:27.752Z"
    },
    {
        "dimensions": {
            "width": 992,
            "height": 1645,
            "depth": 35
        },
        "_id": "641a84d69b85d80f40b79a93",
        "name": "OSP60-280W",
        "manufacturer": "OSP60-280W",
        "model": "OSP60-280W",
        "power": 280,
        "maxStringVoltage": 1000,
        "vmpp": 31.21,
        "impp": 8.99,
        "voc": 38.7,
        "isc": 9.57,
        "price": 2604,
        "efficiency": 17.2,
        "type": "Polycrystalline",
        "__v": 0,
        "createdAt": "2023-03-22T04:32:22.782Z",
        "updatedAt": "2023-04-13T12:49:04.153Z"
    },
    {
        "dimensions": {
            "width": 992,
            "height": 1960,
            "depth": 40
        },
        "_id": "641a84d69b85d80f40b79a94",
        "name": "OSPp72-345W",
        "manufacturer": "OSP60-345W",
        "model": "OSP60-345W",
        "power": 345,
        "maxStringVoltage": 1000,
        "vmpp": 37.39,
        "impp": 9.23,
        "voc": 46.39,
        "isc": 9.66,
        "price": 3174,
        "efficiency": 17.74,
        "type": "Polycrystalline ",
        "__v": 0,
        "createdAt": "2023-03-22T04:32:22.782Z",
        "updatedAt": "2023-04-13T12:49:14.924Z"
    },
    {
        "dimensions": {
            "width": 1310,
            "height": 1996,
            "depth": 40
        },
        "_id": "641a84d69b85d80f40b79a95",
        "name": "500w-96M",
        "manufacturer": "500W",
        "model": "500W",
        "power": 500,
        "maxStringVoltage": 1000,
        "vmpp": 53.94,
        "impp": 9.77,
        "voc": 65.92,
        "isc": 10,
        "price": 4750,
        "efficiency": 19.12,
        "type": "Monocrystalline",
        "__v": 0,
        "createdAt": "2023-03-22T04:32:22.783Z",
        "updatedAt": "2023-04-13T19:38:15.584Z"
    },
    {
        "dimensions": {
            "width": 992,
            "height": 1960,
            "depth": 40
        },
        "_id": "641a84d69b85d80f40b79a96",
        "name": "OSMp72-380W",
        "manufacturer": "OSP60-380W",
        "model": "OSP60-380W",
        "power": 379,
        "maxStringVoltage": 1000,
        "vmpp": 37,
        "impp": 7.54,
        "voc": 46.6,
        "isc": 8.3,
        "price": 3633,
        "efficiency": 19.66,
        "type": "Monocrystalline ",
        "__v": 0,
        "createdAt": "2023-03-22T04:32:22.784Z",
        "updatedAt": "2023-04-13T12:48:52.520Z"
    },
    {
        "dimensions": {
            "width": 1006,
            "height": 1986,
            "depth": 40
        },
        "_id": "641a84d69b85d80f40b79a97",
        "name": "OSMp72-390W",
        "manufacturer": "OSP60-390W",
        "model": "OSP60-390W",
        "power": 390,
        "maxStringVoltage": 900,
        "vmpp": 41.1,
        "impp": 9.49,
        "voc": 49.3,
        "isc": 10.27,
        "price": 3900,
        "efficiency": 20.07,
        "type": "Monocrystalline",
        "__v": 0,
        "createdAt": "2023-03-22T04:32:22.784Z",
        "updatedAt": "2023-04-13T12:48:37.245Z"
    },
    {
        "dimensions": {
            "width": 990,
            "height": 1954,
            "depth": 40
        },
        "_id": "641ada78f35849242d1d6f99",
        "name": "CHSM6612P 320wp astronergy ",
        "manufacturer": "Astronergy",
        "model": "Nothing ",
        "type": "polycrystalline",
        "power": 320,
        "maxStringVoltage": 1000,
        "vmpp": 35.36,
        "impp": 8.93,
        "voc": 45.68,
        "isc": 9.06,
        "price": 2912,
        "efficiency": 16.5,
        "createdAt": "2023-03-22T10:37:44.510Z",
        "updatedAt": "2023-04-12T18:36:20.241Z",
        "__v": 0
    },
    {
        "dimensions": {
            "width": 668,
            "height": 1485,
            "depth": 30
        },
        "_id": "6436f726286e661345e0c68c",
        "name": "FYsolar 160w",
        "manufacturer": "Fysolar",
        "model": "FY-36-160P",
        "type": "polycrystalline",
        "power": 160,
        "maxStringVoltage": 1000,
        "vmpp": 18.34,
        "impp": 8.73,
        "voc": 22.01,
        "isc": 9.42,
        "price": 1456,
        "efficiency": 17,
        "createdAt": "2023-04-12T18:23:34.576Z",
        "updatedAt": "2023-04-13T19:43:58.328Z",
        "__v": 0
    }
]

const inverters = [
    {
        "voltageRang": {
            "min": 370,
            "max": 800
        },
        "_id": "64153285109e44221d3966ff",
        "name": "SMA SUNNY TRIPOWER 10000TL",
        "type": "On Grid",
        "manufacturer": "SMA",
        "model": "SUNNY TRIPOWER 10000TL",
        "voltage": [],
        "power": 10000,
        "price": 34500,
        "efficiency": 98,
        "createdAt": "2023-03-18T03:39:49.188Z",
        "updatedAt": "2023-03-18T03:39:49.188Z",
        "__v": 0
    },
    {
        "voltageRang": {
            "min": 245,
            "max": 800
        },
        "_id": "641532ea109e44221d396701",
        "name": "SMA SUNNY TRIPOWER 5000TL",
        "type": "On Grid",
        "manufacturer": "SMA",
        "model": "SUNNY TRIPOWER 5000TL",
        "voltage": [],
        "power": 5000,
        "price": 27500,
        "efficiency": 98,
        "createdAt": "2023-03-18T03:41:30.723Z",
        "updatedAt": "2023-03-18T03:41:30.723Z",
        "__v": 0
    },
    {
        "_id": "64154451191af3debbe93f13",
        "name": "Must EP30-6KW PRO",
        "type": "OFF Grid",
        "manufacturer": "Must ",
        "model": "EP30-6KW PRO",
        "voltage": [
            48
        ],
        "power": 6000,
        "price": 16200,
        "efficiency": 88,
        "createdAt": "2023-03-18T04:55:45.247Z",
        "updatedAt": "2023-03-18T04:55:45.247Z",
        "__v": 0
    },
    {
        "_id": "6415b0a5a686f3acf5deef7c",
        "name": "Mast inverter 1k",
        "type": "OFF Grid",
        "manufacturer": "Mast",
        "model": "1k",
        "voltage": [
            12,24,48
        ],
        "power": 1000,
        "price": 4020,
        "efficiency": 97,
        "createdAt": "2023-03-18T12:37:57.383Z",
        "updatedAt": "2023-03-22T06:58:55.037Z",
        "__v": 1,
        "inputPowerMax": 1000
    },
    {
        "_id": "6415b0e5a686f3acf5deef7e",
        "name": "Lg inverter 2k",
        "type": "OFF Grid",
        "manufacturer": "lg",
        "model": "2k",
        "voltage": [
            24,
            48,
            96
        ],
        "power": 2000,
        "price": 6200,
        "efficiency": 89,
        "createdAt": "2023-03-18T12:39:01.942Z",
        "updatedAt": "2023-04-13T18:35:38.508Z",
        "__v": 1,
        "inputPowerMax": 2000
    },
    {
        "voltageRang": {
            "min": 240,
            "max": 480
        },
        "_id": "6428a5f42d6c054af7ad9873",
        "name": "SMA SUNNY TRIPOWER 2500TL",
        "type": "On Grid",
        "manufacturer": "SMA",
        "model": "2500TL",
        "voltage": [
            96
        ],
        "power": 2500,
        "inputPowerMax": 3000,
        "price": 20500,
        "efficiency": 88,
        "createdAt": "2023-04-01T21:45:24.947Z",
        "updatedAt": "2023-04-01T21:45:24.947Z",
        "__v": 0
    },
    {
        "voltageRang": {
            "min": 200,
            "max": 400
        },
        "_id": "6428a7de2d6c054af7ad987d",
        "name": "SMA SUNNY TRIPOWER 1000TL",
        "type": "On Grid",
        "manufacturer": "SMA",
        "model": "TRIPOWER",
        "voltage": [],
        "power": 1000,
        "inputPowerMax": 1000,
        "price": 15000,
        "efficiency": 92,
        "createdAt": "2023-04-01T21:53:34.553Z",
        "updatedAt": "2023-04-01T21:53:34.553Z",
        "__v": 0
    },
    {
        "_id": "6436f82a286e661345e0c693",
        "name": "Inverter 500",
        "type": "OFF Grid",
        "manufacturer": "Mast",
        "model": "Inv500",
        "voltage": [
            12,24
        ],
        "power": 500,
        "inputPowerMax": 1000,
        "price": 500,
        "efficiency": 92,
        "createdAt": "2023-04-12T18:27:54.437Z",
        "updatedAt": "2023-04-19T14:01:06.322Z",
        "__v": 4
    },
    {
        "_id": "6437ef2c3dd8f06c7f5d85c0",
        "name": "Inverter 1000",
        "type": "OFF Grid",
        "manufacturer": "hawary",
        "model": "1000",
        "voltage": [
            12,
            24,
            48
        ],
        "power": 1000,
        "inputPowerMax": 1000,
        "price": 3500,
        "efficiency": 95,
        "createdAt": "2023-04-13T12:01:48.722Z",
        "updatedAt": "2023-04-16T15:22:58.859Z",
        "__v": 3
    },
    {
        "_id": "643c132f97f221f6fcb46932",
        "name": "Must 8KW PRO",
        "type": "OFF Grid",
        "manufacturer": "Must EP30-6KW PRO",
        "model": "Must EP30-6KW PRO",
        "voltage": [
            24,
            48,
            96
        ],
        "power": 8000,
        "inputPowerMax": 10000,
        "price": 21600,
        "efficiency": 97,
        "createdAt": "2023-04-16T15:24:31.064Z",
        "updatedAt": "2023-05-15T02:40:14.649Z",
        "__v": 0
    }
]

const batteries = [
    {
        "_id": "641a1dda9be437006942b624",
        "name": "120Ah samsung battery",
        "manufacturer": "anything  5",
        "model": "anything",
        "voltage": 12,
        "ampereHour": 120,
        "price": 5,
        "dod": 75,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.226Z",
        "updatedAt": "2023-04-13T19:24:13.142Z"
    },
    {
        "_id": "641a1dda9be437006942b625",
        "name": "180Ah samsung battery",
        "manufacturer": "anything to",
        "model": "anything",
        "voltage": 12,
        "ampereHour": 180,
        "price": 5.5,
        "dod": 80,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.228Z",
        "updatedAt": "2023-03-21T21:12:58.228Z"
    },
    {
        "_id": "641a1dda9be437006942b626",
        "name": "220Ah samsung battery",
        "manufacturer": "anything to",
        "model": "anything",
        "voltage": 12,
        "ampereHour": 220,
        "price": 7.2,
        "dod": 70,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.228Z",
        "updatedAt": "2023-03-22T05:26:55.368Z"
    },
    {
        "_id": "641a1dda9be437006942b627",
        "name": "200Ah samsung battery",
        "manufacturer": "anything to5",
        "model": "anything",
        "voltage": 24,
        "ampereHour": 200,
        "price": 6,
        "dod": 85,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.228Z",
        "updatedAt": "2023-04-13T19:24:21.102Z"
    },
    {
        "_id": "641a1dda9be437006942b628",
        "name": "280Ah samsung battery",
        "manufacturer": "anything to",
        "model": "anything",
        "voltage": 12,
        "ampereHour": 280,
        "price": 9,
        "dod": 75,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.228Z",
        "updatedAt": "2023-03-21T21:12:58.228Z"
    },
    {
        "_id": "641a1dda9be437006942b629",
        "name": "240Ah samsung battery",
        "manufacturer": "anything to",
        "model": "anything",
        "voltage": 12,
        "ampereHour": 240,
        "price": 7.5,
        "dod": 70,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.229Z",
        "updatedAt": "2023-03-21T21:12:58.229Z"
    },
    {
        "_id": "641a1dda9be437006942b62a",
        "name": "300Ah samsung battery",
        "manufacturer": "anything to",
        "model": "anything",
        "voltage": 12,
        "ampereHour": 300,
        "price": 9.58,
        "dod": 85,
        "__v": 0,
        "createdAt": "2023-03-21T21:12:58.229Z",
        "updatedAt": "2023-03-22T05:22:01.713Z"
    },
    {
        "_id": "64390cd5179f122651d44b1f",
        "name": "lg battery 42 Ah",
        "manufacturer": "lg",
        "model": "42 Ah",
        "voltage": 12,
        "ampereHour": 42,
        "price": 4.5,
        "dod": 85,
        "createdAt": "2023-04-14T08:20:38.029Z",
        "updatedAt": "2023-04-16T15:06:46.259Z",
        "__v": 0
    },
    {
        "_id": "643a04cfe0d2182809c7e543",
        "name": "Samsung 60 Ah",
        "manufacturer": "Samsung ",
        "model": "60",
        "voltage": 12,
        "ampereHour": 60,
        "price": 4.8,
        "dod": 85,
        "createdAt": "2023-04-15T01:58:39.596Z",
        "updatedAt": "2023-04-16T15:09:39.669Z",
        "__v": 0
    }
]

const solarChargers = [
    {
        "name": "B96-30A",
        "model": "B96-70A",
        "manufacturer": "Galaxy",
        "maxPower": 2000,
        "rateCurrent": 30,
        "systemVoltage": [24,48],
        "maxStringVoltage": 120,
        "type": "pmw",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 700
    },{
        "name": "B12-24-20A",
        "model": "B96-70A",
        "manufacturer": "Galaxy",
        "maxPower": 220,
        "rateCurrent": 20,
        "systemVoltage": [12,24],
        "maxStringVoltage": 40,
        "type": "pmw",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 350
    },{
        "name": "B96-20A",
        "model": "B96-70A",
        "manufacturer": "Galaxy",
        "maxPower": 1000,
        "rateCurrent": 20,
        "systemVoltage": [12,24],
        "maxStringVoltage": 100,
        "type": "pmw",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 500
    },{
        "name": "B96-70A",
        "model": "B96-70A",
        "manufacturer": "Galaxy",
        "maxPower": 7280,
        "rateCurrent": 70,
        "systemVoltage": [96],
        "maxStringVoltage": 430,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 1500
    },
    {
        "name": "B96-80A",
        "model": "B96-80A",
        "manufacturer": "Galaxy",
        "maxPower": 8320,
        "rateCurrent": 80,
        "systemVoltage": [96],
        "maxStringVoltage": 430,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 1700
    },
    {
        "name": "B96-100A",
        "model": "B96-100A",
        "manufacturer": "Galaxy",
        "maxPower": 10400,
        "rateCurrent": 100,
        "systemVoltage": [96],
        "maxStringVoltage": 430,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2000
    },
    {
        "name": "B192-50A",
        "model": "B192-50A",
        "manufacturer": "Galaxy",
        "maxPower": 10400,
        "rateCurrent": 50,
        "systemVoltage": [192],
        "maxStringVoltage": 430,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 1800
    },
    {
        "name": "B192-60A",
        "model": "B192-60A",
        "manufacturer": "Galaxy",
        "maxPower": 11700,
        "rateCurrent": 60,
        "systemVoltage": [192],
        "maxStringVoltage": 430,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2000
    },
    {
        "name": "B192-70A",
        "model": "B192-70A",
        "manufacturer": "Galaxy",
        "maxPower": 13000,
        "rateCurrent": 70,
        "systemVoltage": [192],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2300
    },
    {
        "name": "B192-80A",
        "model": "B192-80A",
        "manufacturer": "Galaxy",
        "maxPower": 12480,
        "rateCurrent": 80,
        "systemVoltage": [192],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],


        "price": 2500
    },
    {
        "name": "B192-100A",
        "model": "B192-100A",
        "manufacturer": "Galaxy",
        "maxPower": 14040,
        "rateCurrent": 100,
        "systemVoltage": [192],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2800
    },
    {
        "name": "B216-50A",
        "model": "B216-50A",
        "manufacturer": "Galaxy",
        "maxPower": 14560,
        "rateCurrent": 50,
        "systemVoltage": [216],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 1900
    },
    {
        "name": "B216-60A",
        "model": "B216-60A",
        "manufacturer": "Galaxy",
        "maxPower": 16380,
        "rateCurrent": 60,
        "systemVoltage": [216],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2200
    },
    {
        "name": "B216-70A",
        "model": "B216-70A",
        "manufacturer": "Galaxy",
        "maxPower": 18200,
        "rateCurrent": 70,
        "systemVoltage": [216],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2500
    },
    {
        "name": "B216-80A",
        "model": "B216-80A",
        "manufacturer": "Galaxy",
        "maxPower": 20800,
        "rateCurrent": 80,
        "systemVoltage": [216],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2800
    },
    {
        "name": "B216-100A",
        "model": "B216-100A",
        "manufacturer": "Galaxy",
        "maxPower": 20800,
        "rateCurrent": 100,
        "systemVoltage": [216],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 3000
    },
    {
        "name": "B240-50A",
        "model": "B240-50A",
        "manufacturer": "Galaxy",
        "maxPower": 23400,
        "rateCurrent": 50,
        "systemVoltage": [240],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2100
    },
    {
        "name": "B240- 60A",
        "model": "B240-60A",
        "manufacturer": "Galaxy",
        "maxPower": 26040,
        "rateCurrent": 60,
        "systemVoltage": [240],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2300
    },
    {
        "name": "B240-70A",
        "model": "B240-70A",
        "manufacturer": "Galaxy",
        "maxPower": 28680,
        "rateCurrent": 70,
        "systemVoltage": [240],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2500
    },
    {
        "name": "B240-80A",
        "model": "B240-80A",
        "manufacturer": "Galaxy",
        "maxPower": 31280,
        "rateCurrent": 80,
        "systemVoltage": [240],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 2700
    },
    {
        "name": "B240-100A",
        "model": "B240-100A",
        "manufacturer": "Galaxy",
        "maxPower": 36400,
        "rateCurrent": 100,
        "systemVoltage": [240],
        "maxStringVoltage": 660,
        "type": "MPPT",
        "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
        "price": 3000
    }
]

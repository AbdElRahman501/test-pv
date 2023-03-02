
const data = {
  inverters: [
      { id: "1", name: "100w lg inverter", voltage: [12], power: 100, price: 5, efficiency: 98 }
      , { id: "7", name: "400w lg inverter", voltage: [12, 24], power: 400, price: 10, efficiency: 96 }
      , { id: "2", name: "150w lg inverter", voltage: [12], power: 150, price: 5.5, efficiency: 95 }
      , { id: "3", name: "200w lg inverter", voltage: [12, 24], power: 200, price: 7, efficiency: 96 }
      , { id: "4", name: "250w lg inverter", voltage: [12, 24], power: 250, price: 7.5, efficiency: 98 }
      , { id: "5", name: "300w lg inverter", voltage: [24], power: 300, price: 9, efficiency: 98 }
      , { id: "6", name: "350w lg inverter", voltage: [12, 24], power: 350, price: 9.5, efficiency: 97.5 }
      , { id: "8", name: "500w lg inverter", voltage: [12, 24, 48], power: 500, price: 12, efficiency: 96.5 }
      , { id: "10", name: "600w lg inverter", voltage: [24, 48], power: 600, price: 14, efficiency: 97 }
      , { id: "9", name: "700w lg inverter", voltage: [12, 24, 48, 96], power: 700, price: 18, efficiency: 97 }
      , { id: "12", name: "800w lg inverter", voltage: [24, 48], power: 800, price: 20, efficiency: 97.5 }
      , { id: "11", name: "1Kw lg inverter", voltage: [48, 96], power: 1000, price: 22, efficiency: 97.5 }
      , { id: "14", name: "2kw lg inverter", voltage: [48, 96], power: 2000, price: 28, efficiency: 97 }
      , { id: "13", name: "3kw lg inverter", voltage: [96], power: 3000, price: 35, efficiency: 96.5 }
  ],
  batteries: [
      { id: '1', name: '120Ah samsung battery', voltage: 12, ampereHour: 120, dod: .75, price: 5 },
      { id: '2', name: '180Ah samsung battery', voltage: 12, ampereHour: 180, dod: .8, price: 5.5 },
      { id: '4', name: '220Ah samsung battery', voltage: 12, ampereHour: 220, dod: .7, price: 7 },
      { id: '3', name: '200Ah samsung battery', voltage: 24, ampereHour: 200, dod: .78, price: 6 },
      { id: '6', name: '280Ah samsung battery', voltage: 12, ampereHour: 280, dod: .75, price: 9 },
      { id: '5', name: '240Ah samsung battery', voltage: 12, ampereHour: 240, dod: .7, price: 7.5 },
      { id: '7', name: '300Ah samsung battery', voltage: 12, ampereHour: 300, dod: .85, price: 9.5 },
  ],
  panels: [{
      id: '1',
      name: 'OSP60-275W',
      power: 275,
      vmpp: 31.46,
      impp: 8.85,
      voc: 38.33,
      isc: 9.235,
      dimensions: {
          width: 992,
          height: 1645,
          depth: 35
      },
      efficiency: 16.9,
      type: "Polycrystalline ",
      price: 5
  }, {
      id: '2',
      name: 'OSP60-280W',
      power: 280,
      vmpp: 31.21,
      impp: 8.99,
      voc: 38.7,
      isc: 9.57,
      dimensions: {
          width: 992,
          height: 1645,
          depth: 35
      },
      efficiency: 17.2,
      type: "Polycrystalline",
      price: 5.5
  }, {
      id: '3',
      name: 'OSPp72-345W',
      power: 345,
      vmpp: 37.39,
      impp: 9.23,
      voc: 46.39,
      isc: 9.66,
      dimensions: {
          width: 1960,
          height: 992,
          depth: 40
      },
      efficiency: 17.74,
      type: "Polycrystalline ",
      price: 6
  }, {
      id: '6',
      name: '500w-96M',
      power: 500,
      vmpp: 53.94,
      impp: 9.77,
      voc: 65.92,
      isc: 9.77,
      dimensions: {
          width: 1310,
          height: 1996,
          depth: 40
      },
      efficiency: 19.12,
      type: "Monocrystalline",
      price: 7.5
  }, {
      id: '4',
      name: 'OSMp72-380W',
      power: 379,
      vmpp: 37,
      impp: 7.54,
      voc: 46.6,
      isc: 8.3,
      dimensions: {
          width: 992,
          height: 1960,
          depth: 40
      },
      efficiency: 19.66,
      type: "Monocrystalline ",
      price: 6.5
  }, {
      id: '5',
      name: 'OSMp72-390W',
      power: 390,
      vmpp: 41.1,
      impp: 9.49,
      voc: 49.3,
      isc: 10.27,
      dimensions: {
          width: 1006,
          height: 1986,
          depth: 40
      },
      efficiency: 20.07,
      type: "Monocrystalline",
      price: 7
  },]
}
function choseTheInverter(inp, loadRange, inverters) {
  // console.log(inp, inverters);
  inverters.sort(function (a, b) {
    return a.power - b.power;
  });
  let rang = loadRange >= 0 && loadRange <= 50 ? ((loadRange / 100) + 1) : 1.3
  let power = rang * inp
  if (inverters) {
    let fixedInverter = []
    let score = []
    for (let inverter of inverters) {
      let ratio = (power / inverter.power);
      let num = Math.floor(ratio) < ratio ? Math.floor(ratio) + 1 : Math.floor(ratio)
      let powerRate = power / (num * inverter.power);
      fixedInverter.push({
        ...inverter,
        num,
        powerRate,
        totalPrice: num * inverter.price
      })
      // console.log(inverter.id,ratio,powerRate.toFixed(2),ratio*inverter.price)  
    }
    for (let inverter of fixedInverter) {
      let sum = fixedInverter.reduce((b, a) => a.num + b, 0)
      let numScore = 100 - ((inverter.num / sum) * 100)
      sum = Math.max(...fixedInverter.map(x => (100 - ((x.num / sum) * 100))))
      numScore = (numScore / sum) * 100
      let powerScore = (inverter.powerRate * 100)
      let maxPowerScore = Math.max(...fixedInverter.map(x => (x.powerRate * 100)))
      powerScore = ((powerScore / maxPowerScore) * 100)
      let priceRate = Math.max(...fixedInverter.map(x => x.totalPrice))
      // let priceRate =  fixedInverter.reduce((b, a) => a.totalPrice+b, 0)
      let priceScore = 100 - ((inverter.totalPrice / priceRate) * 100)
      priceRate = Math.max(...fixedInverter.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
      priceScore = (priceScore / priceRate) * 100
      let totalScore = (priceScore + numScore + (powerScore / 3)) / 3
      totalScore = (totalScore / (((2*100)+(100/3))/3))*100
      score.push({
        ...inverter,
        numScore,
        powerScore,
        totalScore,
        priceScore
      })
      // console.log(numScore.toFixed(2),powerScore.toFixed(2),priceScore.toFixed(2),totalScore.toFixed(2))
    }
    // console.log(score.map(x => ({ id:x.id ,total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), powerX: x.powerScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));
    let first = {
      ...score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))),
      rank: 1
    }
    let second = {
      ...score.filter(x => x.id !== first.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id).map(x => x.totalScore))),
      rank: 2
    }
    let third = {
      ...score.filter(x => x.id !== first.id && x.id !== second.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id && x.id !== second.id).map(x => x.totalScore))),
      rank: 3
    }

    return ([first, second, third])
  }

}
function choseBattery(data) {
  let { energy, loss, dod, autonomyDay, inverter, batteries } = data
  let chosenBat = []
  let score = []
  energy = energy / (inverter.efficiency / 100) || energy / 0.97
  energy = energy / loss || energy / 0.85
  // console.log(energy)
  batteries.sort(function (a, b) {
    return a.ampereHour - b.ampereHour;
  });
  for (let battery of batteries) {
    let voltage
    if (Math.max(...inverter.voltage.map(x => x)) >= battery.voltage) {
      voltage = Math.max(...inverter.voltage.map(x => x))
    }
    // = inverter.voltage.find(x => x > ) || inverter.voltage.find(x => x >= battery.voltage)
    // console.log(voltage)
    if (voltage) {
      let batteryOfOne = energy / (dod * voltage) || energy / (battery.dod * voltage)
      // console.log(batteryOfOne);
      batteryOfOne = batteryOfOne * autonomyDay || batteryOfOne
      let branch = batteryOfOne / battery.ampereHour;
      // branch = Math.floor(branch) < branch ? Math.floor(branch) + 1 : Math.floor(branch)
      branch = Number(branch.toFixed(0))
      let batteryPerBranch = voltage / battery.voltage
      batteryPerBranch = Math.floor(batteryPerBranch) < batteryPerBranch ? Math.floor(batteryPerBranch) + 1 : Math.floor(batteryPerBranch)
      if (batteryPerBranch >= 1) {

        // console.log(batteryOfOne,branch,batteryPerBranch) 
        let num = branch * batteryPerBranch
        let totalPrice = (num * battery.price);
        chosenBat.push({
          ...battery,
          branch,
          batteryPerBranch,
          num,
          totalPrice
        })
      }
    }

  }
  for (let i = 0; i < chosenBat.length; i++) {
    const battery = chosenBat[i];
    let sum = chosenBat.reduce((b, a) => a.num + b, 0)
    let numScore = 100 - ((battery.num / sum) * 100)
    let priceRate = Math.max(...chosenBat.map(x => x.totalPrice))
    // let priceRate =  chosenBat.reduce((b, a) => a.totalPrice+b, 0)
    let priceScore = 100 - ((battery.totalPrice / priceRate) * 100)
    priceRate = Math.max(...chosenBat.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
    priceScore = (priceScore / priceRate) * 100
    let totalScore = (priceScore + numScore) / 2
    score.push({
      ...battery,
      numScore,
      totalScore,
      priceScore
    })
    // console.log(battery.num, battery.ampereHour, "numScore " + numScore.toFixed(2), "priceRate " + priceScore.toFixed(2), "totalScore " + totalScore.toFixed(2));
  }
  // console.log(score.map(x => ({ total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));

  // console.log(score);
  let first = {
    ...score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))),
    rank: 1
  }
  let second = {
    ...score.filter(x => x.id !== first.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id).map(x => x.totalScore))),
    rank: 2
  }
  let third = {
    ...score.filter(x => x.id !== first.id && x.id !== second.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id && x.id !== second.id).map(x => x.totalScore))),
    rank: 3
  }

  return ([first, second, third])

}

function chosePanels(data) {
let { energy, inverter, loss, peakSonHours, panels, tiltAngle, AzimuthAngle, expectArea } = data

tiltAngle = tiltAngle * (Math.PI / 180)
AzimuthAngle = AzimuthAngle * (Math.PI / 180)

let maxStringVoltage = 400;
let maxArrayAmps = 100;

let shPanels = [];
let score = []

panels.sort(function (a, b) {
  return a.power - b.power;
});

energy = energy / (inverter.efficiency / 100) || energy / 0.97
energy = energy / loss || energy / 0.85
let panelsPower = energy / peakSonHours || energy / 5
for (let panel of panels) {
  let numOfPanels = Number((panelsPower / panel.power).toFixed(0))
  numOfPanels = numOfPanels > 0 ? numOfPanels : numOfPanels + 1

  // numOfPanels = numOfPanels % 2 !== 0 && numOfPanels !== 1 ? numOfPanels + 1 : numOfPanels
  let totalPrice = numOfPanels * panel.price

  let height = Math.max((panel.dimensions.width / 1000), (panel.dimensions.height / 1000))
  height = (height * Math.cos(tiltAngle)) + ((height * Math.sin(tiltAngle)) / Math.tan(AzimuthAngle))
  let width = Math.min((panel.dimensions.width / 1000), (panel.dimensions.height / 1000))
  let area = width * height
  let totalArea = numOfPanels * area


  let string = Math.floor(maxStringVoltage / panel.vmpp)
  let panelsInString = Math.floor(maxArrayAmps / panel.impp)

console.log( string,panelsInString);
  shPanels.push({
    ...panel,
    numOfPanels,
    area,
    totalArea,
    totalPrice
  })
  // console.log(energy,panelsPower,numOfPanels,numOfPanels % 2==0)
}
// console.log(shPanels)
for (let panel of shPanels) {
  let sum = shPanels.reduce((b, a) => a.numOfPanels + b, 0)
  // let sum = Math.max(...shPanels.map(x => x.numOfPanels))
  let numScore = 100 - ((panel.numOfPanels / sum) * 100)
  sum = Math.max(...shPanels.map(x => (100 - ((x.numOfPanels / sum) * 100))))
  numScore = (numScore / sum) * 100
  let priceRate = Math.max(...shPanels.map(x => x.totalPrice))
  // let priceRate =  shPanels.reduce((b, a) => a.totalPrice+b, 0)
  let priceScore = 100 - ((panel.totalPrice / priceRate) * 100)
  priceRate = Math.max(...shPanels.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
  priceScore = (priceScore / priceRate) * 100

  let maxArea = Math.max(...shPanels.map(x => x.totalArea))
  let areaScore = 100 - ((panel.totalArea / maxArea) * 100)
  maxArea = Math.max(...shPanels.map(x => (100 - ((x.totalArea / maxArea) * 100))))
  areaScore = (areaScore / maxArea) * 100
  // console.log( closeTo(shPanels.map(x=> x.totalArea),panel.totalArea,expectArea))
  let totalScore = (priceScore + numScore + areaScore) / 3
  // console.log(panel.id, "n " + panel.numOfPanels, "nS " + numScore.toFixed(2), "p " + panel.totalPrice, "pS " + priceScore.toFixed(2), "A " + panel.totalArea.toFixed(2), "AS " + areaScore.toFixed(2), "T " + totalScore.toFixed(2))

  score.push({
    ...panel,
    numScore,
    areaScore,
    totalScore,
    priceScore
  })
}
let first = {
  ...score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))),
  rank: 1
}
let second = {
  ...score.filter(x => x.id !== first.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id).map(x => x.totalScore))),
  rank: 2
}
let third = {
  ...score.filter(x => x.id !== first.id && x.id !== second.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id && x.id !== second.id).map(x => x.totalScore))),
  rank: 3
}

return ([first, second, third])
}

function totalPower(power, range, batteryLoss, autonomyDay, dod, energy, peakSonHours) {
  let invs = choseTheInverter(power, range, data.inverters)
  let bats = choseBattery({
      energy,
      loss: batteryLoss,
      dod,
      autonomyDay,
      inverter: invs[0],
      batteries: data.batteries
  })
  let panles = chosePanels({
      energy,
      inverter: invs[0],
      loss: batteryLoss,
      peakSonHours,
      panels: data.panels,
      tiltAngle : 28,
      AzimuthAngle: 23,
      expectArea : 350
  })
  console.log( {
      invs,
      bats,
      panles
  })
}


function closeTo(arr,num,ref){
// let arr = [50, 20, 30, 40,80]
  let i = arr.indexOf(num)
  let cArr = arr.map(x => Math.abs(x - ref))
  let maxCArr = Math.max(...cArr.map(x=> x ))
  let opSc = 100 - ((cArr[i] / maxCArr) * 100)
  // console.log(i,num,cArr,maxCArr)
  return opSc;
  
}
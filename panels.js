const PI = Math.PI;
const RAD = PI / 180;
const DEG = 180 / PI;

function sizeIt() {
    // Retrieve input values
    var selectElement = document.getElementById("mySelect");
    var type = selectElement.value;
    var totalPower = Number(document.getElementById('totalPower').value);
    var safetyFactor = Number(document.getElementById('safetyFactor').value);
    evaluateExpression()
    var expectedArea = Number(document.getElementById('expectedArea').value);
    var totalEnergy = Number(document.getElementById('totalEnergy').value);
    var loss = Number(document.getElementById('loss').value);
    var peakSonHours = Number(document.getElementById('peakSonHours').value);
    var topResults = Number(document.getElementById('topResults').value);
    var elevationAngle = Number(document.getElementById('elevationAngle').value);
    var tiltAngle = Number(document.getElementById('tiltAngle').value);
    var coordinates = { tiltAngle, elevationAngle }
    let autonomyDay = Number(document.getElementById('autonomyDay').value);
    let dod = Number(document.getElementById('dod').value);
    let numOfCharger = Number(document.getElementById('numOfCharger').value);
    let chosenInverter = Number(document.getElementById('chosenInverter').value);
    let chosenPanel = Number(document.getElementById('chosenPanel').value);
    let panelsPriority = { price: Number(document.getElementById('pricePriority').value), num: Number(document.getElementById('numPriority').value), area: Number(document.getElementById('areaPriority').value) }

    // Do something with the values
    // Call any relevant functions or perform calculations
    saveToLocalStorage()
    // Example: Display the values in the console
    let data = { type, expectedArea, totalPower, dod, totalEnergy, autonomyDay, loss, safetyFactor, peakSonHours, topResults, coordinates, panelsPriority }
    let inverter = choseTheInverter(data, inverters.filter(x => x.type === type))
    let panel = chosePanels(data, panels, inverter[chosenInverter])
    let battery = choseBattery(data, inverter[chosenInverter], batteries)
    let solarCharger = choseSolarCharger({ systemVoltage: battery[0].systemVoltage, panel: panel[chosenPanel], topResults }, solarChargers)
    console.log("inverter:", inverter);
    console.log("panel:", panel);
    console.log("battery:", battery);
    console.log("solarCharger:", solarCharger, battery[0].systemVoltage);


    // var resultParagraph = document.getElementById("result");
    // resultParagraph.textContent = panel[0]?.message;
    var container = document.getElementById("container");
    container.innerHTML = "";
    var newRow = document.createElement("div");
    newRow.classList.add("data-row");
    let history = JSON.parse((localStorage.getItem("history"))) || []
    let totalCost = (inverter[chosenInverter].totalPrice + panel[chosenPanel].totalPrice + battery[0].totalPrice + solarCharger[numOfCharger].totalPrice)
    history.push(totalCost)
    localStorage.setItem("history", JSON.stringify(history.slice(-8)));
    let bestPrice = Math.min(...history)
    console.log(bestPrice);
    history.forEach(cost => {
        var newEl = document.createElement("h1");
        newEl.textContent = "total Cost = " + cost
        if (cost === bestPrice) {
            newEl.classList.add("green");
        }
        newRow.appendChild(newEl);
        container.appendChild(newRow)

    });

    panel.forEach(function (item) {
        var dataRow = document.createElement("div");
        dataRow.classList.add("data-row");

        var nameElement = document.createElement("h1");
        nameElement.textContent = item.name;
        nameElement.classList.add("green");

        let arrangements = getArrangements(item, solarCharger[numOfCharger])?.message || getArrangements(item, solarCharger[numOfCharger])?.error

        var detailsElement = document.createElement("p");
        detailsElement.innerHTML = "Rank: " + item.rank +
            "<br>Total Score: <span class='red'>" + item.totalScore.toFixed(2) + "</span>" +
            "<br>Area Score: <span class='green'>" + item.areaScore.toFixed(2) + "</span>" +
            "<br>Num Score: <span class='green'>" + item.numScore.toFixed(2) + "</span>" +
            "<br>Price Score: <span class='green'>" + item.priceScore.toFixed(2) + "</span>" +
            "<br>Number of Panels: <span class='green'>" + item.numOfPanels + "</span>" +
            "<br>Total Price: LE <span class='green'>" + item.totalPrice.toFixed(2) + "</span>" +
            "<br>Arrangements: " + arrangements;


        dataRow.appendChild(nameElement);
        dataRow.appendChild(detailsElement);

        container.appendChild(dataRow);
    });
    inverter.forEach(function (item) {
        var dataRow = document.createElement("div");
        dataRow.classList.add("data-row");

        var nameElement = document.createElement("h1");
        nameElement.textContent = item.name;
        nameElement.classList.add("red");


        var detailsElement = document.createElement("p");
        detailsElement.innerHTML = "Rank: " + item.rank +
            "<br>Total Score: <span class='red'>" + item.totalScore.toFixed(2) + "</span>" +
            "<br>Power Score: <span class='green'>" + item.powerScore.toFixed(2) + "</span>" +
            "<br>Num Score: <span class='green'>" + item.numScore.toFixed(2) + "</span>" +
            "<br>Price Score: <span class='green'>" + item.priceScore.toFixed(2) + "</span>" +
            "<br>efficiency Score: <span class='green'>" + item.efficiency + "</span>" +
            "<br>Number: <span class='green'>" + item.num + "</span>" +
            "<br>Total Price: LE <span class='green'>" + item.totalPrice.toFixed(2) + "</span>"


        dataRow.appendChild(nameElement);
        dataRow.appendChild(detailsElement);

        container.appendChild(dataRow);
    });
    battery.forEach(function (item) {
        var dataRow = document.createElement("div");
        dataRow.classList.add("data-row");

        var nameElement = document.createElement("h1");
        nameElement.textContent = item.name;
        nameElement.classList.add("blue");


        var detailsElement = document.createElement("p");
        detailsElement.innerHTML = "Rank: " + item.rank +
            "<br>Total Score: <span class='red'>" + item.totalScore.toFixed(2) + "</span>" +
            "<br>systemVoltage: <span class='green'>" + item.systemVoltage + "</span>" +
            "<br>Num Score: <span class='green'>" + item.numScore.toFixed(2) + "</span>" +
            "<br>Price Score: <span class='green'>" + item.priceScore.toFixed(2) + "</span>" +
            "<br>Number: <span class='green'>" + item.num + "</span>" +
            "<br>Total Price: LE <span class='green'>" + item.totalPrice.toFixed(2) + "</span>"


        dataRow.appendChild(nameElement);
        dataRow.appendChild(detailsElement);

        container.appendChild(dataRow);
    });
    solarCharger.forEach(function (item) {
        var dataRow = document.createElement("div");
        dataRow.classList.add("data-row");

        var nameElement = document.createElement("h1");
        nameElement.textContent = item.name;
        nameElement.classList.add("orange");


        var detailsElement = document.createElement("p");
        detailsElement.innerHTML = "Rank: " + item.rank +
            "<br>Total Score: <span class='red'>" + item.totalScore.toFixed(2) + "</span>" +
            "<br>systemVoltage: <span class='green'>" + item.systemVoltage + "</span>" +
            "<br>Num Score: <span class='green'>" + item.numScore.toFixed(2) + "</span>" +
            "<br>Price Score: <span class='green'>" + item.priceScore.toFixed(2) + "</span>" +
            "<br>Number: <span class='green'>" + item.num + "</span>" +
            "<br>Total Price: LE <span class='green'>" + item.totalPrice.toFixed(2) + "</span>"


        dataRow.appendChild(nameElement);
        dataRow.appendChild(detailsElement);

        container.appendChild(dataRow);
    });
}
function test(data) {
    // let data = theData ? theData : { type, totalPower, totalEnergy, loss, safetyFactor, peakSonHours, topResults, coordinates }
    // console.log('data:', data);
    let theInverters = inverters.filter(x => x.type === data.type)
    // console.log(theInverters);
    let inverter = choseTheInverter(data, theInverters)
    let panel = chosePanels(data, panels, inverter[0])
    // console.log("inverter:", inverter);
    console.log("panel:", panel);
    let arrangements = []
    panel.forEach(item => {
        let message = getArrangements(item)?.message
        if (message) {
            arrangements.push(message)
        }
    });

    if (panel.length === arrangements.length) {
        console.log('%c Success! ' + data?.totalEnergy, `color: green; font-weight: bold;`);
    }
}
function evaluateExpression() {
    var totalEnergyInput = document.getElementById('totalEnergy');
    var expression = totalEnergyInput.value;
    var result = eval(expression); // Evaluate the expression

    if (!isNaN(result)) {
        totalEnergyInput.value = result; // Update the value if it's a valid result
    } else {
        totalEnergyInput.value = ''; // Clear the input field if the expression is invalid
    }
}
function saveToLocalStorage() {
    var inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        localStorage.setItem(input.id, input.value);
    }
}
function loadFromLocalStorage() {
    var inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var savedValue = localStorage.getItem(input.id);
        if (savedValue) {
            input.value = savedValue;
        }
    }
}
function chosePanels(data, panels, inverter) {
    let { totalPower, totalEnergy, loss, coordinates, expectedArea, peakSonHours, topResults, panelsPriority } = data
    let { elevationAngle, tiltAngle } = coordinates

    let shPanels = [];
    let score = []

    totalPower = inverter.type === "OFF Grid" ? totalEnergy / ((inverter.efficiency / 100) * loss * peakSonHours) : totalPower
    for (let panel of panels) {
        let area = getArea(panel, tiltAngle, elevationAngle)
        let numOfPanels = expectedArea ? Math.floor(expectedArea / area) : inverter?.type === "On Grid" ? Math.ceil(totalPower / panel.power) : Math.floor(totalPower / panel.power) || 1
        let totalPrice = numOfPanels * panel.price
        let totalArea = numOfPanels * area
        shPanels.push({ ...panel, numOfPanels, area, totalArea, totalPrice })
    }

    for (let panel of shPanels) {
        let numScore = getScore("numOfPanels", panel, shPanels)
        let priceScore = getScore("totalPrice", panel, shPanels)
        let areaScore = getScore("totalArea", panel, shPanels)
        let totalScore = Math.sqrt(((Math.pow(priceScore, 2) * panelsPriority.price) + (Math.pow(numScore, 2) * panelsPriority.num) + (Math.pow(areaScore, 2) * panelsPriority.area)) / 100)
        score.push({ ...panel, numScore, areaScore, totalScore, priceScore })
    }
    return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}
function getArea(panel, tiltAngle, elevationAngle) {
    let height = (panel.dimensions.height / 1000)
    let width = (panel.dimensions.width / 1000)
    height = tiltAngle > 0 && elevationAngle > 0 ? (height * Math.cos(tiltAngle * RAD)) + ((height * Math.sin(tiltAngle * RAD)) / Math.tan(elevationAngle * RAD)) : height
    return width * height
}
function choseSolarCharger(data, solarChargers) {
    let { systemVoltage, topResults, panel } = data

    let initArr = [];
    let scoreArr = []
    solarChargers.filter(x => x.systemVoltage.includes(systemVoltage)).forEach(solarCharger => {
        let panelsPerString = Math.floor(Math.min(solarCharger.maxStringVoltage, panel.maxStringVoltage) / panel.voc)
        let maxParallelStrings = Math.floor((solarCharger.rateCurrent * 0.9) / panel.isc)
        let maxPanelsPerArr = Math.min(Math.floor(solarCharger.maxPower / panel.power), panelsPerString * maxParallelStrings)
        let result = findNumbers(Math.floor(panelsPerString / 2), panelsPerString, Math.floor(maxPanelsPerArr / 2), maxPanelsPerArr);
        let num = Math.ceil(panel.numOfPanels / Math.max(...result))
        let totalPrice = num * solarCharger.price
        if (num && totalPrice) {
            initArr.push({ ...solarCharger, num, totalPrice })
        }
    });
    initArr.forEach(solarCharger => {
        let numScore = getScore("num", solarCharger, initArr)
        let priceScore = getScore("totalPrice", solarCharger, initArr)
        let totalScore = (priceScore + numScore) / 2
        scoreArr.push({ ...solarCharger, numScore, totalScore, priceScore })
    });
    return (scoreArr.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}
function getScore(scoreName, item, array, sum) {
    let max
    if (sum) {
        max = array.reduce((b, a) => a[scoreName] + b, 0)
    } else {
        max = Math.max(...array.map(x => x[scoreName]))

    }
    max = max === Math.min(...array.map(x => x[scoreName])) ? 2 * max : max
    let initScore = 100 - ((item[scoreName] / max) * 100)
    max = Math.max(...array.map(x => (100 - ((x[scoreName] / max) * 100))))
    return ((initScore / max) * 100)
}
function choseTheInverter(data, inverters) {
    let { safetyFactor, totalPower, topResults } = data
    totalPower = (1 + (safetyFactor / 100)) * totalPower

    let initInverters = []
    let score = []
    for (let inverter of inverters) {
        let num = Math.ceil(totalPower / inverter.power)
        /// need to edit the power rate to power diff and edit all the next 

        // let powerDiff = 1 - (totalPower / (num * inverter.power))
        let powerDiff = (totalPower / (num * inverter.power))
        let totalPrice = num * inverter.price
        initInverters.push({ ...inverter, num, powerDiff, totalPrice })
    }
    for (let inverter of initInverters) {
        let numScore = adjustScoreToLower(getScore("num", inverter, initInverters, true))
        let powerScore = adjustScoreToBigger(((inverter.powerDiff * 100) / Math.max(...initInverters.map(x => (x.powerDiff * 100)))) * 100)
        // let powerScore = adjustScoreToBigger(getScore("powerDiff", inverter, initInverters))
        let priceScore = adjustScoreToBigger(getScore("totalPrice", inverter, initInverters, true))
        let totalScore = (priceScore + numScore + (powerScore / 3)) / 3
        totalScore = (totalScore / (((2 * 100) + (100 / 3)) / 3)) * 100
        totalScore = (totalScore + inverter.efficiency) / 2
        score.push({ ...inverter, numScore, powerScore, totalScore, priceScore })
    }
    return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}
function adjustScoreToLower(score) {
    if (score >= 95 && score <= 100) {
        return score;
    } else if (score >= 85 && score < 95) {
        return score - 3;
    } else if (score >= 70 && score < 85) {
        return score - 15;
    } else if (score >= 50 && score < 70) {
        return score - 20;
    } else if (score >= 30 && score < 50) {
        return score - 25;
    } else if (score > 10 && score < 30) {
        return score - 10;
    } else {
        return score
    }
}
function adjustScoreToBigger(score) {
    if (score >= 95 && score < 99) {
        return score + 2;
    } else if (score >= 90 && score < 95) {
        return score + 4;
    } else if (score >= 85 && score < 90) {
        return score + 6;
    } else if (score >= 70 && score < 85) {
        return score + 7;
    } else if (score >= 50 && score < 70) {
        return score + 20;
    } else if (score >= 30 && score < 50) {
        return score + 25;
    } else {
        return score
    }
}

function getArrangements(panel, solarCharger) {
    let numOfPanels = panel.numOfPanels
    let maxStringVoltage = Math.min(solarCharger.maxStringVoltage, panel.maxStringVoltage)
    let panelsPerString = Math.floor(maxStringVoltage / panel.voc) || 1
    let maxPanelsPerArr = Math.floor(solarCharger.maxPower / panel.power)
    let numOfArr = solarCharger.num

    const numOfBasePanels = numOfPanels

    if (numOfPanels <= panelsPerString) {
        return { message: "( 1 X " + numOfPanels + " )" }
    }

    let count = 4
    let result
    let combinations

    let minDivisor = Math.floor(panelsPerString / 2) || 1
    let minStartArr = Math.floor(maxPanelsPerArr / 2) || 1

    while (count >= 0) {

        result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
        combinations = findCombination(numOfPanels, result, numOfArr)

        if (combinations.length === 0) {
            if (numOfPanels < numOfBasePanels + 2) {
                numOfPanels++
            } else {
                minDivisor = Math.ceil(panelsPerString / 3)
                minStartArr = Math.ceil(maxPanelsPerArr / 3)
                result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
            }
            combinations = findCombination(numOfPanels, result, numOfArr)
        } else if (combinations.error) {
            return { error: combinations.error }
        }

        if (getBestArray(combinations)) {
            break
        }
        count--

    }
    let arrangement = getBestArray(combinations)

    return { message: arrToExpression(arrangement, minDivisor, panelsPerString) }

}

function arrToExpression(array, minDivisor, maxDivisor) {
    let arr = []
    let expression = ""
    array.forEach((number) => {
        for (let i = maxDivisor; i >= minDivisor; i--) {
            if (number % i === 0) {
                arr.push((number / i) + " X " + i)
                break
            }
        }
    });
    while (arr?.length > 0) {
        let x = arr.filter(x => x == arr[0])
        arr = arr.filter(x => x != arr[0])
        if (arr.length > 0) {
            expression = expression + (x.length + " x (" + x[0] + ") + ");
        } else {
            expression = expression + (x.length + " x (" + x[0] + ") = " + sumArrayNumbers(array));
        }
    }
    return (expression);
}

function isDivisible(number, minDivisor, maxDivisor) {
    for (let i = minDivisor; i <= maxDivisor; i++) {
        if (number % i === 0) {
            return true;
        }
    }
    return false;
}
function findNumbers(minDivisor, maxDivisor, start, end) {
    const numbers = [];
    for (let i = start; i <= end; i++) {
        if (isDivisible(i, minDivisor, maxDivisor)) {
            numbers.push(i);
        }
    }
    return numbers;
}
function findCombination(target, numbers, numOfArr, timeout = 5000) {
    const combinations = [];
    numbers.sort((a, b) => b - a)
    if ((target / Math.max(...numbers) > numOfArr) || numbers.length === 0) {
        return { error: "Cant Arrange " + target + " panels with " + numOfArr + " of selected solar charger and " + Math.max(...numbers) + " max number of panels in one array " }
    }
    let max = target > 500 ? 1 : Math.ceil(100 / (target / Math.max(...numbers)))

    function backtrack(remaining, currentCombination, start) {
        if (Date.now() - startTime > timeout) {
            if (combinations.length > 0) {
                return combinations;
            }
            throw new Error('Timeout: The function took too long to execute.');
        }

        if (remaining === 0 && currentCombination.length === numOfArr) {
            combinations.push([...currentCombination]);
        } else if (remaining < 0) {
            return;
        } else if (combinations.length >= max) {
            return;
        } else {
            for (let i = start; i < numbers.length; i++) {
                currentCombination.push(numbers[i]);
                backtrack(remaining - numbers[i], currentCombination, i);
                currentCombination.pop();
            }
        }
    }
    const startTime = Date.now();
    backtrack(target, [], 0);

    return combinations;
}
function sumArrayNumbers(array) {
    var sum = array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    return sum;
}

function getBestArray(arrays) {
    let minDifference = Infinity;
    let bestArray;
    for (const array of arrays) {
        const max = Math.max(...array);
        const min = Math.min(...array);
        const difference = max - min;

        if (difference < minDifference) {
            minDifference = difference;
            bestArray = array;
        }
    }
    return bestArray
}

function choseBattery(data, inverter, batteries) {
    let { totalEnergy, loss, dod, autonomyDay, topResults } = data
    totalEnergy = totalEnergy / ((inverter.efficiency / 100) * loss)

    let initBatteries = []
    let score = []

    batteries.forEach(battery => {
        dod = dod || battery.dod / 100
        let systemVoltage = bestVoltage(inverter.voltage, battery.ampereHour, totalEnergy, dod, autonomyDay, battery.voltage)
        let totalCapacity = (totalEnergy * autonomyDay) / (dod * systemVoltage)
        let branch = Math.ceil(totalCapacity / battery.ampereHour);
        let batteryPerBranch = Math.ceil(systemVoltage / battery.voltage)
        let num = branch * batteryPerBranch
        let totalPrice = (num * battery.price);
        if (systemVoltage) {
            initBatteries.push({ ...battery, systemVoltage, branch, batteryPerBranch, num, totalPrice })
        }
    });
    initBatteries.forEach(battery => {
        let numScore = getScore("num", battery, initBatteries)
        let priceScore = getScore("totalPrice", battery, initBatteries)
        let totalScore = (priceScore + numScore) / 2
        score.push({ ...battery, numScore, totalScore, priceScore })
    });
    return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}

function bestVoltage(voltageArr, capacity, energy, dod, autonomyDay, batteryVolt) {
    let vs = []
    for (let volt of voltageArr) {
        let totalCapacity = (energy * autonomyDay) / (dod * volt)
        if ((volt / batteryVolt) >= 1) { vs.push({ r: totalCapacity / capacity, volt }) }
    }
    return (vs.find(x => x.r == closestNum(vs.map(x => x.r), 1))?.volt)
}
function closestNum(array, target) {
    return array.reduce(function (prev, curr) {
        return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
    });
}
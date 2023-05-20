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

    // Do something with the values
    // Call any relevant functions or perform calculations
    saveToLocalStorage()
    // Example: Display the values in the console
    let data = { type,expectedArea, totalPower, totalEnergy, loss, safetyFactor, peakSonHours, topResults, coordinates }
    console.log('data:', data);
    let theInverters = inverters.filter(x => x.type === type)
    console.log(theInverters);
    let inverter = choseTheInverter(data, theInverters)
    let panel = chosePanels(data, panels, inverter[0])
    console.log("inverter:", inverter);
    console.log("panel:", panel);
    if (panel.length > 0) {
        console.log('%c Success! ' + totalEnergy, `color: green; font-weight: bold;`);
    }


    // var resultParagraph = document.getElementById("result");
    // resultParagraph.textContent = panel[0]?.message;
    var container = document.getElementById("container");
    container.innerHTML = "";

    panel.forEach(function (item) {
        var dataRow = document.createElement("div");
        dataRow.classList.add("data-row");

        var nameElement = document.createElement("h1");
        nameElement.textContent = item.name;
        let arrangements = getArrangements(item)?.message

        var detailsElement = document.createElement("p");
        detailsElement.innerHTML = "Rank: " + item.rank +
            "<br>Total Score: <span class='green'>" + item.totalScore.toFixed(2) + "</span>" +
            "<br>Area Score: <span class='green'>" + item.areaScore.toFixed(2) + "</span>" +
            "<br>Num Score: <span class='green'>" + item.numScore.toFixed(2) + "</span>" +
            "<br>Price Score: <span class='green'>" + item.priceScore.toFixed(2) + "</span>" +
            "<br>Number of Panels: <span class='green'>" + item.numOfPanels + "</span>" +
            "<br>Total Price: $<span class='green'>" + item.totalPrice.toFixed(2) + "</span>" +
            "<br>Arrangements: " + arrangements;



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
    let { totalPower, totalEnergy, loss, coordinates, expectedArea, peakSonHours, topResults } = data
    // console.log(data);
    let { elevationAngle, tiltAngle } = coordinates

    let maxStringVoltage
    let maxArrayAmps = 100;

    let shPanels = [];
    let score = []

    panels.sort(function (a, b) {
        return a.power - b.power;
    });
    let panelsPower

    if (inverter?.type === "On Grid") {
        maxStringVoltage = inverter.voltageRang.max
    } else {
        maxStringVoltage = 400
    }

    if (totalEnergy) {
        totalEnergy = totalEnergy / (inverter.efficiency / 100)
        totalEnergy = totalEnergy / loss
        panelsPower = totalEnergy / peakSonHours
    } else if (totalPower) {
        panelsPower = totalPower
    }
    console.log(totalEnergy, panelsPower);

    for (let panel of panels) {
        let height = (panel.dimensions.height / 1000)
        let width = (panel.dimensions.width / 1000)
        height = tiltAngle > 0 && elevationAngle > 0 ? (height * Math.cos(tiltAngle * RAD)) + ((height * Math.sin(tiltAngle * RAD)) / Math.tan(elevationAngle * RAD)) : height
        let area = width * height
        let numOfPanels
        if (expectedArea) {
            numOfPanels = Math.floor(expectedArea / area)
        } else {
            if (inverter?.type === "On Grid") {
                numOfPanels = Math.ceil(panelsPower / panel.power)
            } else {
                numOfPanels = Math.floor(panelsPower / panel.power)
            }
            numOfPanels = numOfPanels > 0 ? numOfPanels : numOfPanels + 1
        }


        let totalPrice = numOfPanels * panel.price
        let totalArea = numOfPanels * area
        shPanels.push({
            ...panel,
            numOfPanels,
            area,
            totalArea,
            totalPrice
        })
        // console.log(totalEnergy,panelsPower,numOfPanels,numOfPanels % 2==0)
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
        // console.log( closeTo(shPanels.map(x=> x.totalArea),panel.totalArea,area))
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
    return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}

function toBigFixed(num) {
    return Math.floor(num) < num ? Math.floor(num) + 1 : Math.floor(num)
}
function getArrangement(maxStringVoltage, maxCurrent, maxPower, panelVoltage, panelCurrent, panelPower, numOfPanels) {
    // console.log(maxStringVoltage, maxCurrent, maxPower, panelVoltage, panelCurrent, panelPower, numOfPanels);
    // let maxPower =  toBigFixed()
    let maxNumSeries = Math.floor(maxStringVoltage / panelVoltage)
    //400/45 = 8 max num of panels per string 
    // console.log("maxNumSeries = " + maxNumSeries)
    function isDivisible(number, divisors) {
        for (let i = 0; i < divisors.length; i++) {
            if (number % divisors[i] === 0) {
                return true;
            }
        }
        return false;
    }
    const divisors = Array.from({
        length: maxNumSeries - 1
    }, (_, index) => index + 2);

    let maxNumOfParallelStrings = Math.floor(maxCurrent / panelCurrent)
    //400/45 = 8 max num of panels per string 
    // console.log("maxNumOfParallelStrings = " + maxNumOfParallelStrings)
    let numOfSolarCharger
    let maxNumOfPanelPerArr
    if (maxPower) {
        numOfSolarCharger = toBigFixed((numOfPanels * panelPower) / maxPower)
        maxNumOfPanelPerArr = Math.floor(maxPower / panelPower)
        numOfSolarCharger = (maxNumOfPanelPerArr * numOfSolarCharger) < numOfPanels ? numOfSolarCharger + 1 : numOfSolarCharger

    } else {
        maxNumOfPanelPerArr = Math.floor(maxCurrent / panelCurrent) * maxNumSeries
        numOfSolarCharger = toBigFixed(numOfPanels / maxNumOfPanelPerArr)
    }
    // console.log("numOfSolarCharger = " + numOfSolarCharger)

    //10000 / 500 = 20 max num of panels per array 
    // console.log("maxNumOfPanelPerArr = " + maxNumOfPanelPerArr)
    let initParallel
    let numSeries = maxNumSeries

    let numOfPanelsPerArr
    let numOfArr
    let unSizedPanel
    const theNumOfPanel = numOfPanels
    while (numSeries > 0) {
        initParallel = toBigFixed(Math.floor(numOfPanels / numOfSolarCharger) / numSeries)
        if (initParallel > maxNumOfParallelStrings) {
            initParallel = maxNumOfParallelStrings
        }
        // console.log("initParallel = " + initParallel)

        numOfPanelsPerArr = (initParallel * numSeries)

        // console.log("numOfPanelsPerArr = " + numOfPanelsPerArr)

        numOfArr = numOfPanels < numOfPanelsPerArr ? 1 : Math.floor(numOfPanels / numOfPanelsPerArr)

        // console.log("numOfArr = " + numOfArr)

        unSizedPanel = numOfPanels - (numOfArr * numOfPanelsPerArr)

        // console.log((initParallel * numSeries) * numOfArr, initParallel, numSeries, unSizedPanel)

        if (numOfPanelsPerArr <= maxNumOfPanelPerArr && numOfArr <= numOfSolarCharger) {
            if (unSizedPanel >= maxNumSeries) {
                // console.log(isDivisible(unSizedPanel, divisors))
                if ((isDivisible(unSizedPanel, divisors)) || (unSizedPanel === maxNumSeries)) {
                    break
                }

            } else if (unSizedPanel === 0 || (unSizedPanel >= (maxNumSeries / 2) && numOfArr != numOfSolarCharger)) {
                break
            }
        }
        if (numSeries === 1 && numOfPanels <= (theNumOfPanel + 2)) {
            numSeries = maxNumSeries
            numOfPanels++
        }
        numSeries--
    }

    // console.log("numOfPanelsPerArr = " + numOfPanelsPerArr)
    // console.log("numOfArr = " + numOfArr)
    // console.log("unSizedPanel = " + unSizedPanel)

    // console.log("numSeries = " + numSeries)

    let numUnUsedSeries = maxNumSeries
    while (numUnUsedSeries > 0) {
        if ((toBigFixed(unSizedPanel / numUnUsedSeries) * numUnUsedSeries) == unSizedPanel) {
            break;
            // Exit the loop if the condition is true
        }
        numUnUsedSeries--
    }

    unSizedPanel = toBigFixed(unSizedPanel / numUnUsedSeries) * numUnUsedSeries
    let totalNum = ((numOfSolarCharger - numOfArr) * unSizedPanel) + (numOfArr * numOfPanelsPerArr)

    if (numOfArr > numOfSolarCharger) {
        // console.error('%cThis is an error message', 'color: red');
        return ({
            message: "ERROR : SizedPanel = " + (numOfArr) + " (" + initParallel + " X " + numSeries + ")" + " + " + (numOfSolarCharger - numOfArr) + " (" + toBigFixed(unSizedPanel / numUnUsedSeries) + " X " + numUnUsedSeries + ") = " + totalNum
        })

    } else if (numOfArr === numOfSolarCharger) {
        // console.log('%cThis is a success message', 'color: green');

        return ({
            message: "SizedPanel = " + (numOfArr) + " (" + initParallel + " X " + numSeries + ") = " + totalNum
        })
    } else {
        // console.log('%cThis is a success message', 'color: green');

        return ({
            message: "SizedPanel = " + (numOfArr) + " (" + initParallel + " X " + numSeries + ")" + " + " + (numOfSolarCharger - numOfArr) + " (" + toBigFixed(unSizedPanel / numUnUsedSeries) + " X " + numUnUsedSeries + ") = " + totalNum
        })
    }

}

function choseTheInverter(data, inverters) {
    let { safetyFactor, totalPower, topResults } = data

    safetyFactor = 1 + (safetyFactor / 100)
    totalPower = safetyFactor * totalPower

    if (inverters) {
        let fixedInverter = []
        let score = []
        for (let inverter of inverters) {
            let ratio = (totalPower / inverter.power);
            let num = Math.floor(ratio) < ratio ? Math.floor(ratio) + 1 : Math.floor(ratio)
            let powerRate = totalPower / (num * inverter.power);
            fixedInverter.push({
                ...inverter,
                num,
                powerRate,
                totalPrice: num * inverter.price
            })
            // console.log(inverter.id, ratio, powerRate.toFixed(2), ratio * inverter.price)
        }
        for (let inverter of fixedInverter) {
            let sum = fixedInverter.reduce((b, a) => a.num + b, 0)
            let numScore = 100 - ((inverter.num / sum) * 100)
            sum = Math.max(...fixedInverter.map(x => (100 - ((x.num / sum) * 100))))
            numScore = (numScore / sum) * 100
            numScore = adjustScoreToLower(numScore)
            let powerScore = (inverter.powerRate * 100)
            let maxPowerScore = Math.max(...fixedInverter.map(x => (x.powerRate * 100)))
            powerScore = adjustScoreToBigger((powerScore / maxPowerScore) * 100)
            let priceRate = Math.max(...fixedInverter.map(x => x.totalPrice))
            // let priceRate =  fixedInverter.reduce((b, a) => a.totalPrice+b, 0)
            let priceScore = 100 - ((inverter.totalPrice / priceRate) * 100)
            priceRate = Math.max(...fixedInverter.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
            priceScore = adjustScoreToBigger((priceScore / priceRate) * 100)
            let totalScore = (priceScore + numScore + (powerScore / 3)) / 3
            totalScore = (totalScore / (((2 * 100) + (100 / 3)) / 3)) * 100
            score.push({
                ...inverter,
                numScore,
                powerScore,
                totalScore,
                priceScore
            })
            // console.log(numScore.toFixed(2), powerScore.toFixed(2), priceScore.toFixed(2), totalScore.toFixed(2))
        }
        // console.log(score.map(x => ({ id: x.id, total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), powerX: x.powerScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));
        return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))

    }

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




// function getArrangements(numOfPanels, panelsPerString, maxPanelsPerArr) {

//     const basPanel = numOfPanels
//     let arr = []
//     let sum = 0
//     let counter = 0
//     let arrangement = []
//     while (sum < numOfPanels) {
//         let newArr = []
//         let randomNum = getRandomNumber((panelsPerString / 2), panelsPerString)
//         while (sumArrayNumbers(newArr) < (maxPanelsPerArr - randomNum)) {
//             newArr.push(randomNum)
//         }
//         arr.push(newArr) 
//         sum = sum + sumArrayNumbers(newArr)
//         if (sum > numOfPanels) {
//             sum = 0
//             arr = []
//         } else if (sum === numOfPanels) {
//             break
//         }
//         if (counter === 500) {
//             numOfPanels++
//             sum = 0
//             arr = []
//         }
//         if (counter === 1000) {
//             break
//         }
//         if (numOfPanels >= basPanel + 2) {
//             break
//         }
//         counter++
//     }
//     arr.forEach(array => {
//         array[0]
//         arrangement.push(array.length + " x " + array[0])
//     });
//     return { message: arrayToExpression(arrangement) + " = " + sum }
// };



// function getArrangements(numOfPanels, panelsPerString, maxParallelStrings, maxPanelsPerArr, numOfArr) {
function getArrangements(panel, solarCharger = { maxStringVoltage: 400, maxArrCurrent: 100, maxPower: 10000 }) {
    let numOfPanels = panel.numOfPanels
    maxStringVoltage = Math.min(solarCharger.maxStringVoltage, panel.maxStringVoltage)
    let panelsPerString = Math.floor(maxStringVoltage / panel.voc)
    let maxPanelsPerArr = Math.floor(solarCharger.maxPower / panel.power)
    let numOfArr = Math.ceil(numOfPanels / maxPanelsPerArr)
    // if ((numOfPanels + 2) > (numOfArr * maxPanelsPerArr)) {
    //     numOfArr++
    // }
    // console.log(numOfPanels, maxNumSeries, maxNumOfPanelPerArr);
    // let message = getArrangements(numOfPanels, maxNumSeries, maxNumOfPanelPerArr)?.message
    // let message = getArrangements(numOfPanels, maxNumSeries, 100, maxNumOfPanelPerArr, numOfArr)?.message

    console.log("numOfPanels", numOfPanels)
    console.log("panelsPerString", panelsPerString, "maxPanelsPerArr", maxPanelsPerArr);
    console.log("numOfArr", numOfArr, (numOfPanels + 2), (numOfArr * maxPanelsPerArr), (numOfPanels + 2) > (numOfArr * maxPanelsPerArr));
    const theMaxPanelsPerArr = maxPanelsPerArr
    const numOfBasePanels = numOfPanels
    // numOfArr = (numOfPanels + 10) >= (numOfArr * maxPanelsPerArr) ? numOfArr + 1 : numOfArr
    // while ((numOfPanels + 2) >= (numOfArr * maxPanelsPerArr)) {
    //     numOfPanels--
    // }
    // console.log(numOfPanels > panelsPerString, (numOfPanels + 2) < (numOfArr * maxPanelsPerArr))
    if (numOfPanels > panelsPerString) {
        // if ((numOfPanels + 2) > (numOfArr * maxPanelsPerArr)) {
        //     numOfArr++
        // }
        let count = 4
        let result
        let combinations
        // maxPanelsPerArr = Math.min(theMaxPanelsPerArr, numOfPanels)
        let minDivisor = Math.floor(panelsPerString / 2)
        let minStartArr = Math.floor(maxPanelsPerArr / 2)

        while (count >= 0) {
            // console.log(Math.ceil(panelsPerString / 2), panelsPerString, Math.ceil(maxPanelsPerArr / 2), maxPanelsPerArr);
            result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
            // console.log(numOfPanels, result, numOfArr);
            combinations = findCombination(numOfPanels, result, numOfArr)
            console.log(combinations, combinations.length === 0);
            if (combinations.length === 0) {
                if (numOfPanels < numOfBasePanels + 2) {
                    numOfPanels++
                    console.log("plus");
                } else {
                    minDivisor = Math.ceil(panelsPerString / 3)
                    minStartArr = Math.ceil(maxPanelsPerArr / 3)
                    result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
                }

                combinations = findCombination(numOfPanels, result, numOfArr)
                console.log(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr, "result", result);
            } else if (combinations.error) {
                console.log("combinations.error", combinations.error);
                numOfArr = Math.ceil(numOfPanels / Math.max(...result))
                combinations = findCombination(numOfPanels, result, numOfArr)
            }
            // console.log(combinations);

            // combinations = combinations?.filter(x => (x.length <= numOfArr && sumArrayNumbers(x) === numOfPanels));
            if (getBestArray(combinations)) {
                break
            }
            // console.log(numOfPanels, getBestArray(combinations), combinations);

            count--
        }
        console.log("combinations", combinations);
        let arrangement = getBestArray(combinations)

        return { message: arrToExpression(arrangement, minDivisor, panelsPerString) }
    } else {
        return { message: "( 1 X " + numOfPanels + " )" }
    }

}

function arrToExpression(array, minDivisor, maxDivisor) {
    let arr = []
    let expression = ""
    console.log(array, minDivisor, maxDivisor);
    array.forEach((number, index) => {
        for (let i = maxDivisor; i >= minDivisor; i--) {
            if (number % i === 0) {
                arr.push((number / i) + " X " + i)
                break
            }
        }
    });
    console.log(arr);

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

// Usage
// const result = findNumbers(Math.ceil(8 / 2), 8, 16, 26);
// console.log(result);

function findCombination(target, numbers, numOfArr, timeout = 5000) {
    console.log(target, numbers, numOfArr);
    if (target / Math.max(...numbers) > numOfArr) {
        return { error: "length of array smaller than required" }
    }
    const combinations = [];
    numbers.sort((a, b) => b - a)
    max = target > 500 ? 1 : Math.ceil(100 / (target / Math.max(...numbers)))
    // max = max === 0?1:max
    console.log(max);
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

// const targetSum = 78;
// const givenNumbers = [15, 16, 18, 20, 21, 24, 25];

// console.log(...combinations)

function getBestArray(arrays) {
    let minDifference = Infinity;
    let bestArray;
    console.log(arrays);
    for (const array of arrays) {
        const max = Math.max(...array);
        const min = Math.min(...array);
        const difference = max - min;

        if (difference < minDifference) {
            minDifference = difference;
            bestArray = array;
        }
    }
    // console.log('Best Array:', bestArray);
    return bestArray
}

// getArrangements(  2402, 18 , 100, 62, 39 )


findCombination(2402, [32, 33, 34, 36, 39, 40, 42, 44, 45, 48, 50, 51, 52, 54, 55, 56, 60], 39) 
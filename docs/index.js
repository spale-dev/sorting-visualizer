var array = [];
var ARRAY_LENGTH = 100;
var ARRAY_MAX_SIZE = 100;
var timeout = 1; // timeout in milliseconds
function generateBars(array) {
    var movedBars = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var container = document.getElementById("bar-container");
    container.innerHTML = "";
    for(var i = 0; i < array.length; i++){
        var bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = array[i] * 8 + "px";
        if (movedBars.includes(i)) {
            bar.classList.add("highlight");
        }
        container.appendChild(bar);
    }
}
function generateRandomArray() {
    var numSet = new Set();
    while(numSet.size !== ARRAY_LENGTH){
        numSet.add(randomNumber(1, ARRAY_LENGTH));
    }
    return Array.from(numSet);
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function sortArray() {
    bubbleSort(array);
}
var bubbleSort = function(arr) {
    var len = arr.length;
    var swapped = true;
    var sortIteration = function(i) {
        if (swapped) {
            var _loop = function(j) {
                setTimeout(function() {
                    if (arr[j] > arr[j + 1]) {
                        var ref;
                        ref = [
                            arr[j + 1],
                            arr[j]
                        ], arr[j] = ref[0], arr[j + 1] = ref[1], ref;
                        swapped = true;
                        generateBars(arr, [
                            j,
                            j + 1
                        ]);
                    }
                }, j * timeout);
            };
            swapped = false;
            for(var j = 0; j < len - i - 1; j++)_loop(j);
            setTimeout(function() {
                sortIteration(i + 1);
            }, len * timeout);
        }
    };
    sortIteration(0);
    return arr;
};
function resetArray() {
    array = generateRandomArray();
    generateBars(array);
}
window.addEventListener("load", function() {
    array = generateRandomArray();
    generateBars(array);
});



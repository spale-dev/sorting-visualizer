var array: number[] = [];
var ARRAY_LENGTH: number = 100;
var ARRAY_MAX_SIZE: number = 100;

var timeout: number = 1; // timeout in milliseconds

function generateBars(array: number[], movedBars: number[] = []): void {
    var container = <HTMLElement>document.getElementById("bar-container");
    container.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        var bar = <HTMLElement>document.createElement("div");
        bar.className = "bar";
        bar.style.height = (array[i] * 8) + "px";

        if (movedBars.includes(i)) {
            bar.classList.add("highlight");
        }

        container.appendChild(bar);
    }
}

function generateRandomArray(): number[] {
    var numSet: Set<number> = new Set<number>();
    while (numSet.size !== ARRAY_LENGTH) {
        numSet.add(randomNumber(1, ARRAY_LENGTH));
    }
    return Array.from(numSet);
}

function randomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sortArray(): void {
    bubbleSort(array);
}

const bubbleSort = (arr: number[]): number[] => {
    const len = arr.length;
    let swapped: boolean = true;

    const sortIteration = (i: number) => {
        if (swapped) {
            swapped = false;
            for (let j = 0; j < len - i - 1; j++) {
                setTimeout(() => {
                    if (arr[j] > arr[j + 1]) {
                        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                        swapped = true;
                        generateBars(arr, [j, j + 1]);
                    }
                }, j * timeout);
            }
            setTimeout(() => {
                sortIteration(i + 1);
            }, len * timeout);
        }
    };
    sortIteration(0);

    return arr;
};

function resetArray(): void {
    array = generateRandomArray();
    generateBars(array);
}

window.addEventListener('load', () => {
    array = generateRandomArray();
    generateBars(array);
});
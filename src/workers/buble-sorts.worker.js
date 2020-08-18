// Contoh menjalankan proses komputasi berat
// di Node JS dengan Worker Threads
// Proses berat tidak menghambat dan blocking main event loop
// Sehingga aplikasi tetap responsif ketika proses kalkulasi
// komputasi berat di jalankan
// Contoh komputasi berat dengan Bubble sort
import { parentPort, workerData } from 'worker_threads';

let rawArray = [];
let arrayResult = [];

function generateRandomArrays(length, max) {
    const randomArray = [...new Array(length)].map(() =>
        Math.round(Math.random() * max),
    );
    return randomArray;
}

function sortBubble(array) {
    arrayResult = array;
    const { length } = array;
    let swapped = false;

    for (let i = 0; i < length; i += 1) {
        swapped = false;
        for (let j = 0; j < length - i - 1; j += 1) {
            if (arrayResult[j] > arrayResult[j + 1]) {
                const tmp = arrayResult[j];
                arrayResult[j] = arrayResult[j + 1];
                arrayResult[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
    }
}

rawArray = generateRandomArrays(workerData.lengthData, workerData.maxData);
sortBubble(rawArray);
parentPort.postMessage({ rawdata: rawArray, sortdata: arrayResult });

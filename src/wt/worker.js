// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    try {
        if (Math.random() > 0.5) throw new Error('error');
        parentPort.postMessage({status: 'resolved', data: nthFibonacci(workerData)});
    } catch (err) {
        parentPort.postMessage({status: 'error', data: null});
    }
};

sendResult();
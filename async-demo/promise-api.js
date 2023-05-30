
const p1 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 1...');
        resolve(1);
    }, 8000);
})

const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log('async operation 2...');
        resolve(2);
    }, 2000);
})

Promise.race([p1,p2])
    .then(result => console.log(result))
    .catch(err => console.log('error: ', err.message));

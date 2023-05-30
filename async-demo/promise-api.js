const p = Promise.reject(new Error('fail'));
p.catch(error  => console.log(error));
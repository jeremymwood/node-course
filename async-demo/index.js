console.log('before');

getUser(1, (user) => {
    getRepositories(user.gitHubUsername, (repos) => {
        getCommits(repos[0], (commits) => {
            console.log(commits);
        })
    })
})

getUser(1)
    .then(user => getRepositories(user.gitHubUsername))
    .then(repos => getCommits(repos[0]))
    .then(commits => console.log('commits: ', commits))
    .catch(err => console.log('error: ', err.message));
    // .catch(err => console.log('error: ', err.message));

// getUser(1, getRepositories);


console.log('after');

// function getRepositories(user) {
//     getRepositories(user.gitHubUsername, getCommits);
// };
//
// function getCommits(repos) {
//     getCommits(repo, displayCommits);
// };
//
// function displayCommits(commits) {
//     console.log(commits);
// };

function getUser(id) {
    return new Promise((resolve, require) => {
        setTimeout(() => {
            console.log('reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'jeremy'});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, require) => {
        setTimeout(() => {
            console.log('calling github api...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repos) {
    return new Promise((resolve, require) => {
        setTimeout(() => {
            console.log('calling commits...');
            resolve(['commit1', 'commit2', 'commit3']);
        }, 2000);
    });
}
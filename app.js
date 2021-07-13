const values = [
    {id: 'scissors', value:'✌️' },
    {id: 'hammer', value:'✊' },
    {id: 'bag', value:'🖐' }
]
let userPoints = 0;
let computerPoints = 0;
// handle interval
let handleInterval = () => {
    const random = Math.floor(Math.random()*3);
    const computer = document.getElementById('computer');
    computer.textContent = values[random].value;
    computer.dataset.id = values[random].id;
}
// Ramdom value for computer after 0.2s
let interval = setInterval(handleInterval, 200);

// Function compare by index
const compare  = (user, computer) => {
    const userIndex = values.findIndex((e) => e.id === user);
    const computerIndex = values.findIndex((e) => e.id === computer);
    let check = userIndex - computerIndex;
    if([1, -2].includes(check)) return 1;
    else if([-1, 2].includes(check)) return -1;
    else return 0;
}

// Event user click 
document.querySelectorAll('.user').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.classList.add('active');
        clearInterval(interval);
        const userValue = e.target.id;
        const computerValue = document.getElementById('computer').dataset.id;
        let message = '';

        //create element notification
        const notification = document.createElement("div");
        notification.classList.add('alert');
        const resultCompare = compare(userValue, computerValue);
        if(resultCompare === 1) {
            message = 'Bạn đã chiến thắng !';
            notification.innerText = message;
            notification.classList.add('alert-info');
            userPoints += 1;
        }
        if(resultCompare === -1) {
            message = 'Bạn đã thua !';
            notification.innerText = message;
            notification.classList.add('alert-danger');
            computerPoints += 1;
        }
        if(resultCompare === 0) {
            message = 'Bạn đã hòa !';
            notification.innerText = message;
            notification.classList.add('alert-warning');
        }

        // Change point for user and computer
        const user_point = document.getElementById('userPoint');
        const computer_point = document.getElementById('computerPoint');
        user_point.innerText = userPoints;
        computer_point.innerText = computerPoints;
        

        //Append child notification to div notification
        const divNotification = document.getElementById('notification');
        divNotification.appendChild(notification);


        // Unable userclick
        document.querySelectorAll('.user').forEach(_btn => {
            _btn.style.pointerEvents = 'none';
        })

        // Display button play again
        document.querySelector('.play-again').classList.remove('d-none');
    })
})

// Handle button play again
document.getElementById('play-again').addEventListener('click', (e) => {
    // ramdom again for computer
    interval = setInterval(handleInterval, 200);
    
    //Remove class avtive
    document.querySelectorAll('.user').forEach(btn => {
        btn.classList.remove('active');
    })

    // Remove notification
    document.getElementById('notification').innerHTML = '';

    //Enable user to click
    document.querySelectorAll('.user').forEach(btn => {
        btn.style.pointerEvents = '';
    })
    
    // Hide button play again
    document.querySelector('.play-again').classList.add('d-none');
})
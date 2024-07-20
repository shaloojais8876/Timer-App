document.getElementById('start-timer').addEventListener('click', startNewTimer);

const timersContainer = document.getElementById('timers-container');
let timers = [];

let p = document.getElementById('no');

function startNewTimer() {
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds <= 0) {
        alert('Please set a valid time.');
        return;
    }

    const timer = {
        id: Date.now(),
        totalSeconds,
        remainingSeconds: totalSeconds,
        intervalId: null
    };

    timer.intervalId = setInterval(() => {
        timer.remainingSeconds -= 1;
        updateTimerDisplay(timer);
        if (timer.remainingSeconds <= 0) {
            clearInterval(timer.intervalId);
            
            endTimer(timer);
            
        }
    }, 1000);

    timers.push(timer);
    renderTimer(timer);
    
}

function updateTimerDisplay(timer) {
    const timerElement = document.getElementById(`timer-${timer.id}`);
    const hours = Math.floor(timer.remainingSeconds / 3600);
    const minutes = Math.floor((timer.remainingSeconds % 3600) / 60);
    const seconds = timer.remainingSeconds % 60;

    timerElement.querySelector('.time').textContent = ` ${hours}h : ${minutes}m : ${seconds}s`;
}

function renderTimer(timer) {
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    timerElement.id = `timer-${timer.id}`;
    timerElement.innerHTML = `
        <span id="left">Time Left:</span>    
        <span class="time"></span>
        <button onclick="stopTimer(${timer.id})">Delete</button>
    `;
    p.className = 'hidden';
    timersContainer.appendChild(timerElement);
    updateTimerDisplay(timer);
}

function endTimer(timer) {
    const timerElement = document.getElementById(`timer-${timer.id}`);
    timerElement.className = 'timer timer-ended';
    
    timerElement.querySelector('.time').textContent = 'Timer is up!';
    document.getElementById('left').style.color = '#ffc107';
    playAlertSound();
}

function stopTimer(timerId) {
    const timer = timers.find(t => t.id === timerId);
    if (timer) {
        clearInterval(timer.intervalId);
        timers = timers.filter(t => t.id !== timerId);
        document.getElementById(`timer-${timerId}`).remove();
    }
}

function playAlertSound() {
    const audio = new Audio('path_to_your_audio_file.mp3');
    audio.play();
}

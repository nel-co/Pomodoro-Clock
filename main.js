const settingsIcon = document.querySelector('.header-icon'),
  settingsBar = document.querySelector('.settings-c'),

  sessionLeft = document.getElementById('session-left'),
  sessionRight = document.getElementById('session-right'),
  breakLeft = document.getElementById('break-left'),
  breakRight = document.getElementById('break-right'),
  sessionSetting = document.getElementById('session-time'),
  breakSetting = document.getElementById('break-time'),

  mainBtn = document.querySelector('.start');

// Prevents text from being highlighted
document.addEventListener('mousedown', function(e){ e.preventDefault(); }, false);


// Toggle Settings
settingsIcon.addEventListener('click', function() {
		settingsBar.classList.toggle('visible');
})


/* Settings
--------------------------*/
var mainTimer = sessionSetting.innerHTML;

// Left Session Btn
sessionLeft.addEventListener('click',function() {
	timer.stop();
	document.querySelector('.circle').style.animation = null;
	document.querySelector('.start-text').textContent = 'START!';
	if(sessionSetting.innerHTML > 0) {
		let i = sessionSetting.innerHTML;
		i--;
		mainTimer = parseInt(i);
		sessionSetting.innerHTML = mainTimer;
		document.querySelector('.time').innerHTML = i + ':00';
	}
})

// Right Session Btn
sessionRight.addEventListener('click',function() {
	timer.stop();
	document.querySelector('.circle').style.animation = null;
	document.querySelector('.start-text').textContent = 'START!';
	if(sessionSetting.innerHTML < 60) {
		let i = sessionSetting.innerHTML;
		i++; 
		mainTimer = parseInt(i);
		sessionSetting.innerHTML = mainTimer;
		document.querySelector('.time').innerHTML = i + ':00';
	}
})

/* Countdown
-----------------------------*/
var timer = new Timer();
function startTimer() {
	timer.start({ countdown: true, startValues: { seconds: 60 * mainTimer } });
	document.querySelector('.time').innerHTML = timer.getTimeValues().toString();
	timer.addEventListener('secondsUpdated', function(e) {
		document.querySelector('.time').innerHTML = timer.getTimeValues().toString();
	});

	timer.addEventListener('targetAchieved', function(e) {
		document.querySelector('.time').innerHTML = 'Break!';
		document.querySelector('.time-text').innerHTML = "Reset when you're ready.";
	});
}

/* Start-Reset
---------------------------*/
mainBtn.addEventListener('click', function() {
	if(document.querySelector('.start-text').textContent != 'RESET!') { 
		document.querySelector('.circle').classList.add('animate');
		document.querySelector('.start-text').textContent = 'RESET!';
		startTimer();
		if(settingsBar.classList.toggle('visible')) { settingsBar.classList.toggle('visible'); }
 }
	else { 
		timer.stop();
		document.querySelector('.start-text').textContent = 'START!';
		document.querySelector('.circle').classList.remove('animate');
		document.querySelector('.time-text').innerHTML = 'Until your next break.'
		document.querySelector('.time').innerHTML = sessionSetting.innerHTML + ':00';
	}
})
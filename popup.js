document.addEventListener('DOMContentLoaded', () => {
  // Function to set the button color to green
  function setButtonGreen() {
    document.getElementById('save').classList.add('saved');
    document.getElementById('success-message').innerText = 'Reminder time changed!';
    setTimeout(() => {
      document.getElementById('save').classList.remove('saved');
      document.getElementById('success-message').innerText = '';
    }, 2000); // Remove the green color after 2 second
  }

  chrome.storage.sync.get(['interval'], (result) => {
    const currentInterval = result.interval || 30; // Default to 30 minutes if not set
    document.getElementById('interval').value = currentInterval;
    document.getElementById('current-interval').innerText = 'Current interval: ' + currentInterval + ' minutes';
  });

  document.getElementById('save').addEventListener('click', () => {
    const interval = parseInt(document.getElementById('interval').value, 10);
    if (!isNaN(interval) && interval > 0) {
      chrome.alarms.clear('postureReminder', () => {
        chrome.alarms.create('postureReminder', { periodInMinutes: interval });
        chrome.storage.sync.set({ interval: interval }, () => {
          // Current interval display
          document.getElementById('current-interval').innerText = (interval == 1) ? 'Current interval: ' + interval + ' minute' : 'Current interval: ' + interval + ' minutes';

          // Call the function to set the button color to green
          setButtonGreen(); 
          console.log('Alarm interval set to:', interval);
        });
      });
    } else {
      alert('Please enter a valid number.');
    }
  });

  // Start the reminder when the "Start" button is clicked
  document.getElementById('start').addEventListener('click', () => {
    chrome.alarms.create('postureReminder', { periodInMinutes: 30 }); // Change the interval as needed
    console.log('Reminder started.');
    alert('Reminder started.');
  });

  // Stop the reminder when the "Stop" button is clicked
  document.getElementById('stop').addEventListener('click', () => {
    chrome.alarms.clear('postureReminder');
    console.log('Reminder stopped.');
    alert('Reminder stopped.');
  });
});

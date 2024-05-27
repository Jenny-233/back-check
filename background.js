chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed.');

  // Set an initial alarm for 30 minutes
  chrome.storage.sync.get(['interval'], (result) => {
    const interval = result.interval || 30; // Default to 30 minutes if not set
    chrome.alarms.create('postureReminder', { periodInMinutes: interval });
    console.log('Alarm created with interval:', interval);
  });

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'postureReminder') {
      console.log('Alarm triggered:', alarm);
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon48.png',
        title: 'PosturePal Reminder',
        message: 'Time to check your posture! Don\'t slouch!',
        priority: 2
      }, (notificationId) => {
        console.log('Notification created with ID:', notificationId);
      });
    }
  });
});

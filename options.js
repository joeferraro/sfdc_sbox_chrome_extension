// Saves options to chrome.storage
function save_options() {
  var showPod = document.getElementById('showPod').checked;
  chrome.storage.sync.set({
    showPod: showPod
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    showPod: false,
  }, function(items) {
    document.getElementById('showPod').checked = items.showPod;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
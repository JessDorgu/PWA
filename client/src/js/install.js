const butInstall = document.getElementById('buttonInstall');


let deferredPrompt;


window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;

  butInstall.style.display = 'block';
});


butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }
    deferredPrompt = null;
  }

  butInstall.style.display = 'none';
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully');
});


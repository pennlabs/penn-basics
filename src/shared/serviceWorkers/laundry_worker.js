self.addEventListener('push', e => {
    // const data = e.data.json();
    console.log('----push received----');
    self.registration.showNotification('Penn Basics', {
        body: 'Your Laundry is finished',
        icon: '../../../public/android-chrome-256x256.png'
    })
})
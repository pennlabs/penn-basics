self.addEventListener('push', e => {
    self.registration.showNotification('Penn Basics', {
        body: 'Your Laundry is finished',
        icon: '../../../public/android-chrome-256x256.png'
    })
})
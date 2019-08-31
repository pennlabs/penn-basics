self.addEventListener('push', e => {
    self.registration.showNotification('Penn Basics', {
        body: 'Your laundry is finished',
        icon: 'https://raw.githubusercontent.com/pennlabs/pennbasics/master/public/android-chrome-256x256.png'
        // icon: '../../../public/android-chrome-256x256.png'
    })
})
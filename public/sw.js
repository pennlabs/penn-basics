self.addEventListener('push', e => {
    const payload = e.data.json()
    self.registration.showNotification('Penn Basics', {
        body: `${payload.hallName}: Your laundry is finished`,
        icon: 'https://raw.githubusercontent.com/pennlabs/pennbasics/master/public/android-chrome-256x256.png',
        data: {
            machineID: payload.machineID,
            hallID: payload.hallID,
            reminderID: payload.reminderID
        }
        // icon: '../../../public/android-chrome-256x256.png'
    })

    console.log('----Service Worker: notification sent-----')
})
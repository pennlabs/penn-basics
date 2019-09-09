self.addEventListener('push', e => {
    const payload = e.data.json()
    const { machineID, hallID, reminderID, hallName } = payload
    self.registration.showNotification('Penn Basics', {
        body: `${hallName}: Your laundry is finished`,
        icon: 'https://raw.githubusercontent.com/pennlabs/pennbasics/master/public/android-chrome-256x256.png'
        // icon: '../../../public/android-chrome-256x256.png'
    })

    const request = indexedDB.open('LocalDB', 1)

    request.onerror = event => {
        console.error("Database error: " + event.target.errorCode);
    }

    request.onsuccess = event => {
        const db = event.target.result
        const transaction = db.transaction(["laundryReminders"], "readwrite")
        const objectStore = transaction.objectStore("laundryReminders")
        const hallMachineID = `${hallID}-${machineID}`
        const storeRequest = objectStore.put({hallMachineID, reminderID})
        storeRequest.onerror = event => {
            console.error("Store error: " + event.target.errorCode);
        }
        storeRequest.onsuccess = event => {
            console.log('----This notification is recorded----')
            console.log(event.target.result)
        }

        console.log('----IndexedDB: loading is successful----')
    }

    console.log('----Service Worker: notification sent-----')
})
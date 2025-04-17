// Add Firestore
const db = firebase.firestore();

document.getElementById('signupForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const gender = document.getElementById('gender').value;
    const interests = document.getElementById('interests').value.split(',').map(i => i.trim());
    const videoFile = document.getElementById('video').files[0];

    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        let videoURL = '';
        if (videoFile) {
            const storageRef = storage.ref(`videoIntros/${user.uid}/${videoFile.name}`);
            await storageRef.put(videoFile);
            videoURL = await storageRef.getDownloadURL();
        }

        // Save profile data to Firestore
        await db.collection("users").doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            username: username,
            gender: gender,
            interests: interests,
            videoURL: videoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Account created successfully!');
        window.location.href = "home.html";
    } catch (error) {
        alert('Signup failed: ' + error.message);
    }
});

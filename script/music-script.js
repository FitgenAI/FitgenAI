document.getElementById('uploadForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const songTitle = document.getElementById('songTitle').value;
  const artistName = document.getElementById('artistName').value;
  const songFile = document.getElementById('songFile').files[0];
  const dpImage = document.getElementById('dpImage').files[0];

  if (songFile && dpImage) {
      const reader = new FileReader();
      reader.onload = function(event) {
          const songUrl = URL.createObjectURL(songFile);
          const dpUrl = URL.createObjectURL(dpImage);

          const songList = document.getElementById('songList');

          const songItem = document.createElement('div');
          songItem.classList.add('song-item');

          const dpImg = document.createElement('img');
          dpImg.src = dpUrl;
          dpImg.alt = songTitle;

          const songInfo = document.createElement('div');
          songInfo.innerHTML = `<strong>${songTitle}</strong><br>${artistName}`;

          const audioPlayer = document.createElement('audio');
          audioPlayer.controls = true;
          audioPlayer.src = songUrl;

          songItem.appendChild(dpImg);
          songItem.appendChild(songInfo);
          songItem.appendChild(audioPlayer);

          songList.appendChild(songItem);
      };
      reader.readAsDataURL(dpImage);
  }
});

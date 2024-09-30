document.addEventListener('DOMContentLoaded', () => {
  const uploadForm = document.getElementById('upload-form');
  const videoList = document.getElementById('video-list');

  uploadForm.addEventListener('submit', function(event) {
      event.preventDefault();

      const fileInput = document.getElementById('video-file');
      const file = fileInput.files[0];

      if (file) {
          const videoUrl = URL.createObjectURL(file);
          const videoElement = document.createElement('video');
          videoElement.controls = true;
          videoElement.src = videoUrl;
          videoElement.width = 320; // Set a fixed width for the video

          videoList.appendChild(videoElement);

          // Clear the file input after upload
          fileInput.value = '';
      } else {
          alert('Please select a video file to upload.');
      }
  });
});

// Get references to DOM elements
const fileInput = document.getElementById('upload');
const colorPicker = document.getElementById('border-color');
const downloadBtn = document.getElementById('download-btn');
const resetBtn = document.getElementById('reset-btn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Default border color
let borderColor = '#ffffff';

// Update the border color based on the color picker
colorPicker.addEventListener('input', (event) => {
  borderColor = event.target.value;
});

// Handle image upload and drawing it on the canvas
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const borderSize = 20; // Size of the border
        
        // Clear the canvas before drawing new image
        ctx.clearRect(0, 0, canvas.width, canvas.height); 

        // Adjust canvas width and height for the image and border
        canvas.width = img.width + borderSize * 2;  
        canvas.height = img.height + borderSize * 2;  

        // Draw border
        ctx.fillStyle = borderColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);  // Draw the border
        ctx.drawImage(img, borderSize, borderSize); // Draw image inside the border

        // Enable the download button
        downloadBtn.disabled = false;
      };
    };
    reader.readAsDataURL(file);
  }
});

// Download the image with border when the download button is clicked
downloadBtn.addEventListener('click', () => {
  // Ensure the canvas has content before downloading
  if (canvas.width > 0 && canvas.height > 0) {
    const imageData = canvas.toDataURL('image/png');  // Convert canvas to PNG data URL

    // Create a temporary download link
    const link = document.createElement('a');
    link.href = imageData;
    link.download = 'image-with-border.png';  // Default download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);  // Remove link after download
  } else {
    alert('No image to download. Please upload an image first!');
  }
});

// Reset the canvas and all inputs
resetBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas
  canvas.width = 0;
  canvas.height = 0;
  fileInput.value = '';  // Reset file input
  downloadBtn.disabled = true;  // Disable download button
});

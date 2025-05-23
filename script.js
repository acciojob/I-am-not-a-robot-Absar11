const images = [
    { id: 1, src: "https://picsum.photos/id/237/200/300" },
    { id: 2, src: "https://picsum.photos/seed/picsum/200/300" },
    { id: 3, src: "https://picsum.photos/200/300?grayscale" },
    { id: 4, src: "https://picsum.photos/200/300/" },
    { id: 5, src: "https://picsum.photos/200/300.jpg" },
    { id: 1, src: "https://picsum.photos/id/237/200/300" } // Duplicate of image with id 1
];

const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const h3Element = document.getElementById("h");
const imagesContainer = document.getElementById("images");

let selectedImages = []; 

resetButton.style.display = "none";
verifyButton.style.display = "none";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createImageElements() {
    imagesContainer.innerHTML = ''; 
    selectedImages = [];
    
    images.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.classList.add("img");
        imgElement.dataset.id = image.id;
        imgElement.dataset.index = index;
        imgElement.src = image.src;
        imgElement.alt = `Image ${image.id}`;
        
        imgElement.addEventListener("click", function() {
		      if (selectedImages.length < 2 && !selectedImages.includes(this)) {
                this.classList.add("selected");
                selectedImages.push(this);
                
                resetButton.style.display = "inline-block";
                
                if (selectedImages.length === 2) {
                    verifyButton.style.display = "inline-block";
                    h3Element.textContent = "Now click Verify to check if you're human";
                }
            }
        });
        
        imagesContainer.appendChild(imgElement);
    });
}

resetButton.addEventListener("click", () => {
    selectedImages.forEach(img => img.classList.remove("selected"));
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    h3Element.textContent = "Please click on the identical tiles to verify that you are not a robot.";
});

verifyButton.addEventListener("click", () => {
    if (selectedImages.length === 2) {
        const id1 = selectedImages[0].dataset.id;
        const id2 = selectedImages[1].dataset.id;
        
        if (id1 === id2) {
            selectedImages[0].style.opacity = "0.3";
            selectedImages[0].style.pointerEvents = "none";
            selectedImages[1].style.opacity = "0.3";
            selectedImages[1].style.pointerEvents = "none";
            
            alert("You are a human. Congratulations!");
        } else {
            alert("We can't verify you as a human. You selected the non-identical tiles.");
        }
        
        resetButton.click();
        
        // const remainingImages = document.querySelectorAll('.img:not([style*="opacity: 0.3"])');
        // if (remainingImages.length === 0) {
        //     h3Element.textContent = "Verification complete! You're definitely human!";
        // }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    shuffle(images);
    createImageElements();
    
    imagesContainer.classList.add("flex");
});
const originalImages = [
    { id: 1, src: "https://picsum.photos/id/237/200/300" },
    { id: 2, src: "https://picsum.photos/seed/picsum/200/300" },
    { id: 3, src: "https://picsum.photos/200/300?grayscale" },
    { id: 4, src: "https://picsum.photos/200/300/" },
    { id: 5, src: "https://picsum.photos/200/300.jpg" },
    { id: 1, src: "https://picsum.photos/id/237/200/300" } // Duplicate image with same src but keep unique id
];

// Assign a unique ID to the duplicate manually
originalImages[5].id = 6; // Now it's a different ID, same image

const resetButton = document.getElementById("reset");
const verifyButton = document.getElementById("verify");
const h3Element = document.getElementById("h");
const imagesContainer = document.getElementById("images");

let selectedImages = [];

resetButton.style.display = "none";
verifyButton.style.display = "none";

function shuffle(array) {
    const clonedArray = [...array]; // avoid modifying original array
    for (let i = clonedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    return clonedArray;
}

function createImageElements() {
    imagesContainer.innerHTML = '';
    selectedImages = [];
    resetButton.style.display = "none";
    verifyButton.style.display = "none";
    h3Element.textContent = "Please click on the identical tiles to verify that you are not a robot.";

    const shuffledImages = shuffle(originalImages);

    shuffledImages.forEach((image, index) => {
        const imgElement = document.createElement("img");
        imgElement.classList.add("img");
        imgElement.dataset.id = image.id;
        imgElement.dataset.index = index;
        imgElement.src = image.src;
        imgElement.alt = `Image ${image.id}`;

        imgElement.addEventListener("click", function () {
            if (selectedImages.length < 2 && !this.classList.contains("selected")) {
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
        const src1 = selectedImages[0].src;
        const src2 = selectedImages[1].src;

        if (src1 === src2) {
            selectedImages.forEach(img => {
                img.style.opacity = "0.3";
                img.style.pointerEvents = "none";
            });

            alert("You are a human. Congratulations!");
        } else {
            alert("We can't verify you as a human. You selected the non-identical tiles.");
        }

        resetButton.click();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    createImageElements();
    imagesContainer.classList.add("flex");
});

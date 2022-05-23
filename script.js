const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "27288807-7c18b43e45aba5d7e6b6f5102";

const photoContainer = document.getElementById("photo-container");

async function getData() {
  let response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=yellow+flowers&image_type=photo`
  );
  const data = await response.json();
  return data.hits;
}

async function createGridItems() {
  const urlData = await getData();
  urlData.forEach((element) => {
    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-wrap");
    let gridImage = document.createElement("img");
    gridImage.classList.add("image-container");
    gridImage.src = `${element.largeImageURL}`;
    photoContainer.appendChild(imageDiv);
    imageDiv.appendChild(gridImage);

    const overlayEl = document.createElement("div");
    overlayEl.classList.add("overlay");
    imageDiv.appendChild(overlayEl);

    const imageLikeDiv = document.createElement("div");
    const imageLike = document.createElement("div");
    const imageLikePicture = document.createElement("img");
    imageLikeDiv.classList.add("image-like-div");
    imageLike.classList.add("image-like");
    imageLikePicture.classList.add("image-like-picture");
    imageLikePicture.src = "assets/png/like.png";
    overlayEl.appendChild(imageLikeDiv);
    imageLikeDiv.appendChild(imageLike);
    imageLike.appendChild(imageLikePicture);
    const imageLikeCount = document.createElement("span");
    imageLikeCount.textContent = `${element.likes}`;
    imageLikeCount.classList.add("image-like-count");
    imageLikeDiv.appendChild(imageLikeCount);

    const imageCommentDiv = document.createElement("div");
    const imageComment = document.createElement("div");
    const imageCommentPicture = document.createElement("img");
    imageCommentDiv.classList.add("image-comment-div");
    imageComment.classList.add("image-comment");
    imageCommentPicture.classList.add("image-comment-picture");
    imageCommentPicture.src = "assets/png/comment.png";
    overlayEl.appendChild(imageCommentDiv);
    imageCommentDiv.appendChild(imageComment);
    imageComment.appendChild(imageCommentPicture);
    const imageCommentCount = document.createElement("span");
    imageCommentCount.textContent = `${element.comments}`;
    imageCommentCount.classList.add("image-comment-count");
    imageCommentDiv.appendChild(imageCommentCount);

    imageDiv.addEventListener("mouseenter", (e) => {
      const overlay = e.target.lastChild;
      overlay.style.opacity = 0.5;
    });

    imageDiv.addEventListener("mouseleave", (e) => {
      const overlay = e.target.lastChild;
      overlay.style.opacity = 0;
    });
  });
}

createGridItems();

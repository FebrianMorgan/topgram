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
    let imageWrap = document.createElement("div");
    imageWrap.classList.add("image-wrap");

    let imageContainer = document.createElement("img");
    imageContainer.classList.add("image-container");
    imageContainer.src = `${element.largeImageURL}`;
    imageWrap.appendChild(imageContainer);

    photoContainer.appendChild(imageWrap);

    const overlayEl = document.createElement("div");
    overlayEl.classList.add("overlay");
    imageWrap.appendChild(overlayEl);

    const imageLikeContainer = document.createElement("div");
    imageLikeContainer.classList.add("image-like-container");
    overlayEl.appendChild(imageLikeContainer);

    const imageLike = document.createElement("div");
    imageLike.classList.add("image-like");
    imageLikeContainer.appendChild(imageLike);

    const imageLikePicture = document.createElement("img");
    imageLikePicture.classList.add("image-like-picture");
    imageLikePicture.src = "assets/png/like.png";
    imageLike.appendChild(imageLikePicture);

    const imageLikeCount = document.createElement("span");
    imageLikeCount.textContent = `${element.likes}`;
    imageLikeCount.classList.add("image-like-count");
    imageLikeContainer.appendChild(imageLikeCount);

    const imageCommentContainer = document.createElement("div");
    imageCommentContainer.classList.add("image-comment-container");
    overlayEl.appendChild(imageCommentContainer);

    const imageComment = document.createElement("div");
    imageComment.classList.add("image-comment");
    imageCommentContainer.appendChild(imageComment);

    const imageCommentPicture = document.createElement("img");
    imageCommentPicture.classList.add("image-comment-picture");
    imageCommentPicture.src = "assets/png/comment.png";
    imageComment.appendChild(imageCommentPicture);

    const imageCommentCount = document.createElement("span");
    imageCommentCount.textContent = `${element.comments}`;
    imageCommentCount.classList.add("image-comment-count");
    imageCommentContainer.appendChild(imageCommentCount);

    imageWrap.addEventListener("mouseenter", (e) => {
      const overlay = e.target.lastChild;
      overlay.style.opacity = 0.5;
    });

    imageWrap.addEventListener("mouseleave", (e) => {
      const overlay = e.target.lastChild;
      overlay.style.opacity = 0;
    });
  });
}

createGridItems();

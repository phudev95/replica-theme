backToTop();
imageViewer();

function backToTop() {
  var backTop = document.getElementsByClassName("js-cd-top")[0],
    offset = 300, // browser window scroll (in pixels) after which the "back to top" link is shown
    offsetOpacity = 1200, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    scrollDuration = 700,
    scrolling = false;

  if (backTop) {
    //update back to top visibility on scrolling
    window.addEventListener("scroll", function (event) {
      if (!scrolling) {
        scrolling = true;
        !window.requestAnimationFrame
          ? setTimeout(checkBackToTop, 250)
          : window.requestAnimationFrame(checkBackToTop);
      }
    });

    //smooth scroll to top
    backTop.addEventListener("click", function (event) {
      event.preventDefault();
      !window.requestAnimationFrame
        ? window.scrollTo(0, 0)
        : Util.scrollTo(0, scrollDuration);
    });
  }

  function checkBackToTop() {
    var windowTop = window.scrollY || document.documentElement.scrollTop;
    windowTop > offset
      ? Util.addClass(backTop, "cd-top--is-visible")
      : Util.removeClass(backTop, "cd-top--is-visible cd-top--fade-out");
    windowTop > offsetOpacity && Util.addClass(backTop, "cd-top--fade-out");
    scrolling = false;
  }
}

function imageViewer() {
  if (tbGlobalData.layout !== "post") return;
  document.addEventListener("DOMContentLoaded", function () {
    // Select all images in post content
    var postContent = document.querySelector(".post-content");
    if (postContent) {
      // Get all images in the post
      var images = postContent.querySelectorAll("img");

      // Only initialize if there are images
      if (images.length > 0) {
        // Initialize ViewerJS with gallery navigation
        var viewer = new Viewer(postContent, {
          url: 'data-original',
          toolbar: {
            zoomIn: 1,
            zoomOut: 1,
            oneToOne: 1,
            reset: 1,
            rotateLeft: 1,
            rotateRight: 1,
            flipHorizontal: 1,
            flipVertical: 1,
            prev: 1,
            play: 0,
            next: 1,
            download: function() {
              var a = document.createElement('a');
              a.href = viewer.image.src;
              a.download = viewer.image.alt;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            },
          },
          title: function (image) {
            return image.alt || "Image";
          },
          navbar: true,
          tooltip: true,
          movable: true,
          zoomable: true,
          rotatable: true,
          scalable: true,
          transition: true,
          fullscreen: true,
          keyboard: true,
          viewed: function (event) {
            // Replace loading gif with actual image only for the current viewed image
            var currentIndex = event.detail.index;
            var navbarImages =
              document.querySelectorAll(".viewer-navbar img");
            var currentNavImg = navbarImages[currentIndex];
            var originalImg = images[currentIndex];

            if (originalImg && originalImg.dataset.original) {
              // Replace navbar thumbnail
              if (currentNavImg) {
                currentNavImg.src = originalImg.dataset.original;
              }
              // Replace post content image
              originalImg.src = originalImg.dataset.original;
            }
          },
        });
      }
    }
  });
}

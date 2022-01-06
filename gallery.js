function loadImages(data, container) {
  var columns = false;
  if (Array.isArray(container)) {
    var col1 = container[0];
    var col2 = container[1];
    columns = true;
  }
  var modal_content = document.getElementById("modalcontent");
  var numslides = modal_content.childElementCount;
  var captionbox = document.getElementById("captionbox");

  var numimages = data.length;
  for (i=0; i < numimages; i++) {
    fname = data[i]['img_fname'];
    caption = data[i]['caption'];
    alt = data[i]['img_alt'];
    folder = data[i]['category'];
    var numstr = (i+numslides).toString();
    var onclickstr = "openModal();currentSlide(".concat(numstr, ")");
    var img = document.createElement("img");
    var img_path = "images/".concat(folder, "/", fname);
    img.src = img_path;
    img.setAttribute("title", caption);
    if (folder != 'extras') {
      img.setAttribute("onclick", onclickstr);
      img.setAttribute("class", "hover-shadow");
    }
    img.setAttribute("alt", alt);

    if (columns) {
      if (i % 2 == 0) {
        col1.appendChild(img);
      } else {
        col2.appendChild(img);
      }
    } else {
      container.appendChild(img);
    }

    if (folder != 'extras') {
      var slide = document.createElement("div");
      slide.setAttribute("class", "mySlides");
      var numbertext = document.createElement("div");
      numbertext.setAttribute("class", "numbertext");
      numbertext.innerHTML = numstr.concat('/', numimages.toString());
      var img_big = document.createElement("img");
      img_big.src = img_path;
      img_big.setAttribute("title", caption);
      img_big.setAttribute("alt", alt);

      slide.appendChild(numbertext);
      slide.appendChild(img_big);
      modal_content.insertBefore(slide, captionbox);
    }
  }
}

function importImages(path) {
  loadCSV(path).then(function(data) {
    var col1 = document.getElementById("col1");
    var col2 = document.getElementById("col2");
    var container = [col1, col2];
    loadImages(data, container);
  });
}

document.addEventListener("keydown", function(event) {
  if (event.keyCode == 37) 
    {plusSlides(-1);}
  else if (event.keyCode == 39) 
    {plusSlides(1);}
  else if (event.keyCode == 27)
    {closeModal();}
})

function openModal() {
  document.getElementById("myModal").style.display = "block";
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  try {
    slides[slideIndex-1].style.display = "block";
  }
  catch (err) {
    console.log(slideIndex);
    console.log(slides[slideIndex-1]);
  }
  var current_image = slides[slideIndex-1].getElementsByTagName("img")[0];
  
  captionText.innerHTML = current_image.title;
}

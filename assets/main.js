function loadHeader(type, subList) {
    fetch("header.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            if (type == false && subList == false) {
                document.querySelector("header").innerHTML += data;
            } else {
                var subNav = createSubNav(subList);
                document.querySelector("header").innerHTML += data;
                document.getElementById("header").innerHTML += subNav;
                document.getElementById("navbar-" + String(type)).classList.add("current");
                document.getElementById("menu-" + String(type)).classList.add("current");
            }
        });
}

function loadFooter() {
    fetch("footer.html")
        .then(response => {
            return response.text();
        })
        .then(data => {
            document.querySelector("footer").innerHTML += data;
        });
}

function openMenu() {
  var x = document.getElementById("menu-links");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function createSubNav(list) {
    var subStart = "<div><div id=\"sub-nav\" class=\"sub-nav\">";
    var subEnd = "</div></div>";
    var subList = "";

    list.forEach(function (sub, i) {
        var s = i + 1;
        if (s == 1) {
            var subLink = "<a id=\"subbar-" + s + "\" href=\"#" + sub.toLowerCase() + "\" class=\"active\">" + sub + "</a>";
        } else {
            var subLink = "<a id=\"subbar-" + s + "\" href=\"#" + sub.toLowerCase() + "\">" + sub + "</a>";
        }
        subList += subLink;
    });

    return subStart + subList + subEnd;
}

function createSections(imageList) {
    document.body.innerHTML += "<div class=\"first-section\"></div>"

    var count = 1;
    var currentCategory = "";


    for (var key in imageList) {
        var value = imageList[key];
        var source = value["source"],
            category = value["category"],
            title = value["title"],
            series = value["series_title"],
            medium = value["medium"]
            caption = value["caption"];

        // Main Section Wrapper
        if (currentCategory != category) {
            count = 1;
            var sectionWrapper = "<section id=\"" + category + "\"></div>";
            currentCategory = category;
        } else {
            count += 1;
            var sectionWrapper = "<section id=\"" + category + count + "\"></div>";
        }

        // Section Name
        var sectionName = "<div class=\"section-name\">" + category + "</div>";

        // Section Image and Desciption
        var sectionImage = "<div class=\"section-content\"><div class=\"section-display\"><div class=\"display-image\">" + "<img id=\"" + key + "\" src=\"" + source + "\"></div>";
        

        // Creating the Sections
        if (value["series_title"] != undefined) { // Has Multiple Images
            if (imageList == artImages || imageList == projectsImages || imageList == researchImages) {
                var galleryStart = "<div class=\"section-content\"><div class=\"section-display\"><div class=\"display-image\">";
                var galleryImages = "";

                for (var img in value["images"]) {
                    galleryImages += "<img id=\"" + img + "\" src=\"" + value["images"][img]["source"] + "\">";
                }

                if (medium == null) {
                    var medium = "";
                }

                var award = value["award"];
                if (award == null) {
                    var award = false;
                }

                var link = value["link"];
                if (link == null) {
                    var link = false;
                }

                var sectionImage = galleryStart + galleryImages + "</div>";
                var sectionDescription = createSectionDescription(value["series_title"], medium, caption, award, link);
                compileSection(sectionWrapper, category, count, sectionName, sectionImage, sectionDescription);
            } else {
                var multiCount = 1;
                for (var img in value["images"]) {
                    var sectionImage = "<div class=\"section-content\">" + "<div class=\"section-display\"><div class=\"display-image\"><img id=\"" + img + "\" src=\"" + value["images"][img]["source"] + "\"></div>";

                    var title = value["images"][img]["title"];
                    if (title == null) {
                        var title = value["series_title"];
                    }

                    var medium = value["medium"];
                    if (medium == null) {
                        var medium = value["images"][img]["medium"];
                    }

                    if (caption == null) {
                        var caption = value["images"][img]["caption"];
                    }

                    var award = value["images"][img]["award"];
                    if (award == null) {
                        var award = false;
                    }

                    var sectionDescription = createSectionDescription(title, medium, caption, award, false);
                    if (multiCount == 1) {
                        var sectionWrapper = "<section id=\"" + category + "\"></div>";
                    } else {
                        var sectionWrapper = "<section id=\"" + category + multiCount + "\"></div>";
                    }
                    compileSection(sectionWrapper, category, multiCount, sectionName, sectionImage, sectionDescription);
                    multiCount += 1;
                }
            }
        } else if (value["award"] != null) { // Has Awards
            var sectionDescription = createSectionDescription(title, medium, caption, value["award"], false);
            compileSection(sectionWrapper, category, count, sectionName, sectionImage, sectionDescription);

        } else if (value["link"] != undefined) { // Has Link
            var sectionDescription = createSectionDescription(title, medium, caption, false, value["link"]);
            compileSection(sectionWrapper, category, count, sectionName, sectionImage, sectionDescription);

        } else {
            var sectionDescription = createSectionDescription(title, medium, caption, false, false);
            compileSection(sectionWrapper, category, count, sectionName, sectionImage, sectionDescription);
        }
    }
}

function compileSection(wrapper, category, i, name, image, description) {
    document.body.innerHTML += wrapper;

    if (i == 1) {
        document.getElementById(category).innerHTML += name + image + description;
    } else {
        document.getElementById(category+i).innerHTML += name + image + description;
    }
}

function createSectionDescription(title, medium, caption, award, link) {
    var start = "<div class=\"display-description\">" 
                + "<div class=\"display-title\">" + title + "</div>"
                + "<div class=\"display-medium\">" + medium + "</div><br>"
                + "<div class=\"display-caption\">" + caption  + "</div><br>"

    if (award != false) {
        var mid = "<span class=\"display-award\">" + award + "</span>";
    } else if (link != false) {
        var mid = "<div class=\"display-link\"><a href=" + link + ">See live project >>> </a></div>"
    } else {
        var mid = "";
    }

    var sectionDescription = start + mid + "</div></div></div></div>";
    return sectionDescription;
}
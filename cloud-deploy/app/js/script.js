// ========================================================
// DOCUMENT READY
// ========================================================
$(document).ready(function () {
    // ======================================================
    // 1. NAVBAR MOBILE FUNCTIONALITY
    // ======================================================
    const $menuToggle = $(".menu-toggle");
    const $navLinks = $(".nav-links");

    $menuToggle.on("click", function () {
        $navLinks.toggleClass("active");
        $menuToggle.toggleClass("active");
    });

    $navLinks.find("a").on("click", function () {
        if ($navLinks.hasClass("active")) {
            $navLinks.removeClass("active");
            $menuToggle.removeClass("active");
        }
    });

    $(document).on("click", function (event) {
        if (
            !$navLinks.is(event.target) &&
            !$menuToggle.is(event.target) &&
            $navLinks.has(event.target).length === 0 &&
            $menuToggle.has(event.target).length === 0
        ) {
            if ($navLinks.hasClass("active")) {
                $navLinks.removeClass("active");
                $menuToggle.removeClass("active");
            }
        }
    });

    // ======================================================
    // 2. PRODUCT FILTERING FUNCTIONALITY
    // ======================================================
    function filterProducts() {
        const searchTerm = $("#productSearch").val().toLowerCase();

        $(".product-item").each(function () {
            const productName = $(this).find(".product-name").text().toLowerCase();
            // Assuming product-description might be present or can be added for search
            const productDescription = $(this)
                .find(".product-description")
                .text()
                .toLowerCase();

            if (
                productName.includes(searchTerm) ||
                productDescription.includes(searchTerm)
            ) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $("#productSearch").on("keyup", filterProducts);
    $("#searchButton").on("click", filterProducts);

    // ======================================================
    // 3. PRODUCT MEDIA GALLERY INTERACTIONS
    // ======================================================
    $(".gallery-thumbnail").on("click", function () {
        const imgSrc = $(this).data("full-src");

        // Assuming you have an img element with id="mainProductImage"
        $("#mainProductImage").attr("src", imgSrc).show();
        // Assuming you have a video element with id="mainProductVideo"
        $("#mainProductVideo").hide().get(0).pause(); // Pause any playing video

        $(".gallery-thumbnail, .gallery-video-thumbnail").removeClass("active");
        $(this).addClass("active");
    });

    $(".gallery-video-thumbnail").on("click", function () {
        const videoSrc = $(this).data("full-video-src");
        const video = $("#mainProductVideo").get(0); // Get the native DOM element

        // Update the source of the video, load it, and play
        $("#mainProductVideo source").attr("src", videoSrc);
        video.load(); // Load the new video source
        video.play(); // Auto-play the video

        $("#mainProductVideo").show();
        $("#mainProductImage").hide(); // Hide the image if video is playing

        $(".gallery-thumbnail, .gallery-video-thumbnail").removeClass("active");
        $(this).addClass("active");
    });

    // ======================================================
    // 4. RESERVATION FORM FUNCTIONALITY
    // ======================================================
    $("#reservationForm").on("submit", function (event) {
        event.preventDefault(); // Prevent default form submission (page reload)

        // Get the product name from the product title element
        // This assumes the form is on a product detail page where a .product-title exists
        const itemName = $(".product-title").text().trim(); // Get text and remove whitespace

        if (itemName) {
            $("#reservedItemName").text(itemName); // Set the item name in the message
        } else {
            // Fallback if product title is not found (e.g., for testing or if structure differs)
            $("#reservedItemName").text("the item");
            console.warn("Product title element (.product-title) not found. Using generic item name.");
        }

        // Display the success message
        $("#reservationMessage").css("display", "block");

        // Optionally, clear the form fields
        $("#fullName").val("");
        $("#email").val("");
        $("#phone").val("");

        // Optionally, hide the form or disable the button after submission
        $(this).hide(); // Hides the form after successful reservation
    });
});
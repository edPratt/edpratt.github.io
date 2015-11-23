// Set the footer height dynamically to the body height on resize
var bumpIt = function() {  
      $('body').css('margin-bottom', $('footer#site-footer').height());
    },
    didResize = false;

bumpIt();

$(window).resize(function() {
  didResize = true;
});
setInterval(function() {  
  if(didResize) {
    didResize = false;
    bumpIt();
  }
}, 250);


// Contact form Ajax
var $contact_form_container = $("#contact-form-container");
var $contact_form = $("#contact-form");
var $contact_submit = $("#contact-submit");
$contact_form.submit(function(e) {
    e.preventDefault();
    console.log("Contact form submit clicked.");
    $contact_submit.attr("disabled", true);
    $contact_form_container.fadeOut(function() {
        $.ajax({
            url: "//formspree.io/lenny@prattdev.net",
            method: "POST",
            data: $contact_form.serializeArray(),
            dataType: "json"
        }).done(function(result) {
            // Display a thank you message
            $contact_form_container.load("/snippets/contact_thank_you.html", function() {
                $contact_form_container.fadeIn("slow");
            });
        });
    });
});

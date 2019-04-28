// Add a click event listener to each button element for "See more/less"
//  and bind it to the toggleContent function.
// In other words, when the paragraph element is clicked, call toggleContent.
document.querySelector('#moreLess1').addEventListener('click', toggleContent);
document.querySelector('#moreLess2').addEventListener('click', toggleContent);
document.querySelector('#moreLess3').addEventListener('click', toggleContent);

// Determine which of the 4 paragraph elements was clicked by checking the value of the id attribute.
// Then get the associated details paragraph element, and assign to the details variable.
// 'this' is a variable (set by JavaScript) that corresponds to the clicked element.
function toggleContent()  {
	var details;
	if (this.id == "moreLess1")   // Is the id of the clicked element = 'moreLess1' ?
	   details = document.querySelector('#details1');
	if (this.id == "moreLess2")
	   details = document.querySelector('#details2');
	if (this.id == "moreLess3")
	   details = document.querySelector('#details3');

    // Toggle the details display and "See more/less" text
    if (this.textContent == "See more") {
        details.style.display = 'block';    // Show the details paragraph
        this.textContent = "See less";      // Change the clickable text
    }
    else {  // Text content = "See less"
       details.style.display = 'none';      // Hide the details paragraph
       this.textContent = "See more";       // Change the clickable text
    }
}

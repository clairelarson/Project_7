document.addEventListener('DOMContentLoaded', () => {

// Set focus to Name Field

  const nameField = document.querySelector('#name');
  nameField.focus();


// "Job Role" section
	// Program the "Job Role" <select> element to listen for user changes. When a change is detected, display/hide the "text field" based on the user’s selection in the drop down menu.
  const selectJob = document.querySelector('#title');
  const otherBox = document.querySelector('#other-job-role');
  otherBox.style.display = 'none';

  selectJob.addEventListener("change", (e) => {
	  if (e.target.value === "other") {
	    otherBox.style.display = '';
	  } else {
  		otherBox.style.display = 'none';
	  }
  })



// "T-Shirt Info" section
	// show color options that match each design. 

  const selectColor = document.querySelector('#color');
  selectColor.disabled = true;
  const selectOption= document.getElementById('color').children;

  const selectDesign = document.querySelector('#design');

  selectDesign.addEventListener('change', (e) => {
  	selectColor.disabled = false;
  	for (let i = 1; i < selectOption.length; i++) {
		  const color = selectOption[i].getAttribute('data-theme');
      if (e.target.value === color) {
          selectOption[i].hidden = false;
          selectOption[i].setAttribute('selected', true);
      } else if (e.target.value !== color) {
          selectOption[i].hidden = true;
          selectOption[i].removeAttribute('selected');
      }
    }
  })



// "Register for Activities" section
	// The "Total: $" element below the "Register for Activities" section updates to reflect the sum of the cost of the user’s selected activities.

	const checkbox = document.querySelectorAll('input[type="checkbox"]');
	const activitiesBox = document.querySelector('#activities-box');
	const activityTotal = document.querySelector('#activities-cost');
	let total = 0;
	let activityCount = 0;


  activitiesBox.addEventListener('change', (e) => {
    const dataCost = +e.target.getAttribute('data-cost');

    for (let i = 0; i < checkbox.length; i++){
    	  //Prevent users from registering for conflicting activities

        if (e.target.getAttribute('data-day-and-time') === checkbox[i].getAttribute('data-day-and-time')){
            if(e.target.checked){
                checkbox[i].disabled = true;
                checkbox[i].parentNode.classList.add('disabled');                
            } else if (!e.target.checked){
                checkbox[i].disabled = false;
                checkbox[i].parentNode.classList.remove('disabled');
            }
        }
        e.target.parentElement.classList.remove('disabled');
        e.target.disabled = false;
    }
    if (e.target.checked) {
        total += dataCost;
        activityCount++;
    } else {
        total -= dataCost;
        activityCount--;
    }
    activityTotal.innerHTML = `Total: $${total}`;
})



// "Payment Info" section. If a change is detected, hide all payment sections in the form’s UI except the selected one.


	const selectPayment = document.querySelector('#payment');
	const creditCard = document.querySelector('#credit-card');
	const paypal = document.querySelector('#paypal');
	const bitcoin = document.querySelector('#bitcoin');
	selectPayment[1].selected = true;
	paypal.style.display = 'none';
	bitcoin.style.display = 'none';

	selectPayment.addEventListener('change', (e) => {
	   if (e.target.value === 'paypal') {
	   	paypal.style.display = '';
	   	creditCard.style.display = 'none';
	   	bitcoin.style.display = 'none';
	   } else if (e.target.value === 'bitcoin') {
	   	bitcoin.style.display = '';
	   	creditCard.style.display = 'none';
	   	paypal.style.display = 'none';
	   } else {
	   	paypal.style.display = 'none';
			bitcoin.style.display = 'none';
			creditCard.style.display = '';
	   }
	})
  



// Form validation Variables

	const userName = document.getElementById('name');
	const email = document.getElementById('email');
	const cardNumber = document.getElementById('cc-num')
	const zipCode = document.getElementById('zip');
	const cvv = document.getElementById('cvv');
	const form = document.querySelector('form');
	const emailHint = document.getElementById('email-hint');



	// Accessability: Make the form validation errors obvious to all users. 

	function errorValidator(input, test){
		const parent = input.parentElement;
		if(!test){
			parent.classList.add('not-valid');
			parent.classList.remove('valid');
			parent.lastElementChild.style.display = 'block';
		}
		if(test){
			parent.classList.add('valid');
			parent.classList.remove('not-valid');
			parent.lastElementChild.style.display = 'none';
		}
		return test;
	}

  // Field Validation Functions 

	const nameValidation = () => {
		const userNameValue = userName.value;
		const userNameTest = /^[a-zA-Z ]+$/.test(userNameValue);
		const test = errorValidator(userName, userNameTest); 
		return test;
	}

	const emailValidation = () => {
		const emailValue = email.value;
		const emailTest = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.com$/i.test(emailValue);
		const test = errorValidator(email, emailTest);
		return test;
	}

	const activitiesValidation = () => {
		const activitiesChecked = activityCount >= 1;
		const test = errorValidator(activitiesBox, activitiesChecked);
		return test;
	}

	const cardNumberValidation = () => {
		const cardNumberValue = cardNumber.value;
		const cardNumberTest = /^\d{13,16}$/.test(cardNumberValue);
		const test = errorValidator(cardNumber, cardNumberTest);
		return test;
	} 

	const zipValidation = () => {
		const zipValue = zipCode.value;
		const zipTest = /^\d{5}$/.test(zipValue);
		const test = errorValidator(zipCode, zipTest);
		return test;
	}

	const cvvValidation = () => {
		const cvvValue = cvv.value;
		cvvTest = /^\d{3}$/.test(cvvValue);
		const test = errorValidator(cvv, cvvTest);
		return test;
	}

	form.addEventListener('submit', e => {
		nameValidation();
		emailValidation();
		activitiesValidation();
		cardNumberValidation();
		zipValidation();
		cvvValidation();

		if (nameValidation() && emailValidation() && activitiesValidation()){

		} else {
	//Extra Credit: conditional error message
			if(email.value === ''){
				emailHint.style.display = 'block';
				emailHint.innerHTML = 'Email field cannot be blank';
			} else if (!emailValidation()){
				emailHint.innerHTML = 'Email format is not valid';
				}
			e.preventDefault();

		}
		if (selectPayment.value === 'credit-card'){
			if (cardNumberValidation() && zipValidation() && cvvValidation() ){

			} else {
				e.preventDefault()
			}
		} 

	})

  //Extra Credit: Real-time error message

	email.addEventListener('keyup', e => {
		emailValidation();
		})

		cardNumber.addEventListener('keyup', e => {
		cardNumberValidation();
		})




 //Accessibility: Make the focus states of the activities more obvious to all users. 
    
    	for (let i=0; i<checkbox.length; i++) {
    		checkbox[i].addEventListener('focus', (e) => {
    			e.target.parentElement.classList.add('focus');
    	})
    		checkbox[i].addEventListener('blur', (e) => {
    			e.target.parentElement.classList.remove('focus');
    	})
    }


});
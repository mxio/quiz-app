let i = 0;
let storeIndex = 0;
let correctCount = 0;

function startQuiz() {
    console.log('`startQuiz` ran');

    // When start button is clicked, remove background image, replace h2 with question, hide button in section and run function to generate html for questions view
    $('#start').click(function() {
        generateQuestionsView();
    });
}

function generateQuestionsView() {
    console.log('`generateQuestionsView` ran');

    if (i < STORE.length) {
        const questionString = `<h2>${STORE[i].question}</h2>`;

        const optionsString = 
            `<form id="question">
                <input type="radio" name="question" value="${STORE[i].option1}" id="option-1">
                <label for="option-1">${STORE[i].option1}</label>
                <input type="radio" name="question" value="${STORE[i].option2}" id="option-2">
                <label for="option-2">${STORE[i].option2}</label>
                <input type="radio" name="question" value="${STORE[i].option3}" id="option-3">
                <label for="option-3">${STORE[i].option3}</label>
                <input type="radio" name="question" value="${STORE[i].option4}" id="option-4">
                <label for="option-4">${STORE[i].option4}</label>
                <button type="submit" id="submit">Submit</button>
            </form>`;            

        const progressString = 
            `<footer>
                <p>Question ${i+1}/10</p>
                <p>${correctCount}/10 correct</p>
            </footer>`

         $('footer').replaceWith(progressString);
        
        
        $('header h2').replaceWith(questionString);
        $('section').children().replaceWith(optionsString);
    } 
    else {
        generateEndofQuiz();
    }
    
    $('form').on('submit', function(event) {
         event.preventDefault();
         if ($('input:radio').is(':checked')) {
            checkAnswer();
         }
         else {
             $('form').addClass('required');
         }
    })
}

function correct() {
    console.log('`correct` ran');
    const correctString = `<div><h2>Correct!</h2><button id="next">Next</button></div>`;

    $('section form').replaceWith(correctString);
    
    $('#next').click(function() {
        generateQuestionsView();
    });

    correctCount++;
}

function incorrect() {
    console.log('`incorrect` ran');
    const incorrectString = `
        <div><h2>Sorry. ${STORE[storeIndex].answer} is the right answer.</h2>
        <button id="next">Next</button></div>`;

    $('section form').replaceWith(incorrectString);

    $('#next').click(function() {
        generateQuestionsView();
    });
}

function checkAnswer() {
    for (let j = 0; j <= storeIndex; j++) {
        if ($('input[name=question]:checked', '#question').val() == $(STORE)[storeIndex].answer) {
            correct();
        } 
        else {
           incorrect();
        }
    }
    i++;
    storeIndex++;
}

function generateEndofQuiz() {
    console.log('`endResults` ran');

    const endResultsString = `
        <section>
            <div>
                <h2 class="no-padding">You got ${correctCount}/10 correct!</h2>
                <button>Try again</button>
            </div>
        </section>`

    const progressEndingString = 
    `<footer>
        <p>Question ${i}/10</p>
        <p>${correctCount}/10 correct</p>
    </footer>`


    $('section').replaceWith(endResultsString);
    $('footer').replaceWith(progressEndingString);

    $('button').click(function(event) {
        i = 0;
        storeIndex = 0;
        correctCount = 0;
        
        generateQuestionsView();
    })
}

function handleQuiz() {
    //handle functions
    startQuiz();
}

$(handleQuiz);
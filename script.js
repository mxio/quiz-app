let i = 0;
let storeIndex = 0;
let correctCount = 0;

function startQuiz() {
    console.log('`startQuiz` ran');

    // When start button is clicked, remove background image, replace h2 with question, hide button in section and run function to generate html for questions view
    $('#start').click(hideStart);
}

function hideStart() {
    //$('section button').remove();
    //$('header h2').remove();
    generateQuestionsView();
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
        
        
        $('header h2').replaceWith(questionString);
        $('section').children().replaceWith(optionsString);
    }
    // $('form').on('submit', function(event) {
    //     event.preventDefault();
    // })

    $('#submit').click(checkAnswer);
}

function correct() {
    console.log('`correct` ran');
    const correctString = `<div><h2>Correct!</h2><button id="next">Next</button></div>`;

    $('section form').replaceWith(correctString);

    $('#next').click(function() {
        generateQuestionsView();
    });
}

function incorrect() {
    console.log('`incorrect` ran');
    const incorrectString = `<div><h2>Sorry. The right answer is ${STORE[storeIndex].answer}        
        .</h2><button id="next">Next</button></div>`;

    $('section form').replaceWith(incorrectString);

    $('#next').click(function() {
        generateQuestionsView();
    });
}

function checkAnswer() {
    for (let j = 0; j <= storeIndex; j++) {
        if ($('input[name=question]:checked', '#question').val() == $(STORE)[storeIndex].answer) {
            correctCount++;
            correct();
        } 
        else {
           incorrect();
        }
    }
    i++;
    storeIndex++;
}


function progress() {
    console.log('`progress` ran');
}

function amountCorrect() {
    console.log('`amountCorrect` ran');
}

function endResults() {
    console.log('`endResults` ran');
}

function handleQuiz() {
    //handle functions
    startQuiz();
    progress();
    amountCorrect();
    endResults();
}

$(handleQuiz);
let randomOrder = [];
generateRandomNumbers();


// Vygeneruje náhodná čísla od 1 do 15
function generateRandomNumbers() {
    
    const numbers = [...Array(15).keys()]

    // zamíchá pořadí
    for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // return n elements
    randomOrder = numbers
}

// získání otázky pomocí API
async function getQuestion(questionNumber) {
    
    const response = await fetch(`http://localhost:3030/api/campaign/xmasquiz/question/${randomOrder[questionNumber]}`);
    
    const data = await response.json();
    
    return data;
  }
  
 // validace odpovědi pomocí API
async function validateAnswer(questionId, answer) {
    const response = await fetch(`http://localhost:3030/api/campaign/xmasquiz/validatequestion/${randomOrder[questionId]}`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        answer: answer
    })
});

const data = await response.json();

return data.correct;
}
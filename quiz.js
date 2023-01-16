
$("#quiz").hide();
$(".results").hide();





let currentQuestion = 0
let qcounter=1;
let score = 0;
//beginQuiz();


async function beginQuiz(){
    $(".home").hide();
    $("#quiz").show();

    // Nastaví počáteční hodnoty
    currentQuestion = 1
    numberOfQuestions= qcounter;
    score = 0;

    // Schová tlačítka
    $(".end").hide();
    $(".next").hide();

    // Načte první otázku
    loadQuestion(currentQuestion);
}   

async function loadQuestion(number){
    console.log("Current question: ",currentQuestion);
    console.log("qnumber: ",numberOfQuestions);
    // načíst otázku z API
    let question = await getQuestion(number);
    console.log("question: ",question);
    // zobrazit otázku
    $("#questionText").text(question.text);
    // zobrazení možnosti
    let options = question.options;
    for(let i=0;i<options.length;i++){
        $(".questionOption").eq(i).text(options[i]);
    }
    
    $(".questionOption").on('click', function(){ // Při výběru odpovědi - click na možnost
        activeOption = $(this);
        selectedAnswer=true;
        $(".questionOption").removeClass("active");
        $(this).addClass("active");
    });
}

async function confirm(){
    if(selectedAnswer){
        let answer = activeOption.text();
        let result = await validateAnswer(currentQuestion,answer);

        if(result){
            correctAnswer();    
        }else{
            wrongAnswer();
        }
    }
}

function correctAnswer(){
    score += 1;
    activeOption.addClass("correct");
    activeOption.addClass("bounce-top")
    $(".questionOption").prop('onclick',null).off('click'); // Odstraní onclick
    $(".confirm").hide();
    if(currentQuestion==numberOfQuestions){
         $(".end").show();
    }else{
        $(".next").show();
    }
}

function wrongAnswer(){
    score -= 1;
    activeOption.addClass("wrong");
    activeOption.addClass("shake-horizontal")
    $(".questionOption").prop('onclick',null).off('click'); // Odstraní onclick
    $(".confirm").hide();
    if(currentQuestion==numberOfQuestions){
         $(".end").show();
    }else{
        $(".next").show();
    }
}

function nextQuestion(){
    $(".questionOption").removeClass("active wrong correct bounce-top shake-horizontal");
    $(".confirm").show();
    $(".next").hide();
    currentQuestion++;
    loadQuestion(currentQuestion);
}

function endQuiz(){
    $(".end").hide();
    $(".quiz-box").hide();
    $(".results").show();
    $("#score").text(score);

    $(".percent").addClass("tracking-in-expand");
    $("#scoremain").text("Score: "+score);
    let scorepercent = Math.round((score / numberOfQuestions)*100);
    $(".percent").text("Úspěšnost: " + scorepercent+"%");

    if(score<0){
        $("#graphContent").css("right", "50%");
        $("#graphContent").css("background-color","red");
        $("#graphContent").css("border-right","2px solid black");
        $(".showpercent").text(scorepercent+"%");
        $(".showpercent").css("color","red");
        $(".showpercent").css("left","0");
        $(".showpercent").css("transform","translateX(-1.5rem)");   
    }else{
        $("#graphContent").css("left", "50%");
        $("#graphContent").css("background-color","yellowgreen");
        $(".showpercent").css("color","yellowgreen");
        $(".showpercent").text(scorepercent+"%");
        $(".showpercent").css("right","0");
        $(".showpercent").css("transform","translateX(1.5rem)");
    }
    
    $("#graphContent").css("width",  (Math.abs( (score / numberOfQuestions)*100)/2 )+"%");
}



function qcount(bool){
    if(bool){
        //maximum qcounter is 20
        if(qcounter<20)
            qcounter++;
    }else{
        //minimum qcounter is 1
        if(qcounter>1)
            qcounter--;
    }
    if(qcounter<10){
        $("#counterFirst").text("0");
        $("#counterSecond").text(qcounter);
    }else{
        $("#counterFirst").text(qcounter.toString().charAt(0));
        $("#counterSecond").text(qcounter.toString().charAt(1));
    }
}





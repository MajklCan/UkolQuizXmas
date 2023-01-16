//@Author Michal Caninec

// Výběr počtu otázek
let numberOfQuestions = 10; // Změnit na 10

let bgcolors = ["#192d4e","#202938","#212038","#302038","#001a46"];
let answers = ["1","2","3","2","2","1","3","1","2","1","3","1","3","2","1","3","1","1","2","1"];

$(".question").each(function(index){
    $(this).attr("data-index",index);
});



function qcount(operation){
    if(operation){
        numberOfQuestions == 20 ? console.log('20 je maximum') : numberOfQuestions++;
    }else{
        numberOfQuestions == 1 ? console.log('1 je minumum') : numberOfQuestions--;
    }
    showQCount();
}

function showQCount(){
    numberOfQuestions<10 ?
    (numberOfQuestions = "0"+numberOfQuestions):
    (numberOfQuestions = ""+numberOfQuestions);
    
    $("#counter1").html(numberOfQuestions[0]);
    $("#counter0").html(numberOfQuestions[numberOfQuestions.length-1]);
}
// ------------

function hidemenu(){
    $(".home").animate({
        opacity: 0.25,
        left: "+=50",
        height: "toggle"
      }, 1000, function() {
        $("#quiz").show();
        beginQuiz();
      });
}







let currentQuestion = 0;
$(".next").hide();
$(".end").hide();

function beginQuiz(){  //Začátek quizu ----------------
 
    $(".question").hide();
    score = 0;

    allquestions = document.getElementsByClassName("question");
    usedIndex = [];

    questions = [];
    for(i = 0 ; i < numberOfQuestions ; i++){
        randomIndex = randomNewIndex(0,allquestions.length-1);
        questions.push(allquestions[randomIndex]);
        loadQuestion(0); //načíst první otázku
    }

}
function endquiz(){     //Konec, ukaž výsledky
    $("#quiz").hide();
    $(".results").css("display","flex");
    $("#scoremain").addClass("tracking-in-expand");
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

let selectedAnswer;
let activeOption;
let score;
let attemptScore;





$(".next").on('click', function(){ // Click na další otázku
selectedAnswer = false;
activeOption = null;
$(questions[currentQuestion]).hide();
currentQuestion++;
loadQuestion();
$("li").removeClass(".correct").removeClass(".wrong");
});

function loadQuestion(){
    $("body").css("background-color",bgcolors[Math.floor(Math.random()*bgcolors.length)]);
    attemptScore = 1;
    $(".next").hide();
    $(".confirm").show();
    activeOption = null;
    $(questions[currentQuestion]).show();
    $("li").removeClass(".correct");
    $("li").removeClass(".wrong");
    $("li").on('click', function(){ // Při výběru odpovědi - click na možnost
        activeOption = $(this);
        selectedAnswer=true;
        $("li").removeClass("active");
        $(this).addClass("active");
    });
}



function confirm(){
    if(selectedAnswer){
        activeOption.val()==answers[questions[currentQuestion].getAttribute("data-index")] ? correctAnswer() : wrongAnswer();
    }
}
function correctAnswer(){
    score += attemptScore;
    activeOption.addClass("correct");
    activeOption.addClass("bounce-top")
    $("li").prop('onclick',null).off('click'); // Odstraní onclick
    $(".confirm").hide();
    if(currentQuestion+1==numberOfQuestions){
       $(".end").show();
    }else{
    $(".next").show();
    }
}
function wrongAnswer(){
    attemptScore--;
    activeOption.prop('onclick',null).off('click');
    activeOption.addClass("wrong");
    activeOption.addClass("shake-horizontal")
    selectedAnswer = false;
}






function randomNewIndex(min, max) {
    let index = Math.floor(Math.random() * (max - min + 1)) + min;
    if(usedIndex.includes(index)){
        return randomNewIndex(min,max);       
    }else{
    usedIndex.push(index);
    return index;
    }
}

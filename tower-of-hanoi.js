$(document).ready(() => {
    init();
    drag();
    drop();
    checkwin();
});

countdowntimer();

function drag()
{
    $(".disk").draggable({
    helper:"clone",
    containment: "#con2",
    start: function()
    {
        if ( $(this).attr("id") == $("#"+$(this).parent().attr("id")).children().last().prev().attr("id"))
        {
            $("#"+$(this).parent().attr("id")).children().last().prev().css("visibility", "hidden");    
            return true;                         
        }
        else
        {
            return false;                     
        }
    }
    });
};


function drop() 
{
    var count=0;
    var totalcount=570;      

    for (let i=1 ; i<=3; i++) 
    {
        $(`#rod${i}`).droppable({                                              
            drop: function(event,ui)
            {  
                if( ( $(`#rod${i} div`).length == 0 ) || ( ($(`#rod${i} div:last-child`).width() ) > ( ui.draggable.width() ) ) )
                {
                    ui.draggable.appendTo($(this));  
                    ui.draggable.css("visibility", "visible");
                    count++;                   
                }
    
                document.getElementById("moves").innerHTML = count;
                document.getElementById("moveleft").innerHTML = totalcount-count;
            }
        });
    }
    
    $("#con2").droppable({
        drop:function(event,ui)
        {
            ui.draggable.css("visibility","visible");
        }
    });

}


function touchHandler(event) {
    var touch = event.changedTouches[0];

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent({
        touchstart: "mousedown",
        touchmove: "mousemove",
        touchend: "mouseup"
    }
    [event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);

    touch.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}
function init() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}


function countdowntimer() 
{
    var assignedtime = 1000;                                                 
    var currenttime = 0;
    var ticktik = function() 
    {                                           
        if(currenttime>=assignedtime)
        {
            clearInterval(myinterval);
            var answer = alert("Game Over!\nYour Game Time is: "  + assignedtime + " s" + "\n\n Press 'OK' to Replay the Game" );
                document.location = 'file:///home/deltalabs/Documents/Visual%20Studio/myproject.html';
            
            return;
        }
        document.getElementById("timer").innerHTML = (assignedtime-currenttime + " s");
        currenttime++;

       drag();            
       checkwin();                     
    };
    var myinterval = setInterval(ticktik,1000);       
};


function checkwin()
{
    if((($("#rod3 div").length) == 9) &&  
    ($("#rod3 div:first-child").width())  < ($("#rod3 div:nth-child(2)").width()) &&
    ($("#rod3 div:nth-child(2)").width()) < ($("#rod3 div:nth-child(3)").width()) &&
    ($("#rod3 div:nth-child(3)").width()) < ($("#rod3 div:nth-child(4)").width()) &&
    ($("#rod3 div:nth-child(4)").width()) < ($("#rod3 div:nth-child(5)").width()) &&
    ($("#rod3 div:nth-child(5)").width()) < ($("#rod3 div:nth-child(6)").width()) &&
    ($("#rod3 div:nth-child(6)").width()) < ($("#rod3 div:nth-child(7)").width()) &&
    ($("#rod3 div:nth-child(7)").width()) < ($("#rod3 div:nth-child(8)").width()) &&
    ($("#rod3 div:nth-child(8)").width()) < ($("#rod3 div:nth-child(9)").width()) )
    {
        var answer = alert("Game Over!\nYour Game Time is: "  + assignedtime + " s" + "\n\n Press 'OK' to Replay the Game" );
            document.location = 'file:///home/deltalabs/Documents/Visual%20Studio/myproject.html';
    }
}

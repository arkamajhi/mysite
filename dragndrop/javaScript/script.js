
window.addEventListener("load", (function()                  
{
    // 1
    var draggableArea       = document.getElementById("draggableContainer");
    var draggableItems      = document.getElementsByClassName("draggableItem"); 
    var selectedElement     = ""; 
    var selectedElementPosition = 0;

    // 2
    for (var i = 0; i < draggableItems.length; i++) 
    {
        draggableItems[i].addEventListener("dragstart", function(e)  
            {
                e.dataTransfer.setData("text",e.target.id); // <-- éviter des problèmes de drag and drop avec des anciennes versions de firefox

                selectedElement = document.getElementById(e.target.id);

                setTimeout(function(){ draggableArea.removeChild(selectedElement) }, 0); // TimeOut pour éviter que l'objet séléctionner ne soit immédiatement supprimé avant qu'on est le temps de faire notre grab
            }
        );
    } 

    // 3
    draggableArea.addEventListener("dragover", function(e){
         
        e.preventDefault(); // La méthode preventDefault () annule l'action par défaut qui appartient à l'élément déclencheur
        GetCurrentPositionY(e.clientY) ; // Utilisation d'une fonction locale pour récupérer la position verticale de la souris de la souris

    });

    // 5
    draggableArea.addEventListener("drop", function(e){

        e.preventDefault(); // La méthode preventDefault () annule l'action par défaut qui appartient à l'élément déclencheur

        draggableArea.insertBefore(selectedElement, draggableArea.children[selectedElementPosition]);

        // Ici s'arrete le drag and drop sans animation


        // Animation 3
        ResetElementsTransitions() // <-- on reset la transition ici aussi pour éviter l'éspace !! ICI s'arrete notre drag and drop animé !!

    });

    // 4
    function GetCurrentPositionY(MousePositionY)
    {
        // Récupérer la position EXACTE de chaque élement draggable afin de savoir si on doit placer notre selectedItem en haut ou en bas par rapport à l'élément qu'on est en train de survoler
        for (var i = 0; i < draggableItems.length; i++) 
        {
            var element                 = document.getElementById(draggableItems[i]["id"]);
            var elementBoundBox         = element.getBoundingClientRect();  
            var elementBoundBoxTop      = elementBoundBox.top;
            var elementBoundBoxBottom   = elementBoundBox.bottom;
    
            var elementBoundBoxCenter = elementBoundBoxTop + ( (elementBoundBoxBottom - elementBoundBoxTop) /2 );
            draggableItems[i]["positionY"] = elementBoundBoxCenter; // Ajout d'une propriété "positionY" à notre tableau "draggableItems" et pour chaque élément draggable on affectela la valeur "elementBoundBoxBottom"
        }
        
        // Comparer la position verticale de la souris à la position EXACTE de l'élément "draggable" que l'on survole
        for (var i = 0; i < draggableItems.length; i++) 
        {
         if ( draggableItems[i]["positionY"] < MousePositionY)
            {
                var elementAbove = document.getElementById(draggableItems[i]["id"]); // On crée une variable locale qui représente l'élément juste au dessus de la position vertical de la souris
                selectedElementPosition = i+1; // <-- on sait alors que notre position doit etre après l'élément juste au dessus
            }
            else
            {
                if (!elementUnder) // <-- on veut l'élément qui se trouve immédiatement en dessous et pas tous les éléments
                 {
                    var elementUnder = document.getElementById(draggableItems[i]["id"]); // <-- si on entre alors un élément est bien présent en dessous de la souris
                }
            }
        }

        // on s'assure de la présence d'un élément au dessus de notre souris et si il n'y en a aucun alors la position sera tout en haut de la liste       
        if ( typeof(elementAbove) == "undefined" )
        {
            selectedElementPosition = 0; 
        }
        //Go étape DROP


        // 6.2
       ResetElementsTransitions(); // <-- utilisation du CSS pour faire un reset de l'état initial de chaque élément non séléctionné (loop back animation ^^)

        // 6.1 --> si l'élément en dessous est objet alors on applique un margin de 40px et une transition CSS qui fera déscendre l'objet (animation look alike)
        if ( typeof(elementUnder) == "object" ) 
        {
            elementUnder.style.marginTop = "40px";
            elementUnder.style.transition = "all 0.5s ease";
        }
    }

    // 6.2
    function ResetElementsTransitions()
    {        
        for (var i = 0; i < draggableItems.length; i++) 
        {
            document.getElementById(draggableItems[i]["id"]).style.margin = "10px" ;
        }
    }
    
}));
(function() {
function speakPlaceholder(settings) {
  
  var inputs = [].slice.call(document.querySelectorAll("input"));
  
  inputs.forEach(function(input) { 
      var placeholder = input.placeholder,
          permission = input.getAttribute("data-spl");
    
    
if (placeholder && permission) {
       var pitch = input.getAttribute("data-spl-pitch") || settings.pitch,
        volume = input.getAttribute("data-spl-volume") || settings.volume,
        rate = input.getAttribute("data-spl-rate") || settings.rate,
        placeholderText = input.placeholder,
        placeHolderUtterence = new SpeechSynthesisUtterance(placeholderText),
           blurred;
       
  input.addEventListener("focus", handleFocus, false);
  input.addEventListener("blur", handleBlur, false);     
       function handleFocus() {
         
      placeHolderUtterence.pitch = pitch;  
      placeHolderUtterence.volume = volume;
      placeHolderUtterence.rate = rate;  
       
//give 'speechSynthesis.cancel( )' time to finish and then respeak
         
       blurred = false;
         setTimeout(()=> {
            if (!blurred) {
                speechSynthesis.speak(placeHolderUtterence);
             }
         }, 700);
         
       }
       
      function handleBlur() {  
         blurred = true;
         speechSynthesis.cancel(placeHolderUtterence);
       }
       
     }
   
  });
  
}

speakPlaceholder( {
  pitch: 10,
  volume: 10,
  rate: 1.5
} );


})();
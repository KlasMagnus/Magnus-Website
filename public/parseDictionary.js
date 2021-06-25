function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result;
      // Do something with result
      parseFile(result);
    });
  
    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsText(file);
  }

  function parseFile(stringToParse)
  {
    currentWord = "";
    previousLineIsWord = false;

    var entries = []

      let lines = stringToParse.split('\n')
      lines.forEach(element => {
        
        if (/\S/.test(element) === false) {
          //only whitespace-characters on this row, move along...
          return;
        }


        if (previousLineIsWord)
        {
          var myEntry = new Entry(currentWord, element);
          entries.push(myEntry);

          const jsonObject = JSON.stringify(myEntry);
          console.log(jsonObject);
          

          previousLineIsWord = false;
        }
        
        if (isUpperCase(element))
        {
          currentWord = element;
          previousLineIsWord = true;
        }


      });

      download(JSON.stringify(entries), 'json.txt', 'text/plain');
  }

  function Entry(word, wordclass)
  {
   this.word = word;
   this.wordclass = wordclass;
  }

  function isUpperCase(str) {
    return str === str.toUpperCase();
}

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

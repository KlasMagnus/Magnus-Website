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
      counter = 0;
      let lines = stringToParse.split('\n')
      lines.forEach(element => {console.log(element)
          console.log(counter);counter++;
      });
  }
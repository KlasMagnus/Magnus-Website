function readFile(file) {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      const result = event.target.result;
      // Do something with result
      console.log(result);
    });
  
    reader.addEventListener('progress', (event) => {
      if (event.loaded && event.total) {
        const percent = (event.loaded / event.total) * 100;
        console.log(`Progress: ${Math.round(percent)}`);
      }
    });
    reader.readAsText(file);
  }
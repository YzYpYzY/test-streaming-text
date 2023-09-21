// when docunment ready
(function() {
    // your page initialization code here
    // the DOM will be available here
    const testButton = document.getElementById('testButton');
    testButton.addEventListener('click', () => {
        console.log('Button clicked!');
        testStream();
    });
 })();




testStream = () => {
    // Create a new ReadableStream to fetch the text data
fetch('http://127.0.0.1:5000/ping').then(response => response.body).then(body => {

const textDecoder = new TextDecoder();

// Read and process the streamed data
const reader = body.getReader();
const processStream = async () => {
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log("Stream has ended.");
      break;
    }
    // Convert the binary data to text
    const text = textDecoder.decode(value);
    console.log(text); // Process the text data as needed
  }
};

processStream();
});

}
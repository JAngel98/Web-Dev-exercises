function displayGreetings (name) {
    const message = 'Hello, ${name}';
    console.log(message);
}

function displayCustomizedGreetings (name, salutation='Hello') {
    console.log(`${salutation}, ${name}`);
}

function returnGreetings (name) {
    const message = 'Hello, ${name}';
    return message;
}

const greetingMessage = returnGreetings('Jose');
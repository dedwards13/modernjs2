let re;
re = /hello/;
re = /hello/i; // i = case insensitive
re = /hello/g; // g = global search
// Note must put reg expression between /

// console.log(re.source);

// const result = re.exec('world hello');

// console.log(re.exec(result));
// console.log(re.exec(result[0]));
// console.log(re.exec(result.index));
const result = re.test('Hello');
console.log(re.exec(result.input));

// try catch & finally
try {
    myFunction()
} catch(err) {
    console.log(err)
    console.log(err.message)
    console.log(err.name)
    console.log(err instanceof TypeError)
} finally {
    console.log('finally always runs regardless of result.')
}

// produce a type error
try (
    null.myFunction()
) catch(err) {
    console.log(`${err.name}: It's null stupid`)
}

// SyntaxError
eval('Hello World')

// URIError
decodeURIComponent('%');

const user = {email: 'gdoe@gmail.com'}

// check user has a name
if(!user.name) {
    throw 'User has no name'
    // throw as type of error
    throw new SyntaxError('User has no name')
}

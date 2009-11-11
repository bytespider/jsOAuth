if (!fireunit) {
    throw new Error('FireUnit is required for unit testing.See http://fireunit.org/'); //http://fireunit.org/
}

fireunit.ok(jsOAuth('key', 'secret'), 'create consumer without new keyword');
fireunit.ok(new jsOAuth('key', 'secret'), 'create consumer without new keyword');

fireunit.testsdone();

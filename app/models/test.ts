class TsTest {
    name: string;
    constructor(givenname) {
        this.name = givenname;
    }
    echo() {
        console.log(this.name);
    }
}

var testik = new TsTest('testik');
testik.echo();
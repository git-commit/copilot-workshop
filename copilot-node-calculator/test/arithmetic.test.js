describe('Arithmetic', function () {
    describe('Validation', function () {
        it('rejects missing operation', function (done) {
            request.get('/arithmetic?operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Unspecified operation" });
                    done();
                });
        });
        it('rejects invalid operation', function (done) {
            request.get('/arithmetic?operation=foobar&operand1=21&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operation: foobar" });
                    done();
                });
        });
        it('rejects missing operand1', function (done) {
            request.get('/arithmetic?operation=add&operand2=21')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: undefined" });
                    done();
                });
        });
        it('rejects operands with invalid sign', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2-1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2-1" });
                    done();
                });
        });
        it('rejects operands with invalid decimals', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2.1&operand2=4')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand1: 4.2.1" });
                    done();
                });
        });
        // create a test where the second operand is missing
        it('rejects missing operand2', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2&operand2=')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand2: " });
                    done();
                });
        });

        // create a test where the second operator is a string
        it('rejects invalid operand2', function (done) {
            request.get('/arithmetic?operation=add&operand1=4.2&operand2=foo')
                .expect(400)
                .end(function (err, res) {
                    expect(res.body).to.eql({ error: "Invalid operand2: foo" });
                    done();
                });
        });
    });

    describe('Addition', function () {
        it('adds two positive integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds zero to an integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=42&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('adds a negative integer to a positive integer', function (done) {
            request.get('/arithmetic?operation=add&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('adds two negative integers', function (done) {
            request.get('/arithmetic?operation=add&operand1=-21&operand2=-21')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('adds an integer to a floating point number', function (done) {
            request.get('/arithmetic?operation=add&operand1=2.5&operand2=-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -2.5 });
                    done();
                });
        });
        it('adds with negative exponent', function (done) {
            request.get('/arithmetic?operation=add&operand1=1.2e-5&operand2=-1.2e-5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
    });

    // TODO: Challenge #1


    describe('Multiplication', function () {
        it('multiplies two positive integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies a positive integer with zero', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('multiplies a positive integer and negative integer', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -42 });
                    done();
                });
        });
        it('multiplies two negative integers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=-21&operand2=-2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
        it('multiplies two floating point numbers', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=.5&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('multiplies supporting exponential notation', function (done) {
            request.get('/arithmetic?operation=multiply&operand1=4.2e1&operand2=1e0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 42 });
                    done();
                });
        });
    });

    describe('Division', function () {
        it('divides a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 21 });
                    done();
                });
        });
        it('divides a negative integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=divide&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
        it('divides a positive integer by a non-factor', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        it('divides a positive integer by a negative integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=-42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -0.5 });
                    done();
                });
        });
        it('divides zero by a positive integer', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=0.5&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.25 });
                    done();
                });
        });
        it('divides by zero', function (done) {
            request.get('/arithmetic?operation=divide&operand1=21&operand2=0')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: null });
                    done();
                });
        });
    });

    // add test for power
    describe('Power', function () {
        it('powers a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 8 });
                    done();
                });
        });
        // test with negative exponent
        it('powers a positive integer by a negative integer factor ', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=-3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.125 });
                    done();
                });
        });
        it('powers a positive integer by a fractional factor ', function (done) {
            request.get('/arithmetic?operation=power&operand1=2&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(1.4142135623730951, 0.000000000000001);
                    done();
                });
        });
    });


    // add tests for subtraction
    describe('Substraction', function () {
        it('substracts a positive integer from an integer factor ', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 40 });
                    done();
                });
        });
        it('substracts an integer from a negative integer factor ', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=-42&operand2=2')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -44 });
                    done();
                });
        });

        it('substracts a positive integer from a larger integer', function (done) {
            request.get('/arithmetic?operation=subtract&operand1=21&operand2=42')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: -21 });
                    done();
                });
        });
    });

    // Write test for nthroot
    describe('Nthroot', function () {
        it('nthroot a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=nthroot&operand1=8&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 2 });
                    done();
                });
        });
        it('nthroot a positive integer by a negative integer factor ', function (done) {
            request.get('/arithmetic?operation=nthroot&operand1=8&operand2=-3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 0.5 });
                    done();
                });
        });
        it('nthroot a positive integer by a fractional factor ', function (done) {
            request.get('/arithmetic?operation=nthroot&operand1=8&operand2=0.5')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.result).to.be.closeTo(64, 0.000000000000001);
                    done();
                });
        });
    });

    // Write test for ncr
    describe('Ncr', function () {
        it('ncr a positive integer by an integer factor ', function (done) {
            request.get('/arithmetic?operation=ncr&operand1=8&operand2=3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 56 });
                    done();
                });
        });
        it('ncr with a negative operand 2 return error', function (done) {
            request.get('/arithmetic?operation=ncr&operand1=8&operand2=-3')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ "error": "Invalid input: -3" });
                    done();
                });
        });
        it('ncr a positive integer by a fractional factor ', function (done) {
            request.get('/arithmetic?operation=ncr&operand1=8&operand2=1')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.eql({ result: 8 });
                    done();
                });
        });
    });
});

import {formatErrorMessage, formatSuccessMessage} from "../../src/common";

describe('Rest API Success Response output', () => {

    it('should create a success response', async () => {

        const input = formatSuccessMessage({
            msg: 'Success',
            data: {},
            sessionToken: 'xyz',
            sessionValidity: 1
        });

        const output = {
            status: {
                code: 200,
                message: 'Success',
            },
            data: {},
            session: {
                token: 'xyz',
                validity: 1,
                message: 'Session is valid'
            }
        };

        expect(input).toStrictEqual(output)
    });

    it('should create a success response with status code 202', async () => {

        const input = formatSuccessMessage({
            msg: 'Success',
            data: {},
            sessionToken: 'xyz',
            sessionValidity: 1,
            statusCode: 202
        });

        expect(input.status.code).toBe(202)
    });

});

describe('Rest API Failure Response output', () => {

    it('should create a failure response', async () => {

        const input = formatErrorMessage({
            msg: 'Session is invalid',
        });

        const output = {
            status: {
                code: 400,
                message: 'Session is invalid',
            },
            data: {},
            session: {
                token: null,
                validity: 0,
                message: null
            }
        };

        expect(input).toStrictEqual(output)

    });

    it('should create a failure response with status code 403', async () => {

        const input = formatErrorMessage({
            msg: 'Session is invalid',
            code: 403
        });

        expect(input.status.code).toBe(403)

    });

});

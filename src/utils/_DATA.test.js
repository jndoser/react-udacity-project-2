import {_saveQuestionAnswer, _saveQuestion} from "./_DATA";

describe("_saveQuestion", () => {
    it("Should return true for correct parameters", async () => {
        const response = await _saveQuestion({
            optionOneText: 'option one',
            optionTwoText: 'option two',
            author: 'tylermcginnis'
        });
        expect(response).toBeTruthy();
    });

    it("Should return error for false parameters", async () => {
        const response = await _saveQuestion({
            optionOneText: null,
            optionTwoText: 'option two',
            author: 'tylermcginnis'
        }).catch(e => e);
        expect(response).toBe("Please provide optionOneText, optionTwoText, and author");
    })
})

describe("_saveQuestionAnswer", () => {
    it("Should return true for correct parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "tylermcginnis",
            qid: "6ni6ok3ym7mf1p33lnez",
            answer: "optionOne"
        });

        expect(response).toBeTruthy();
    });

    it("Should return error for false parameters", async () => {
        const response = await _saveQuestionAnswer({
            authedUser: "tylermcginnis",
            qid: undefined,
            answer: "optionOne"
        }).catch(e => e);

        expect(response).toBe("Please provide authedUser, qid, and answer");
    });
});

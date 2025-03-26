import {QuestionType, verify} from '../InputQuestionType';

//PARITY

//ADD_TEN
test.each([
  [1, 11, true],
  [0, 10, true],
  [-5, 5, true],
  [1, 12, false],
])('add10 %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.ADD_TEN)).toBe(expected);
});

//ADD_TWENTY
test.each([
  [1, 21, true],
  [0, 20, true],
  [-30, -10, true],
  [1, 11, false],
])('add20 %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.ADD_TWENTY)).toBe(expected);
});

//PREDECESSOR
test.each([
  [1, 0, true],
  [0, -1, true],
  [-1, -2, true],
  [10, 9, true],
  [10, 11, false],
])('predecessor %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.PREDECESSOR)).toBe(expected);
});

//SUCCESSOR
test.each([
  [1, 2, true],
  [-21, -20, true],
  [0, 1, true],
  [-1, 0, true],
  [1, 0, false],
])('successor %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.SUCCESSOR)).toBe(expected);
});

//MULTIPLE_OF_3

//MULTIPLE_OF_5

//DOUBLE
test.each([
  [1, 2, true],
  [2, 4, true],
  [-1, -2, true],
  [1000, 2000, true],
  [0, 0, true],
  [-1, 1, false],
  [2, 2, false],
])('double %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.DOUBLE)).toBe(expected);
});

//TRIPLE
test.each([
  [1, 3, true],
  [0, 0, true],
  [-1, -3, true],
  [100, 300, true],
  [9, 27, true],
  [9, 20, false],
])('triple %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.TRIPLE)).toBe(expected);
});

//SQUARED
test.each([
  [1, 1, true],
  [0, 0, true],
  [2, 4, true],
  [9, 81, true],
  [-1, 1, true],
  [-2, 4, true],
  [1, 0, false],
])('square %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.SQUARED)).toBe(expected);
});

//CUBE
test.each([
  [1, 1, true],
  [0, 0, true],
  [-1, -1, true],
  [-2, -8, true],
  [4, 64, true],
  [-2, 8, false],
])('cube %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.CUBE)).toBe(expected);
});

//PERFECT_SQUARE

//PERFECT_CUBE

//PRIME
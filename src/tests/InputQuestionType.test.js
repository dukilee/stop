import {QuestionType, verify} from '../InputQuestionType';

//PARITY
test.each([
  [12, 'y', true],
  [122, 'yes', true],
  [124, 'S', true],
  [190, 'sím', true],
  [2, 'V', true],
  [0, 'verdadeiro', true],
  [32, 'Verdadeiro', true],
  [22, 'Verdade', true],
  [24, 'T', true],
  [-12, 'tRUE', true],

  [1, 'n', true],
  [123, 'no', true],
  [125, 'nãO', true],
  [19, 'F', true],
  [21, 'Falso', true],
  [7, 'False', true],
  [9, 'Fake', true],

  [2, 'n', false],
  [3, 't', false],
  [20, 'guilherme', false],
  [21, 'guilherme', false],
])('word_match %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.PARITY)).toBe(expected);
});

test.each([
  [0, 'p', true],
  [1, 'i', true],
  [2, 'par', true],
  [3, 'impar', true],
])('parity %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.PARITY)).toBe(expected);
});

//ADD_TEN
test.each([
  [1, 11, true],
  [0, 10, true],
  [-5, 5, true],
  [1, 12, false],
  [0, 'y', false],
])('add10 %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.ADD_TEN)).toBe(expected);
});

//ADD_TWENTY
test.each([
  [1, 21, true],
  [0, 20, true],
  [-30, -10, true],
  [1, 11, false],
  [0, 'y', false],
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
  [0, 'y', false],
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
  [0, 'y', false],
])('successor %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.SUCCESSOR)).toBe(expected);
});

//MULTIPLE_OF_3
test.each([
  [81, 'm', true],
  [1, 'n', true],
  [9, 'multiplo', true],
  [5, 'f', true],
  [11, 'y', false]
])('parity %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.MULTIPLE_OF_3)).toBe(expected);
});

//MULTIPLE_OF_5
test.each([
  [25, 'm', true],
  [1, 'n', true],
  [5, 'multiplo', true],
  [3, 'f', true],
  [11, 'y', false]
])('parity %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.MULTIPLE_OF_5)).toBe(expected);
});

//DOUBLE
test.each([
  [1, 2, true],
  [2, 4, true],
  [-1, -2, true],
  [1000, 2000, true],
  [0, 0, true],
  [-1, 1, false],
  [2, 2, false],
  [0, 'y', false],
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
  [0, 'y', false],
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
  [0, 'y', false],
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
  [0, 'y', false],
])('cube %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.CUBE)).toBe(expected);
});

//PERFECT_SQUARE
test.each([
  [25, 'quadrado', true],
  [0, 'perfeito', true],
  [1, 'quadrado perfeito', true],
  [2, 'n', true],
  [5, 'y', false],
])('parity %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.PERFECT_SQUARE)).toBe(expected);
});

//PERFECT_CUBE
test.each([
  [27, 'cubo', true],
  [0, 'perfeito', true],
  [1, 'cubo perfeito', true],
  [4, 'n', true],
  [9, 'y', false],
])('parity %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.PERFECT_CUBE)).toBe(expected);
});

//PRIME
test.each([
  [7, 'primo', true],
  [2, 'sim', true],
  [1, 'n', true],
  [0, 'no', true],
  [-5, 'F', true],
  [-11, 'T', false],
])('parity %p results %p should be %p', (a, b, expected) => {
  expect(verify(a, b, QuestionType.PRIME)).toBe(expected);
});
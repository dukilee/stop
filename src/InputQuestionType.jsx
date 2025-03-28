export const QuestionType = {
  // PARITY: 0,
  ADD_TEN: 1,
  ADD_TWENTY: 2,
  PREDECESSOR: 3,
  SUCCESSOR: 4,
  // MULTIPLE_OF_3: 5,
  // MULTIPLE_OF_5: 6,
  DOUBLE: 7,
  TRIPLE: 8,
  SQUARED: 9,
  CUBE: 10,
  // PERFECT_SQUARE: 11,
  // PERFECT_CUBE: 12,
  // PRIME: 13,
};

export function verify(question, answer, questionType){
  if(answer == null) return false;
  switch(questionType){
    // case QuestionType.PARITY:
    //   return question % 2 == answer;
    case QuestionType.ADD_TEN:
      return question + 10 == answer;
    case QuestionType.ADD_TWENTY:
      return question + 20 == answer;
    case QuestionType.PREDECESSOR:
      return question - 1 == answer;
    case QuestionType.SUCCESSOR:
      return question + 1 == answer;
    case QuestionType.MULTIPLE_OF_3:
      return question % 3 == answer;
    case QuestionType.MULTIPLE_OF_5:
      return question % 5 == answer;
    case QuestionType.DOUBLE:
      return question * 2 == answer;
    case QuestionType.TRIPLE:
      return question * 3 == answer;
    case QuestionType.SQUARED:
      return question * question == answer;
    case QuestionType.CUBE:
      return question * question * question == answer;
    default:
      console.log('Wrong question type for verification');
      return true;
  }
}

export function name(questionType){
  switch(questionType){
    case QuestionType.PARITY:
      return "par?";
    case QuestionType.ADD_TEN:
      return "+10";
    case QuestionType.ADD_TWENTY:
      return "+20";
    case QuestionType.PREDECESSOR:
      return "Antecessor";
    case QuestionType.SUCCESSOR:
      return "Sucessor";
    case QuestionType.MULTIPLE_OF_3:
      return "Multiplo de 3";
    case QuestionType.MULTIPLE_OF_5:
      return "Multiplo de 5";
    case QuestionType.DOUBLE:
      return "Dobro";
    case QuestionType.TRIPLE:
      return "Triplo";
    case QuestionType.SQUARED:
      return "Ao quadrado";
    case QuestionType.CUBE:
      return "Ao cubo";
    default: 
      console.log('Wrong question type for name');
      return "MISS TAKE";
  }
}
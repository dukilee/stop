export const QuestionType = {
  PARITY: 0,
  ADD_TEN: 1,
  ADD_TWENTY: 2,
  PREDECESSOR: 3,
  SUCCESSOR: 4,
  MULTIPLE_OF_3: 5,
  MULTIPLE_OF_5: 6,
  DOUBLE: 7,
  TRIPLE: 8,
  SQUARED: 9,
  CUBE: 10,
  PERFECT_SQUARE: 11,
  PERFECT_CUBE: 12,
  PRIME: 13,
};

export function isNumberOnly(questionType){
  return [
    QuestionType.ADD_TEN,
    QuestionType.ADD_TWENTY,
    QuestionType.CUBE,
    QuestionType.DOUBLE,
    QuestionType.PREDECESSOR,
    QuestionType.SQUARED,
    QuestionType.SUCCESSOR,
    QuestionType.TRIPLE
  ].includes(questionType);
}

function normalizeText(text){
  return String(text).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function checkLanguage(text, expected, additionalYes = [], additionalNo = []){
  const baseYes = ['v', 'verdade', 'verdadeiro', 's', 'sim', 't', 'true', 'y', 'yes'];
  const baseNo = ['f', 'falso', 'false', 'n', 'nao', 'no', 'fake'];
  text = normalizeText(text);

  if(expected && (baseYes.includes(text) || additionalYes.includes(text))) return true;
  if(!expected && (baseNo.includes(text) || additionalNo.includes(text))) return true;
  return false;
}

function isPrime(n) {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const sqrt = Math.sqrt(n);
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }

  return true;
}

export function verify(question, answer, questionType){
  if(answer == null) return false;
  switch(questionType){
    case QuestionType.PARITY:
      return checkLanguage(answer, question%2==0, ['p', 'par'], ['i', 'impar'])
    case QuestionType.ADD_TEN:
      return !isNaN(answer) && question + 10 == answer;
    case QuestionType.ADD_TWENTY:
      return !isNaN(answer) && question + 20 == answer;
    case QuestionType.PREDECESSOR:
      return !isNaN(answer) && question - 1 == answer;
    case QuestionType.SUCCESSOR:
      return !isNaN(answer) && question + 1 == answer;
    case QuestionType.MULTIPLE_OF_3:
      return checkLanguage(answer, question%3==0, ['m', 'mul', 'multiplo'])
    case QuestionType.MULTIPLE_OF_5:
      return checkLanguage(answer, question%5==0, ['m', 'mul', 'multiplo'])
    case QuestionType.DOUBLE:
      return !isNaN(answer) && question * 2 == answer;
    case QuestionType.TRIPLE:
      return !isNaN(answer) && question * 3 == answer;
    case QuestionType.SQUARED:
      return !isNaN(answer) && question * question == answer;
    case QuestionType.CUBE:
      return !isNaN(answer) && question * question * question == answer;
    case QuestionType.PERFECT_SQUARE:
      const aux = Math.round(Math.sqrt(question));
      return checkLanguage(answer, aux*aux==question, ['q', 'quadrado', 'perfeito', 'quadrado perfeito', 'p'])
    case QuestionType.PERFECT_CUBE:
      const aux2 = Math.round(Math.cbrt(question));
      return checkLanguage(answer, aux2*aux2*aux2==question, ['cubo', 'perfeito', 'cubo perfeito', 'p'])
    case QuestionType.PRIME:
      return checkLanguage(answer, isPrime(question), ['primo', 'p'], ['nao e primo']);
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
    case QuestionType.PERFECT_SQUARE:
      return "Quadrado perfeito?";
    case QuestionType.PERFECT_CUBE:
      return "Cubo perfeito?";
    case QuestionType.PRIME:
      return "Primo?";
    default: 
      console.log('Wrong question type for name');
      return "MISS TAKE";
  }
}